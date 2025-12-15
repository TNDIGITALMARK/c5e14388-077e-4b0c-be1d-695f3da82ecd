"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, Phone } from "lucide-react";

export default function Checkout() {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    // Load order from sessionStorage
    const savedOrder = sessionStorage.getItem("plaqueXpressOrder");
    if (savedOrder) {
      const orderData = JSON.parse(savedOrder);
      setOrder(orderData);

      // Auto-generate order number
      const orderNum = `PX${new Date().getFullYear()}${String(
        Math.floor(Math.random() * 10000)
      ).padStart(4, "0")}`;
      setOrderNumber(orderNum);

      // Save order to database and trigger notifications
      saveOrderToDatabase(orderData, orderNum);

      setOrderComplete(true);
    } else {
      // Redirect to builder if no order
      router.push("/builder");
    }
  }, [router]);

  async function saveOrderToDatabase(orderData: any, orderNum: string) {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderNumber: orderNum,
          fullName: orderData.fullName,
          phone: orderData.phone,
          address: orderData.address,
          plateNumber: orderData.plateNumber,
          vehicleType: orderData.vehicleType,
          plateType: orderData.plateType,
          plateShape: orderData.plateShape,
          dimensions: orderData.dimensions,
          totalPrice: orderData.totalPrice,
          additionalNotes: orderData.additionalNotes,
          orderData: orderData
        })
      });

      if (!response.ok) {
        console.error('Failed to save order to database');
      } else {
        console.log('Order saved successfully and notifications sent');
      }
    } catch (error) {
      console.error('Error saving order:', error);
    }
  }

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

        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>

              <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Thank you! Your order details have been recorded.
              </p>

              <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6 mb-8">
                <p className="text-sm text-gray-600 mb-2">Order Number</p>
                <p className="text-2xl md:text-3xl font-bold">{orderNumber}</p>
              </div>

              <div className="text-left bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="font-bold text-lg mb-4">Order Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-semibold">{order.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-semibold">{order.phone}</span>
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
                    <span className="text-gray-600">Plate Shape:</span>
                    <span className="font-semibold capitalize">
                      {order.plateShape === "standard" ? "Full Rectangle" : "Square-like"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dimensions:</span>
                    <span className="font-semibold">
                      {order.dimensions.width} × {order.dimensions.height} cm
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plate Number:</span>
                    <span className="font-bold text-lg font-mono">
                      {order.plateNumber}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-300">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-bold text-xl text-yellow-600">
                      Rs {order.totalPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Instructions */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 border-2 border-yellow-300 mb-8">
                <h3 className="font-bold text-lg mb-4 flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5 text-yellow-600" />
                  Complete Payment with MCB Juice
                </h3>
                <div className="space-y-4 text-sm text-left">
                  <div className="bg-white/80 rounded p-4">
                    <p className="font-semibold mb-3">Payment Instructions:</p>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700">
                      <li>Open MCB Juice app on your mobile phone</li>
                      <li>Select "Pay" or "Send Money"</li>
                      <li>Enter phone number: <span className="font-bold text-black">5989 1414</span></li>
                      <li>Enter amount: <span className="font-bold text-yellow-600">Rs {order.totalPrice}</span></li>
                      <li>Add reference: <span className="font-bold text-black">plaquexpress</span></li>
                      <li>Complete the payment</li>
                    </ol>
                  </div>
                  <div className="bg-yellow-200/60 rounded p-4">
                    <p className="font-semibold mb-2 text-gray-900">⚠️ Important - After Payment:</p>
                    <p className="text-gray-800">
                      Send payment proof (screenshot) via WhatsApp or SMS to{" "}
                      <a href="tel:+2305989 1414" className="font-bold text-black hover:text-yellow-700 underline">
                        5989 1414
                      </a>
                    </p>
                    <p className="text-gray-800 mt-2">
                      Include reference: <span className="font-bold">plaquexpress</span> and your order number: <span className="font-bold">{orderNumber}</span>
                    </p>
                  </div>
                  <div className="bg-white/80 rounded p-4">
                    <p className="text-gray-700">
                      <strong>Delivery Address:</strong><br />
                      {order.address}
                    </p>
                    {order.additionalNotes && (
                      <p className="text-gray-700 mt-2">
                        <strong>Notes:</strong><br />
                        {order.additionalNotes}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
                <p className="text-sm text-green-800">
                  <strong>✅ Order Recorded</strong>
                  <br />
                  Production will start once payment is confirmed.
                  <br />
                  Ready in up to 5 working hours after payment confirmation.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <p className="text-sm text-blue-800">
                  <strong>📞 Need Help?</strong>
                  <br />
                  Call or WhatsApp us at{" "}
                  <a href="tel:+2305989 1414" className="font-bold text-black hover:text-blue-700 underline">
                    5989 1414
                  </a>
                  <br />
                  for any questions or assistance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-lg transition-colors"
                >
                  Return to Home
                </Link>
                <Link
                  href="/builder"
                  className="inline-block bg-gray-200 hover:bg-gray-300 text-black font-bold px-8 py-3 rounded-lg transition-colors"
                >
                  Order Another Plate
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
