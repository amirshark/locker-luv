'use client';

import React, { useState } from 'react';
import { Camera, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocker } from '../lockerContext';

const ScannerPage = () => {
  const router = useRouter();
  const { user, setSelectedLocker, resetAll } = useLocker();
  const [manualLocker, setManualLocker] = useState('');

  const handleScanQR = () => {
    const lockerNumber = Math.floor(Math.random() * 100) + 1;
    setSelectedLocker(`L${lockerNumber.toString().padStart(3, '0')}`);
    router.push('/select-duration');
  };

  const handleLogout = () => {
    resetAll();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 p-4 flex items-center">
      <div className="max-w-md mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-600">Scan Locker</h2>
          <button onClick={handleLogout} className="text-pink-600 hover:text-pink-700">
            <LogOut className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-4">Welcome, {user?.name}! 💕</p>
            <p className="text-gray-700">Scan the QR code on your chosen locker</p>
          </div>

          <div className="bg-pink-50 rounded-2xl p-12 mb-6 flex items-center justify-center">
            <Camera className="w-32 h-32 text-pink-300" />
          </div>

          <button
            onClick={handleScanQR}
            className="w-full bg-pink-400 hover:bg-pink-500 text-white font-semibold py-4 px-6 rounded-2xl transition duration-200 shadow-md"
          >
            Simulate QR Scan
          </button>

          <div className="mt-6 pt-6 border-t border-pink-100">
            <p className="text-sm text-gray-500 mb-3 text-center">Or enter locker number</p>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={manualLocker}
                onChange={e => {
                  const digits = e.target.value.replace(/\D/g, '').slice(0, 3);
                  setManualLocker(digits);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && manualLocker) {
                    const padded = manualLocker.padStart(3, '0');
                    setSelectedLocker(`L${padded}`);
                    router.push('/select-duration');
                  }
                }}
                placeholder="000"
                maxLength={3}
                className="w-24 text-center text-2xl font-bold tracking-widest bg-pink-50 border border-pink-200 rounded-2xl px-3 py-2 text-pink-700 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
              />
              <button
                onClick={() => {
                  if (!manualLocker) return;
                  const padded = manualLocker.padStart(3, '0');
                  setSelectedLocker(`L${padded}`);
                  router.push('/select-duration');
                }}
                className="flex-1 bg-pink-100 hover:bg-pink-200 text-pink-700 font-semibold py-3 px-4 rounded-2xl transition duration-200"
              >
                Use Locker Number
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerPage;
