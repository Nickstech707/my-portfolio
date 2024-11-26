import { formatPhoneNumber } from './phoneNumber';

interface MPesaExpressRequest {
  phoneNumber: string;
  amount: number;
  accountReference: string;
  transactionDesc: string;
}

interface MPesaExpressResponse {
  success: boolean;
  CheckoutRequestID?: string;
  ResponseDescription?: string;
  error?: string;
}

export const generateMPesaQRCode = (phoneNumber: string, amount: number) => {
  const formattedPhone = formatPhoneNumber(phoneNumber);
  return `mpesa://pay?phone=${formattedPhone}&amount=${amount}`;
};

export const initiateMPesaPayment = async (
  phoneNumber: string,
  amount: number
): Promise<MPesaExpressResponse> => {
  const formattedPhone = formatPhoneNumber(phoneNumber);
  
  if (!validatePhone(formattedPhone) || !validateAmount(amount)) {
    return {
      success: false,
      error: 'Invalid phone number or amount',
    };
  }

  try {
    // In a real implementation, this would call the M-Pesa Express API
    // Simulated API call
    const response = await simulateMPesaExpressAPI({
      phoneNumber: formattedPhone,
      amount,
      accountReference: 'Portfolio Donation',
      transactionDesc: 'Support Development Work',
    });

    return response;
  } catch (error) {
    return {
      success: false,
      error: 'Payment processing failed',
    };
  }
};

// Simulate M-Pesa Express API call
const simulateMPesaExpressAPI = async (
  request: MPesaExpressRequest
): Promise<MPesaExpressResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (validatePhone(request.phoneNumber) && validateAmount(request.amount)) {
        resolve({
          success: true,
          CheckoutRequestID: `WS${Date.now()}`,
          ResponseDescription: 'Success. Request accepted for processing',
        });
      } else {
        resolve({
          success: false,
          error: 'Invalid request parameters',
        });
      }
    }, 1500);
  });
};

function validatePhone(phone: string): boolean {
  const phoneRegex = /^254[0-9]{9}$/;
  return phoneRegex.test(phone);
}

function validateAmount(amount: number): boolean {
  return amount >= 10 && amount <= 150000;
}