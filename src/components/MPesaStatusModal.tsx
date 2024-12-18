import { CheckCircle2, XCircle, Loader2, AlertCircle, WrenchIcon } from 'lucide-react';
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

  // Override status for maintenance message
  const maintenanceStatus = {
    type: 'error',
    message: (
      <div className="space-y-3">
        <p>M-Pesa integration is currently under maintenance for system upgrades.</p>
        <div className="p-4 bg-blue-50 rounded-lg mt-2">
          <p className="text-blue-700 font-medium">Please use PayPal for your transaction.</p>
          <p className="text-sm text-blue-600 mt-1">We apologize for any inconvenience and appreciate your understanding.</p>
        </div>
      </div>
    )
  };

  // Use maintenance status instead of provided status
  const displayStatus = maintenanceStatus;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md transform transition-all">
        {displayStatus.type === 'success' && <Confetti />}
        
        <div className="p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Maintenance Icon */}
            <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center">
              <WrenchIcon className="w-12 h-12 text-amber-500" />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-gray-900">
              System Maintenance
            </h3>

            {/* Message */}
            <div className="text-gray-600">{displayStatus.message}</div>

            {/* Button */}
            <div className="w-full space-y-3">
              <button
                onClick={onClose}
                className="w-full py-3 px-4 rounded-lg font-medium text-white
                  transition-all duration-300 transform hover:scale-105
                  bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                Switch to PayPal
              </button>
              <button
                onClick={onClose}
                className="w-full py-2 px-4 rounded-lg font-medium text-gray-600
                  transition-all duration-300 hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}