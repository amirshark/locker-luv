'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const LockerContext = createContext(null);

export const LockerProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [selectedHours, setSelectedHours] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerTotalSeconds, setTimerTotalSeconds] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [penalty, setPenalty] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [isExtending, setIsExtending] = useState(false);
  const pricePerHour = 5;

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;

          if (newTime === 1800 && !notifications.includes('30min')) {
            setNotifications(prev => [...prev, '30min']);
            alert('⏰ 30 minutes remaining!');
          } else if (newTime === 900 && !notifications.includes('15min')) {
            setNotifications(prev => [...prev, '15min']);
            alert('⏰ 15 minutes remaining!');
          } else if (newTime === 300 && !notifications.includes('5min')) {
            setNotifications(prev => [...prev, '5min']);
            alert('⏰ 5 minutes remaining!');
          } else if (newTime === 60 && !notifications.includes('1min')) {
            setNotifications(prev => [...prev, '1min']);
            alert('⏰ 1 minute remaining!');
          }

          if (newTime === 0 && penalty === 0 && originalPrice > 0) {
            const penaltyAmount = originalPrice * 2;
            setPenalty(penaltyAmount);
            alert(`⚠️ Time's up! Late penalty of RM${penaltyAmount.toFixed(2)} applied (2x original price)`);
          }

          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining, notifications, penalty, originalPrice]);

  const resetAll = () => {
    setUser(null);
    setSelectedLocker(null);
    setSelectedHours(1);
    setTimeRemaining(0);
    setTimerTotalSeconds(0);
    setNotifications([]);
    setPenalty(0);
    setOriginalPrice(0);
    setIsExtending(false);
  };

  const value = {
    user,
    setUser,
    selectedLocker,
    setSelectedLocker,
    selectedHours,
    setSelectedHours,
    timeRemaining,
    setTimeRemaining,
    timerTotalSeconds,
    setTimerTotalSeconds,
    notifications,
    setNotifications,
    penalty,
    setPenalty,
    originalPrice,
    setOriginalPrice,
    pricePerHour,
    isExtending,
    setIsExtending,
    resetAll,
  };

  return <LockerContext.Provider value={value}>{children}</LockerContext.Provider>;
};

export const useLocker = () => {
  const ctx = useContext(LockerContext);
  if (!ctx) {
    throw new Error('useLocker must be used within LockerProvider');
  }
  return ctx;
};
