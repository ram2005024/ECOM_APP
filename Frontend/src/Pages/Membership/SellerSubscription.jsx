import React, { useState } from "react";
import {
  Store,
  Check,
  Shield,
  TrendingUp,
  Users,
  Zap,
  Crown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BecomeASeller() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/subscription/seller/session",
        {
          plan: selectedPlan,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        window.location.href = res.data.url;
      }
      return;
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Store className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">ShoppyGO</h1>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Start Selling Today
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful sellers on ShoppyGO and grow your
            business with our powerful platform
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border p-8 mb-8">
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={() => setSelectedPlan("monthly")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                selectedPlan === "monthly"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedPlan("annual")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all relative ${
                selectedPlan === "annual"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                Save 38%
              </span>
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-5xl font-bold text-gray-900">
                ${selectedPlan === "monthly" ? "8" : "5"}
              </span>
              <span className="text-xl text-gray-600">/month</span>
            </div>
            {selectedPlan === "annual" && (
              <p className="text-gray-600">Billed annually at $60/year</p>
            )}
          </div>

          <div className="bg-slate-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4 text-center">
              What's Included
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Unlimited Products
                  </p>
                  <p className="text-sm text-gray-600">
                    List as many items as you want
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Low Fees</p>
                  <p className="text-sm text-gray-600">
                    Only 2% per transaction
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Analytics Dashboard
                  </p>
                  <p className="text-sm text-gray-600">
                    Track your performance
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Priority Support</p>
                  <p className="text-sm text-gray-600">
                    Get help when you need it
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Featured Badge</p>
                  <p className="text-sm text-gray-600">Stand out from others</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Premium Tools</p>
                  <p className="text-sm text-gray-600">Bulk upload & more</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg text-lg"
          >
            Start Your Seller Journey
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            7-day free trial • No credit card required • Cancel anytime
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Secure Payments
            </h3>
            <p className="text-sm text-gray-600">
              Your earnings are safe and secure with our payment protection
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-sm border">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Grow Your Business
            </h3>
            <p className="text-sm text-gray-600">
              Access tools and insights to scale your sales effectively
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center shadow-sm border">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Large Audience</h3>
            <p className="text-sm text-gray-600">
              Reach millions of buyers actively shopping on ShoppyGO
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Crown className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Limited Time Offer
            </h3>
          </div>
          <p className="text-gray-700 mb-4">
            Start your seller account today and get your first month at 50% off!
          </p>
          <p className="text-sm text-gray-600">
            Use code{" "}
            <span className="font-mono font-semibold bg-white px-2 py-1 rounded">
              SELLER50
            </span>{" "}
            at checkout
          </p>
        </div>
      </div>
    </div>
  );
}
