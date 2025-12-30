import React, { useState } from "react";
import {
  Store,
  Mail,
  Phone,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Tag,
  Briefcase,
  Image,
} from "lucide-react";

export default function SellerVerificationPage({ sellerDetails }) {
  const [seller] = useState(sellerDetails || {});

  const getStatusColor = () => {
    switch (seller?.isApproved) {
      case "pending":
        return "bg-amber-50 border-amber-200";
      case "approved":
        return "bg-green-50 border-green-200";
      case "rejected":
        return "bg-red-50 border-red-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = () => {
    switch (seller?.isApproved) {
      case "pending":
        return <Clock className="text-amber-600" size={24} />;
      case "approved":
        return <CheckCircle className="text-green-600" size={24} />;
      case "rejected":
        return <AlertCircle className="text-red-600" size={24} />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (seller?.isApproved) {
      case "pending":
        return {
          title: "Pending Verification",
          text: "Your application is under review. Our team will verify your store details within 2-3 business days.",
        };
      case "approved":
        return {
          title: "Approved",
          text: "Congratulations! Your store has been approved and is now live.",
        };
      case "rejected":
        return {
          title: "Rejected",
          text: "Your application was rejected. Please contact support for more information.",
        };
      default:
        return { title: "Unknown", text: "" };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 min-h-screen">
      <div className="w-full max-w-4xl">
        <div
          className={`rounded-t-xl border-l-4 border-r-4 border-t-4 p-6 flex items-center justify-between ${getStatusColor()}`}
        >
          <div className="flex items-center gap-4">
            {getStatusIcon()}
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                {getStatusText()?.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {getStatusText()?.text}
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-4 py-2 rounded-full bg-white text-gray-700 border border-gray-200">
            Submitted: {formatDate(seller?.createdAt || new Date())}
          </span>
        </div>

        <div className="bg-white rounded-b-xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <div className="md:col-span-2 p-8 border-r border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-8">
                <Store size={28} className="text-blue-600" />
                Store Information
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Store Name
                  </label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 font-medium">
                    {seller?.storename || "N/A"}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Description
                  </label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 min-h-24">
                    {seller?.description || "No description provided"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      <Tag size={16} className="inline mr-2" />
                      Store Type
                    </label>
                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 font-medium capitalize">
                      {seller?.type || "N/A"}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      <Briefcase size={16} className="inline mr-2" />
                      Seller ID
                    </label>
                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 font-medium">
                      #{seller?.id || "N/A"}
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mt-8 pt-6 border-t border-gray-200">
                  <User size={22} className="text-blue-600" />
                  Owner Information
                </h3>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Owner Name
                  </label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 font-medium">
                    {seller?.user?.name || "N/A"}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    <Mail size={16} className="inline mr-2" />
                    Email Address
                  </label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800">
                    {seller?.user?.email || "N/A"}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    <Phone size={16} className="inline mr-2" />
                    Phone Number
                  </label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800">
                    {seller?.phoneNo || "Not provided"}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      <Calendar size={16} className="inline mr-2" />
                      Created Date
                    </label>
                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 text-sm">
                      {seller?.createdAt ? formatDate(seller.createdAt) : "N/A"}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-2">
                      <Calendar size={16} className="inline mr-2" />
                      Updated Date
                    </label>
                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 text-sm">
                      {seller?.updatedAt ? formatDate(seller.updatedAt) : "N/A"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gray-50 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Image size={22} className="text-blue-600" />
                  Store Image
                </h3>

                {seller?.image ? (
                  <div className="mb-6 rounded-lg overflow-hidden border-2 border-gray-300 shadow-md hover:shadow-lg transition">
                    <img
                      src={seller.image}
                      alt="Store"
                      className="w-full h-48 object-cover hover:scale-105 transition"
                    />
                  </div>
                ) : (
                  <div className="mb-6 rounded-lg border-2 border-dashed border-gray-300 bg-white h-48 flex items-center justify-center">
                    <p className="text-sm text-gray-500">No image provided</p>
                  </div>
                )}

                <h3 className="text-lg font-bold text-gray-800 mb-6">
                  Status Summary
                </h3>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                      User ID
                    </p>
                    <p className="text-lg font-bold text-gray-800">
                      {seller?.userID || "N/A"}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                      Seller ID
                    </p>
                    <p className="text-lg font-bold text-gray-800">
                      {seller?.id || "N/A"}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                      Account Type
                    </p>
                    <p className="text-lg font-bold text-gray-800 capitalize">
                      {seller?.type || "N/A"}
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-lg border-2 ${
                      seller?.isApproved === "pending"
                        ? "bg-amber-50 border-amber-200"
                        : seller?.isApproved === "approved"
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                      Status
                    </p>
                    <p
                      className={`text-lg font-bold capitalize ${
                        seller?.isApproved === "pending"
                          ? "text-amber-700"
                          : seller?.isApproved === "approved"
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {seller?.isApproved || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>

              {seller?.isApproved === "pending" && (
                <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <Clock size={16} className="inline mr-2" />
                    <span className="font-semibold">Note:</span> Your
                    application is being reviewed. Please wait for updates.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <Calendar size={16} className="inline mr-2" />
              Submitted on{" "}
              {seller?.createdAt ? formatDate(seller.createdAt) : "N/A"}
            </div>
            <div className="text-xs font-semibold text-gray-500">
              Reference ID: SELLER-{seller?.userID || "?"}-{seller?.id || "?"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
