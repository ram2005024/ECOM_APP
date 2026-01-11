import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getSubscriptionTime } from "../../utils/getSubscriptionTime.js";
import { X } from "lucide-react";

const TrialReminder = ({ isVisible, setIsVisible, bannerId }) => {
  const subscription = useSelector((state) => state.auth.subscription);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [sec, setSec] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const time = getSubscriptionTime(subscription);
      setDays(time.days);
      setHours(time.hours);
      setMins(time.mins);
      setSec(time.seconds);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="w-full bg-blue-600 border-b border-blue-700">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <p className="text-white font-medium text-sm">Free trial ends in</p>

            <div className="flex items-center gap-1.5">
              <div className="bg-white/10 rounded-md px-2 py-1 min-w-[42px] text-center">
                <div className="text-white font-bold text-base">{days}</div>
                <div className="text-white/70 text-[10px]">days</div>
              </div>
              <div className="bg-white/10 rounded-md px-2 py-1 min-w-[42px] text-center">
                <div className="text-white font-bold text-base">{hours}</div>
                <div className="text-white/70 text-[10px]">hrs</div>
              </div>
              <div className="bg-white/10 rounded-md px-2 py-1 min-w-[42px] text-center">
                <div className="text-white font-bold text-base">{mins}</div>
                <div className="text-white/70 text-[10px]">min</div>
              </div>
              <div className="bg-white/10 rounded-md px-2 py-1 min-w-[42px] text-center">
                <div className="text-white font-bold text-base">{sec}</div>
                <div className="text-white/70 text-[10px]">sec</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="text-white/70 hover:text-white transition-colors flex-shrink-0"
          >
            <X
              onClick={() => {
                localStorage.setItem(`banner_show_${bannerId}`, false);
              }}
              className="w-4 h-4"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrialReminder;
