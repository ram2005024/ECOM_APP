import React, { useState } from "react";
import {
  Check,
  Crown,
  Zap,
  TrendingUp,
  Shield,
  Headphones,
  Star,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MembershipPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [billedAnnually, setBilledAnnually] = useState(false);
  const handleFreeTrail = async () => {
    try {
      //Call an api to create stripe session
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/subscription/plus/session`,
        {
          userId: user?.id,
          email: user?.email,
          billedAnnually: billedAnnually,
        }
      );
      if (res.data.success) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };
  console.log(billedAnnually);
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Crown className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">ShoppyGo</h1>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Upgrade Your Selling Experience
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works best for your business and unlock premium
            features
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mb-12">
          <span
            className={`text-sm font-medium ${
              !billedAnnually ? "text-gray-900" : "text-gray-500"
            }`}
          >
            Monthly
          </span>
          <button
            onClick={() => setBilledAnnually(!billedAnnually)}
            className="relative inline-flex h-8 w-14 items-center rounded-full bg-gray-300 transition-colors focus:outline-none"
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${
                billedAnnually ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium ${
              billedAnnually ? "text-gray-900" : "text-gray-500"
            }`}
          >
            Annually
          </span>
          {billedAnnually && (
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
              Save 38%
            </span>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Free Plan</h3>
                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded mt-1">
                  CURRENT PLAN
                </span>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-600">/month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">List up to 10 products</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Basic analytics dashboard</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Standard support</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">5% transaction fee</span>
              </li>
            </ul>

            <button
              disabled
              className="w-full bg-gray-200 text-gray-500 font-semibold py-4 px-6 rounded-xl cursor-not-allowed"
            >
              Current Plan
            </button>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl border-2 border-blue-500 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 text-xs font-bold px-4 py-1 rounded-bl-xl">
              RECOMMENDED
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Plus Membership
                </h3>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-white">
                  ${billedAnnually ? "5" : "8"}
                </span>
                <span className="text-white/80">/month</span>
              </div>
              {billedAnnually && (
                <p className="text-white/90 text-sm mt-2">
                  Billed annually at $60/year
                </p>
              )}
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-white font-medium">
                  Unlimited product listings
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-white font-medium">
                  Advanced analytics & insights
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-white font-medium">
                  Priority customer support
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-white font-medium">
                  Only 2% transaction fee
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-white font-medium">
                  Featured seller badge
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-white font-medium">
                  Premium listing placement
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-white font-medium">
                  Bulk upload tools
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-blue-600" />
                </div>
                <span className="text-white font-medium">
                  Custom store branding
                </span>
              </li>
            </ul>

            <button
              onClick={() => handleFreeTrail()}
              className="w-full bg-white text-blue-600 hover:bg-gray-50 font-bold py-4 px-6 rounded-xl transition-colors duration-200 shadow-lg"
            >
              Start 7-Day Free Trial
            </button>

            <p className="text-white/80 text-xs text-center mt-4">
              Cancel anytime. No credit card required for trial.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-sm p-8 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Upgrade to Plus?
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-7 h-7 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Grow Faster</h4>
              <p className="text-sm text-gray-600">
                Unlimited listings to scale your business without limits
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-7 h-7 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Earn More</h4>
              <p className="text-sm text-gray-600">
                Lower fees mean more profit in your pocket
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Stand Out</h4>
              <p className="text-sm text-gray-600">
                Get featured placement and premium visibility
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-7 h-7 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Priority Help
              </h4>
              <p className="text-sm text-gray-600">
                Get faster support when you need it most
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
