'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocker } from '../lockerContext';

const SelectDurationPage = () => {
  const router = useRouter();
  const {
    selectedLocker,
    selectedHours,
    setSelectedHours,
    pricePerHour,
    setOriginalPrice,
    setIsExtending,
    resetAll,
  } = useLocker();

  const handleSelectDuration = () => {
    const price = selectedHours * pricePerHour;
    setOriginalPrice(price);
    setIsExtending(false);
    router.push('/payment');
  };

  const handleLogout = () => {
    resetAll();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 p-4 flex items-center">
      <div className="max-w-md mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-600">Select Duration</h2>
          <button onClick={handleLogout} className="text-pink-600 hover:text-pink-700">
            <LogOut className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="bg-pink-100 rounded-2xl p-4 mb-4">
              <p className="text-sm text-gray-600 mb-1">Locker Number</p>
              <p className="text-3xl font-bold text-pink-600">{selectedLocker}</p>
            </div>
            <p className="text-gray-700">How long will you need the locker?</p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-3">Select Hours</label>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4, 5, 6, 8, 12].map(hours => (
                <button
                  key={hours}
                  onClick={() => setSelectedHours(hours)}
                  className={`py-3 px-4 rounded-xl font-semibold transition duration-200 ${
                    selectedHours === hours
                      ? 'bg-pink-400 text-white shadow-md'
                      : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                  }`}
                >
                  {hours}h
                </button>
              ))}
            </div>
          </div>

          <div className="bg-pink-50 rounded-2xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-semibold">Total Amount</span>
              <span className="text-2xl font-bold text-pink-600">
                RM {(selectedHours * pricePerHour).toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">RM {pricePerHour}/hour</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleSelectDuration}
              className="w-full bg-pink-400 hover:bg-pink-500 text-white font-semibold py-4 px-6 rounded-2xl transition duration-200 shadow-md"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectDurationPage;
