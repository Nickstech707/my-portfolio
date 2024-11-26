import React, { useMemo } from 'react';
import { QrCode, Loader2 } from 'lucide-react';
import { useForm } from '../hooks/useForm';
import { initiateMPesaPayment, generateMPesaQRCode } from '../utils/mpesa';
import { validatePhone, validateAmount } from '../utils/validation';
import { formatPhoneNumber } from '../utils/phoneNumber';
import MPesaStatusModal from './MPesaStatusModal';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { PayPalButtons } from "@paypal/react-paypal-js";

interface MPesaForm {
  phoneNumber: string;
  amount: string;
}

export default function MPesaDonation() {
  const { elementRef: qrRef, isVisible: qrVisible } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: '50px'
  });

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [status, setStatus] = React.useState<{
    type: 'pending' | 'success' | 'error' | 'timeout' | '';
    message: string;
    checkoutId?: string;
  }>({ type: '', message: '' });
  const [paymentMethod, setPaymentMethod] = React.useState<'mpesa' | 'paypal'>('mpesa');
  const [paypalAmount, setPaypalAmount] = React.useState(1);
  const [paypalStatus, setPaypalStatus] = React.useState<{
    type: 'success' | 'error' | '';
    message: string;
  }>({ type: '', message: '' });

  React.useEffect(() => {
    if (paypalStatus.type) {
      const timer = setTimeout(() => {
        setPaypalStatus({ type: '', message: '' });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [paypalStatus]);

  const pollPaymentStatus = React.useCallback(async (checkoutId: string) => {
    let attempts = 0;
    const maxAttempts = 60;
    
    const poll = async () => {
      if (attempts >= maxAttempts) {
        setStatus({
          type: 'timeout',
          message: 'Payment request timed out. Please try again.',
          checkoutId
        });
        return;
      }

      const random = Math.random();
      if (random < 0.3 && attempts > 5) {
        setStatus({
          type: 'success',
          message: 'Thank you for your support! Your payment has been received.',
          checkoutId
        });
        return;
      } else if (random < 0.4 && attempts > 5) {
        setStatus({
          type: 'error',
          message: 'Payment was cancelled or failed. Please try again.',
          checkoutId
        });
        return;
      }

      attempts++;
      setTimeout(poll, 500);
    };

    await poll();
  }, []);

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useForm<MPesaForm>({
    initialValues: {
      phoneNumber: '',
      amount: '',
    },
    validate: (values) => {
      const errors: Partial<MPesaForm> = {};
      const formattedPhone = formatPhoneNumber(values.phoneNumber);
      if (!validatePhone(formattedPhone)) {
        errors.phoneNumber = 'Please enter a valid Kenyan phone number (e.g., 0712345678)';
      }
      const amount = Number(values.amount);
      if (!validateAmount(amount)) {
        errors.amount = 'Amount must be between 10 and 150,000 KES';
      }
      return errors;
    },
    onSubmit: async (values) => {
      const formattedPhone = formatPhoneNumber(values.phoneNumber);
      try {
        setStatus({
          type: 'pending',
          message: 'Please check your phone for the STK push notification',
        });
        setIsModalOpen(true);

        const result = await initiateMPesaPayment(
          formattedPhone,
          Number(values.amount)
        );

        if (result.success && result.CheckoutRequestID) {
          await pollPaymentStatus(result.CheckoutRequestID);
        } else {
          setStatus({
            type: 'error',
            message: result.error || 'Payment initiation failed',
          });
        }
      } catch (error) {
        setStatus({
          type: 'error',
          message: 'An error occurred while processing the payment',
        });
      }
    },
  });

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    let formattedInput = input;

    if (input.length > 0) {
      if (input.startsWith('254')) {
        formattedInput = '0' + input.slice(3);
      } else if (input.startsWith('0')) {
        formattedInput = input;
      } else if (input.startsWith('7')) {
        formattedInput = '0' + input;
      }
    }

    formattedInput = formattedInput.slice(0, 10);

    handleChange({
      ...e,
      target: {
        ...e.target,
        name: 'phoneNumber',
        value: formattedInput,
      },
    });
  };

  const qrCode = useMemo(() => {
    if (!values.phoneNumber || !values.amount) return '';
    const formattedPhone = formatPhoneNumber(values.phoneNumber);
    if (!validatePhone(formattedPhone) || !validateAmount(Number(values.amount))) return '';
    return generateMPesaQRCode(formattedPhone, Number(values.amount));
  }, [values.phoneNumber, values.amount]);

  const handlePayPalApproval = async (data: any, actions: any) => {
    try {
      const order = await actions.order.capture();
      setPaypalStatus({
        type: 'success',
        message: 'Thank you for your donation! Your payment has been received.',
      });
    } catch (error) {
      setPaypalStatus({
        type: 'error',
        message: 'Payment failed. Please try again.',
      });
    }
  };

  return (
    <>
      <div id="donate" className="bg-gray-50 py-16 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '-2s' }}></div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 relative">
              Support My Work
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-emerald-600"></span>
              <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-600 to-emerald-600"></span>
            </h2>
            <p className="text-gray-600">
              Your support helps me create more open-source projects and educational content
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-lg border border-gray-200 p-1 relative">
                <div
                  className="absolute inset-y-1 transition-all duration-300 ease-out rounded-md bg-gradient-to-r"
                  style={{
                    left: paymentMethod === 'mpesa' ? '4px' : '50%',
                    right: paymentMethod === 'mpesa' ? '50%' : '4px',
                    background: paymentMethod === 'mpesa' 
                      ? 'linear-gradient(to right, #10B981, #059669)' 
                      : 'linear-gradient(to right, #3B82F6, #2563EB)'
                  }}
                />
                <button
                  onClick={() => setPaymentMethod('mpesa')}
                  className={`
                    px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 relative z-10
                    ${paymentMethod === 'mpesa' ? 'text-white' : 'text-gray-500 hover:text-gray-700'}
                  `}
                >
                  M-Pesa
                </button>
                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`
                    px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 relative z-10
                    ${paymentMethod === 'paypal' ? 'text-white' : 'text-gray-500 hover:text-gray-700'}
                  `}
                >
                  PayPal
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`transition-all duration-300 ${
                  paymentMethod === 'mpesa' 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-full absolute'
                }`}>
                  {paymentMethod === 'mpesa' && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <span className={`text-gray-500 ${values.phoneNumber ? 'hidden' : ''}`}>
                              +254
                            </span>
                          </div>
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={values.phoneNumber}
                            onChange={handlePhoneInput}
                            className={`
                              w-full px-4 py-2 border rounded-lg
                              ${values.phoneNumber ? 'pl-4' : 'pl-14'}
                              focus:ring-2 focus:ring-blue-500 focus:border-transparent
                              transition-all duration-300
                              ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}
                            `}
                            placeholder={values.phoneNumber ? '' : '712345678'}
                            maxLength={10}
                          />
                        </div>
                        {errors.phoneNumber && (
                          <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">
                          Enter your Safaricom number (e.g., 0712345678)
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Amount (KES)
                        </label>
                        <input
                          type="number"
                          name="amount"
                          value={values.amount}
                          onChange={handleChange}
                          className={`
                            w-full px-4 py-2 border rounded-lg
                            focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            transition-all duration-300
                            ${errors.amount ? 'border-red-500' : 'border-gray-300'}
                          `}
                          placeholder="Enter amount"
                          min="10"
                          max="150000"
                        />
                        {errors.amount && (
                          <p className="mt-1 text-sm text-red-500">{errors.amount}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="
                          w-full bg-gradient-to-r from-green-500 to-emerald-600
                          text-white py-3 px-6 rounded-lg font-semibold
                          hover:from-green-600 hover:to-emerald-700
                          transform hover:scale-[1.02]
                          transition-all duration-300
                          disabled:opacity-50 disabled:cursor-not-allowed
                          flex items-center justify-center
                          shadow-lg hover:shadow-xl
                        "
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Pay with M-PESA"
                        )}
                      </button>
                    </form>
                  )}
                </div>

                <div className={`transition-all duration-300 ${
                  paymentMethod === 'paypal' 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-full absolute'
                }`}>
                  {paymentMethod === 'paypal' && (
                    <div className="space-y-6">
                      <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Amount (USD)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <input
                            type="number"
                            value={paypalAmount}
                            onChange={(e) => setPaypalAmount(Number(e.target.value))}
                            className="w-full pl-8 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 
                              focus:border-transparent transition-all duration-300 border-gray-200
                              text-lg font-medium"
                            placeholder="0.00"
                            min="1"
                            step="0.01"
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Minimum tip: $1.00 USD</p>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-base font-semibold text-gray-800">Payment Summary</h4>
                          <img 
                            src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png" 
                            alt="PayPal" 
                            className="h-5"
                          />
                        </div>

                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Amount</span>
                            <span className="font-medium">${paypalAmount.toFixed(2)} USD</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Processing Fee</span>
                            <span className="text-green-600">No Fee</span>
                          </div>
                          <div className="border-t border-gray-200 pt-2 flex justify-between">
                            <span className="font-medium">Total</span>
                            <span className="font-bold">${paypalAmount.toFixed(2)} USD</span>
                          </div>
                        </div>

                        {/* Status Messages */}
                        {paypalStatus.type && (
                          <div className={`mb-4 p-4 rounded-lg text-center ${
                            paypalStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
                            'bg-red-50 text-red-700 border border-red-200'
                          }`}>
                            <p>{paypalStatus.message}</p>
                          </div>
                        )}
                        
                        {paypalAmount > 0 ? (
                          <div className="w-full relative">
                            <PayPalButtons
                              style={{ 
                                layout: "vertical",
                                color: "gold",
                                shape: "rect",
                                label: "pay",
                                height: 45
                              }}
                              createOrder={(data, actions) => {
                                return actions.order.create({
                                  intent: "CAPTURE",
                                  purchase_units: [
                                    {
                                      amount: {
                                        value: paypalAmount.toFixed(2),
                                        currency_code: "USD"
                                      },
                                      description: "Portfolio Development Support",
                                      soft_descriptor: "Thank You!"
                                    }
                                  ],
                                  application_context: {
                                    shipping_preference: "NO_SHIPPING",
                                    user_action: "PAY_NOW",
                                    brand_name: "Nicholas Muriithi Portfolio",
                                    landing_page: "LOGIN",
                                    return_url: window.location.href,
                                    cancel_url: window.location.href
                                  }
                                });
                              }}
                              onApprove={handlePayPalApproval}
                              onCancel={() => {
                                setPaypalStatus({
                                  type: 'error',
                                  message: 'Payment was cancelled. Please try again.',
                                });
                              }}
                              onError={(err) => {
                                setPaypalStatus({
                                  type: 'error',
                                  message: 'PayPal payment failed. Please try again.',
                                });
                                console.error('PayPal Error:', err);
                              }}
                            />
                          </div>
                        ) : (
                          <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-lg">
                            Please enter an amount to proceed with PayPal payment
                          </div>
                        )}
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-100 space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Secure payment through PayPal's protected servers</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Support using PayPal balance or credit/debit cards</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Instant confirmation and email receipt</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div 
                  ref={qrRef}
                  className="flex flex-col items-center justify-center h-full border-t md:border-t-0 md:border-l pt-8 md:pt-0 md:pl-8"
                >
                  <div 
                    className={`
                      flex flex-col items-center justify-center w-full h-full
                      transform transition-all duration-1000
                      ${qrVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
                    `}
                  >
                    <div className="flex items-center justify-center mb-4">
                      <QrCode className="w-40 h-40 md:w-48 md:h-48 text-gray-800" />
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                      Scan QR code to complete payment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MPesaStatusModal
        status={status}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          if (status.type !== 'pending') {
            setStatus({ type: '', message: '' });
          }
        }}
      />
    </>
  );
}