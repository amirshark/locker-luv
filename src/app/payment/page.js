'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocker } from '../lockerContext';

const PaymentPage = () => {
  const router = useRouter();
  const {
    selectedLocker,
    selectedHours,
    setTimeRemaining,
    setTimerTotalSeconds,
    setNotifications,
    setPenalty,
    pricePerHour,
    isExtending,
    setIsExtending,
    resetAll,
  } = useLocker();

  const paymentProviders = [
    { name: 'Touch n Go eWallet', logo: '💳' },
    { name: 'GrabPay', logo: '🟢' },
    { name: 'Boost', logo: '🚀' },
    { name: 'Maybank QRPay', logo: '🏦' },
    { name: 'CIMB Pay', logo: '💰' },
    { name: 'Credit/Debit Card', logo: '💳' },
  ];

  const handlePayment = () => {
    const additionalSeconds = selectedHours * 3600;
    if (isExtending) {
      setTimeRemaining(prev => {
        const next = prev + additionalSeconds;
        setTimerTotalSeconds(next);
        return next;
      });
    } else {
      setTimeRemaining(additionalSeconds);
      setTimerTotalSeconds(additionalSeconds);
    }
    setNotifications([]);
    setPenalty(0);
    setIsExtending(false);
    router.push('/timer');
  };

  const handleLogout = () => {
    resetAll();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 p-4 flex items-center">
      <div className="max-w-md mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-600">Payment</h2>
          <button onClick={handleLogout} className="text-pink-600 hover:text-pink-700">
            <LogOut className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="bg-pink-50 rounded-2xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Locker</span>
              <span className="font-semibold text-pink-600">{selectedLocker}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Duration</span>
              <span className="font-semibold text-pink-600">
                {selectedHours} hour{selectedHours > 1 ? 's' : ''}
              </span>
            </div>
            <div className="border-t border-pink-200 pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">Total</span>
                <span className="text-2xl font-bold text-pink-600">
                  RM {(selectedHours * pricePerHour).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 font-semibold mb-4">Select Payment Method</p>
          <div className="space-y-3 mb-6">
            {paymentProviders.map((provider, idx) => (
              <button
                key={idx}
                onClick={handlePayment}
                className="w-full bg-pink-50 hover:bg-pink-100 text-left py-4 px-6 rounded-2xl transition duration-200 flex items-center space-x-4"
              >
                <span className="text-2xl">{provider.logo}</span>
                <span className="font-semibold text-gray-700">{provider.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
