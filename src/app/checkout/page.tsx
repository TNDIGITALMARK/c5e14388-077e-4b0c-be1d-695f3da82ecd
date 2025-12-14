"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function Checkout() {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    island: "mauritius",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    // Load order from sessionStorage
    const savedOrder = sessionStorage.getItem("plaqueXpressOrder");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    } else {
      // Redirect to builder if no order
      router.push("/builder");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order processing
    setTimeout(() => {
      // Generate order number
      const orderNum = `PX${new Date().getFullYear()}${String(
        Math.floor(Math.random() * 10000)
      ).padStart(4, "0")}`;
      setOrderNumber(orderNum);
      setOrderComplete(true);
      setIsSubmitting(false);

      // Clear order from sessionStorage
      sessionStorage.removeItem("plaqueXpressOrder");
    }, 2000);
  };

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Loading order...</p>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-black rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">PX</span>
              </div>
              <span className="text-xl font-bold">PlaqueXpress</span>
            </Link>
          </div>
        </nav>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>

              <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
              <p className="text-xl text-gray-600 mb-8">
                Thank you for your order. Your plate is now in production.
              </p>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                <p className="text-sm text-gray-600 mb-2">Order Number</p>
                <p className="text-3xl font-bold">{orderNumber}</p>
              </div>

              <div className="text-left bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="font-bold text-lg mb-4">Order Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-semibold">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-semibold">{formData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-semibold">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vehicle Type:</span>
                    <span className="font-semibold capitalize">
                      {order.vehicleType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plate Type:</span>
                    <span className="font-semibold">
                      {order.plateType === "3d" ? "3D Acrylic" : "Standard Vinyl"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plate Number:</span>
                    <span className="font-bold text-lg font-mono">
                      {order.plateNumber}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-300">
                    <span className="text-gray-600">Total Paid:</span>
                    <span className="font-bold text-lg text-yellow-600">
                      Rs {order.totalPrice}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
                <p className="text-sm text-green-800">
                  <strong>✅ Confirmation emails sent to:</strong>
                  <br />
                  Customer: {formData.email}
                  <br />
                  Admin: admin@plaquexpress.mu
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <p className="text-sm text-blue-800">
                  <strong>⏱️ Production Time:</strong> Your plate will be ready
                  in up to 5 working hours. We'll contact you when it's ready for
                  pickup or delivery.
                </p>
              </div>

              <Link
                href="/"
                className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-lg transition-colors"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-black rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">PX</span>
              </div>
              <span className="text-xl font-bold">PlaqueXpress</span>
            </Link>
            <Link
              href="/builder"
              className="flex items-center space-x-2 text-gray-600 hover:text-black"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Builder</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-xl font-bold mb-6">Customer Information</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Jean Claude Mauritius"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="230 5123 4567"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="customer@email.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Address *
                    </label>
                    <textarea
                      required
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      placeholder="Your full address"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Island *
                    </label>
                    <select
                      required
                      value={formData.island}
                      onChange={(e) =>
                        setFormData({ ...formData, island: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none"
                    >
                      <option value="mauritius">Mauritius</option>
                      <option value="rodrigues">Rodrigues Island</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-black font-bold px-6 py-4 rounded-lg transition-colors"
                  >
                    {isSubmitting ? "Processing Order..." : "Complete Order"}
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    By completing this order, you agree to our terms and conditions.
                  </p>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                {/* Plate Previews */}
                <div className="space-y-4 mb-6">
                  <div className="bg-white border-2 border-gray-300 rounded p-3 text-center">
                    <p
                      className="text-xl font-bold tracking-wider"
                      style={{ fontFamily: "monospace", letterSpacing: "0.15em" }}
                    >
                      {order.plateNumber}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Front Plate</p>
                  </div>
                  <div className="bg-yellow-400 border-2 border-gray-300 rounded p-3 text-center">
                    <p
                      className="text-xl font-bold tracking-wider"
                      style={{ fontFamily: "monospace", letterSpacing: "0.15em" }}
                    >
                      {order.plateNumber}
                    </p>
                    <p className="text-xs text-gray-700 mt-1">Rear Plate</p>
                  </div>
                </div>

                {/* Order Details */}
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vehicle Type:</span>
                    <span className="font-semibold capitalize">
                      {order.vehicleType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plate Type:</span>
                    <span className="font-semibold">
                      {order.plateType === "3d" ? "3D Acrylic" : "Standard Vinyl"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mounting:</span>
                    <span className="font-semibold capitalize">
                      {order.mountingOption === "holes" ? "Holes" : "Double-sided Tape"}
                    </span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Price:</span>
                    <span className="font-semibold">
                      Rs {order.plateType === "3d" ? 1500 : 800}
                    </span>
                  </div>
                  {order.mountingOption === "tape" && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mounting:</span>
                      <span className="font-semibold">Rs 50</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                    <span>Total:</span>
                    <span className="text-yellow-600">Rs {order.totalPrice}</span>
                  </div>
                </div>

                {/* Production Info */}
                <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded">
                  <p className="text-xs text-green-800 font-medium">
                    ⏱️ Production time: Up to 5 working hours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
