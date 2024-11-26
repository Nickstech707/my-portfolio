import React from 'react';
import { CheckCircle2, XCircle, Loader2, AlertCircle } from 'lucide-react';
import Confetti from './Confetti';

interface MPesaStatusModalProps {
  status: {
    type: 'pending' | 'success' | 'error' | 'timeout' | '';
    message: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function MPesaStatusModal({ status, isOpen, onClose }: MPesaStatusModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md transform transition-all">
        {status.type === 'success' && <Confetti />}
        
        <div className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Icons */}
            {status.type === 'pending' && (
              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
              </div>
            )}
            {status.type === 'success' && (
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
            )}
            {status.type === 'error' && (
              <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
                <XCircle className="w-12 h-12 text-red-500" />
              </div>
            )}
            {status.type === 'timeout' && (
              <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center">
                <AlertCircle className="w-12 h-12 text-orange-500" />
              </div>
            )}

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900">
              {status.type === 'pending' && 'Processing Payment'}
              {status.type === 'success' && 'Payment Successful!'}
              {status.type === 'error' && 'Payment Failed'}
              {status.type === 'timeout' && 'Payment Timeout'}
            </h3>

            {/* Message */}
            <p className="text-gray-600">{status.message}</p>

            {/* Button */}
            <button
              onClick={onClose}
              className="mt-6 w-full py-3 px-4 rounded-lg font-medium text-white
                transition-all duration-300 transform hover:scale-105
                bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              {status.type === 'success' ? 'Done' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}