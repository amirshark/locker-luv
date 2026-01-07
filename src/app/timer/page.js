'use client';

import React from 'react';
import { Bell, Clock, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocker } from '../lockerContext';

const TimerPage = () => {
  const router = useRouter();
  const {
    user,
    selectedLocker,
    timeRemaining,
    penalty,
    originalPrice,
    timerTotalSeconds,
    setIsExtending,
    setPenalty,
    resetAll,
  } = useLocker();

  const percentage =
    originalPrice > 0 && timerTotalSeconds > 0 ? (timeRemaining / timerTotalSeconds) * 100 : 0;

  const formatTime = seconds => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleExtend = () => {
    setIsExtending(true);
    router.push('/extend-duration');
  };

  const handlePayPenalty = () => {
    alert('Penalty payment successful! You can now open your locker.');
    setPenalty(0);
  };

  const handleLogout = () => {
    resetAll();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 p-4 flex items-center">
      <div className="max-w-md mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-600">Active Locker</h2>
          <button onClick={handleLogout} className="text-pink-600 hover:text-pink-700">
            <LogOut className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="bg-pink-100 rounded-2xl p-4 mb-4">
              <p className="text-sm text-gray-600 mb-1">
                {(user && user.name) || 'Your'} Locker
              </p>
              <p className="text-4xl font-bold text-pink-600">{selectedLocker}</p>
            </div>
          </div>

          <div className="mb-8">
            <div className="relative w-48 h-48 mx-auto mb-4">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#fce7f3"
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="#f9a8d4"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - percentage / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Clock className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-pink-600">{formatTime(timeRemaining)}</p>
                  <p className="text-sm text-gray-600 mt-1">remaining</p>
                </div>
              </div>
            </div>
          </div>

          {penalty > 0 && (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Bell className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="font-bold text-red-700 mb-1">Late Penalty Applied!</p>
                  <p className="text-sm text-red-600 mb-3">
                    Your time has expired. Please pay the penalty to unlock your locker.
                  </p>
                  <div className="bg-white rounded-xl p-3 mb-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-semibold">Penalty Amount</span>
                      <span className="text-xl font-bold text-red-600">RM {penalty.toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={handlePayPenalty}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl transition duration-200"
                  >
                    Pay Penalty Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {!penalty && (
            <button
              onClick={handleExtend}
              className="w-full bg-pink-400 hover:bg-pink-500 text-white font-semibold py-4 px-6 rounded-2xl transition duration-200 shadow-md mb-4"
            >
              Extend Time
            </button>
          )}

          <div className="bg-pink-50 rounded-2xl p-4">
            <p className="text-sm text-gray-600 flex items-center">
              <Bell className="w-4 h-4 mr-2 text-pink-400" />
              You&apos;ll be notified at 30, 15, 5, and 1 minute remaining
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimerPage;
