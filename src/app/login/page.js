'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocker } from '../lockerContext';

const LoginPage = () => {
  const router = useRouter();
  const { setUser, resetAll } = useLocker();
  const [isEnteringName, setIsEnteringName] = useState(false);
  const [name, setName] = useState('');

  const handleLogin = (isGuest = false) => {
    resetAll();
    if (isGuest) {
      setUser({ name: 'Guest', type: 'guest' });
    } else {
      const finalName = name.trim() || 'Syazwani Comel';
      setUser({ name: finalName, type: 'member' });
    }
    router.push('/scanner');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-pink-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto p-2 mb-4">
            <Image src="/img/roy.png" alt="Roy" width={80} height={80} />
          </div>
          <h1 className="text-3xl font-bold text-pink-600 mb-2">LockerRoy</h1>
          <p className="text-gray-600">Your personal storage space</p>
        </div>

        <div className="space-y-4">
          <div className="relative overflow-hidden">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleLogin(false);
                  }
                }}
                placeholder="Enter your name"
                className={`absolute left-0 top-0 h-full bg-white border-2 border-pink-300 text-pink-700 font-semibold px-6 rounded-2xl focus:outline-none focus:border-pink-400 transition-all duration-500 ease-in-out ${
                  isEnteringName ? 'w-[calc(100%-80px)] opacity-100' : 'w-0 opacity-0 pointer-events-none'
                }`}
                style={{
                  transform: isEnteringName ? 'translateX(0)' : 'translateX(-100%)',
                }}
              />
              <button
                onClick={() => {
                  if (!isEnteringName) {
                    setIsEnteringName(true);
                  } else {
                    handleLogin(false);
                  }
                }}
                className={`ml-auto bg-pink-400 hover:bg-pink-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-500 ease-in-out shadow-md flex items-center justify-center ${
                  isEnteringName ? 'w-16' : 'w-full'
                }`}
              >
                {isEnteringName ? (
                  <ArrowRight className="w-6 h-6" />
                ) : (
                  <span>Login</span>
                )}
              </button>
            </div>
          </div>
          <button
            onClick={() => handleLogin(true)}
            className="w-full bg-pink-200 hover:bg-pink-300 text-pink-700 font-semibold py-4 px-6 rounded-2xl transition duration-200"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
