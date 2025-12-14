"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, ShoppingCart, Info, Phone } from "lucide-react";
import { PhoneButton } from "@/components/phone-button";

type PlateType = "3d" | "vinyl";
type PlateShape = "standard" | "square";

// Standard plate dimensions in Mauritius (in cm)
const STANDARD_DIMENSIONS = {
  car: {
    standard: { width: 52, height: 11 },
    square: { width: 28, height: 20 }
  },
  motorcycle: {
    standard: { width: 28, height: 20 }
  }
};

export default function Builder() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialType = (searchParams.get("type") || "3d") as PlateType;

  const [plateType, setPlateType] = useState<PlateType>(initialType);
  const [plateNumber, setPlateNumber] = useState("");
  const [plateShape, setPlateShape] = useState<PlateShape>("standard");
  const [vehicleType, setVehicleType] = useState<"car" | "motorcycle">("car");
  const [useCustomDimensions, setUseCustomDimensions] = useState(false);
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  // Calculate price - only tape option available
  const basePrice = plateType === "3d" ? 1200 : 800;
  const tapePrice = 50; // Heavy-duty double-sided tape is mandatory
  const totalPrice = basePrice + tapePrice;

  // Get current dimensions
  const getCurrentDimensions = () => {
    if (useCustomDimensions && customWidth && customHeight) {
      return { width: parseFloat(customWidth), height: parseFloat(customHeight) };
    }
    if (vehicleType === "motorcycle") {
      return STANDARD_DIMENSIONS.motorcycle.standard;
    }
    return STANDARD_DIMENSIONS.car[plateShape];
  };

  // Validate plate number (max 9 characters)
  const validatePlateNumber = (value: string) => {
    return value.toUpperCase().replace(/[^A-Z0-9 ]/g, "").slice(0, 9);
  };

  const handlePlateNumberChange = (value: string) => {
    const validated = validatePlateNumber(value);
    setPlateNumber(validated);
  };

  const canProceedToCheckout = () => {
    return (
      plateNumber.length >= 3 &&
      fullName.trim() !== "" &&
      phone.trim() !== "" &&
      address.trim() !== ""
    );
  };

  const handleProceedToCheckout = () => {
    const dimensions = getCurrentDimensions();
    const order = {
      plateType,
      plateNumber,
      plateShape,
      vehicleType,
      dimensions,
      fullName,
      phone,
      address,
      additionalNotes,
      totalPrice,
    };
    sessionStorage.setItem("plaqueXpressOrder", JSON.stringify(order));
    router.push("/checkout");
  };

  const dimensions = getCurrentDimensions();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-black rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">PX</span>
              </div>
              <span className="text-xl font-bold">PlaqueXpress</span>
            </Link>
            <div className="flex items-center gap-4">
              <PhoneButton variant="accent" size="sm" showText={false} className="md:hidden" />
              <PhoneButton variant="accent" size="md" className="hidden md:flex" />
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-black"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Build Your Number Plate
          </h1>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {/* Configuration Panel */}
            <div className="space-y-6">
              {/* Plate Type Selection - Direct, no steps */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Choose Plate Type</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setPlateType("3d")}
                    className={`p-4 border-2 rounded-lg transition-all text-left ${
                      plateType === "3d"
                        ? "border-yellow-400 bg-yellow-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <p className="font-bold text-lg">3D Acrylic</p>
                    <p className="text-sm text-gray-600 mb-2">Raised letters</p>
                    <p className="text-2xl font-bold text-yellow-600">Rs 1,200</p>
                  </button>
                  <button
                    onClick={() => setPlateType("vinyl")}
                    className={`p-4 border-2 rounded-lg transition-all text-left ${
                      plateType === "vinyl"
                        ? "border-yellow-400 bg-yellow-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <p className="font-bold text-lg">Standard Vinyl</p>
                    <p className="text-sm text-gray-600 mb-2">Flat letters</p>
                    <p className="text-2xl font-bold text-yellow-600">Rs 800</p>
                  </button>
                </div>
              </div>

              {/* Vehicle Type */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Vehicle Type</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setVehicleType("car");
                      setPlateShape("standard");
                    }}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      vehicleType === "car"
                        ? "border-yellow-400 bg-yellow-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">🚗</div>
                      <p className="font-semibold">Car</p>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setVehicleType("motorcycle");
                      setPlateShape("standard");
                    }}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      vehicleType === "motorcycle"
                        ? "border-yellow-400 bg-yellow-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">🏍️</div>
                      <p className="font-semibold">Motorcycle</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Plate Shape (for cars only) */}
              {vehicleType === "car" && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold mb-4">Plate Shape</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => setPlateShape("standard")}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        plateShape === "standard"
                          ? "border-yellow-400 bg-yellow-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-center">
                        <div className="w-full h-8 bg-gray-200 rounded mb-2"></div>
                        <p className="font-semibold text-sm">Full Rectangle</p>
                        <p className="text-xs text-gray-600">52 × 11 cm</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setPlateShape("square")}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        plateShape === "square"
                          ? "border-yellow-400 bg-yellow-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-center">
                        <div className="w-20 h-16 bg-gray-200 rounded mb-2 mx-auto"></div>
                        <p className="font-semibold text-sm">Square-like</p>
                        <p className="text-xs text-gray-600">28 × 20 cm</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Plate Number Input */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Your Plate Number</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Enter your registration number (Max 9 characters)
                    </label>
                    <input
                      type="text"
                      value={plateNumber}
                      onChange={(e) => handlePlateNumberChange(e.target.value)}
                      placeholder="ABC 1234"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none text-2xl md:text-3xl font-bold text-center uppercase tracking-wider"
                      maxLength={9}
                      autoComplete="off"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-gray-500">
                        {plateNumber.length}/9 characters
                      </p>
                      {plateNumber.length === 9 && (
                        <p className="text-sm text-yellow-600 font-medium">Maximum reached</p>
                      )}
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-gray-700">
                      <strong>Legal requirements:</strong> Only letters, numbers, and spaces allowed. Charles Wright font used for legal compliance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Dimensions Configuration */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Plate Dimensions</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="customDimensions"
                      checked={useCustomDimensions}
                      onChange={(e) => setUseCustomDimensions(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-yellow-400"
                    />
                    <label htmlFor="customDimensions" className="text-sm">
                      <span className="font-medium">Use custom dimensions</span>
                      <p className="text-gray-600 text-xs mt-1">
                        Measure your existing plate carefully in centimeters
                      </p>
                    </label>
                  </div>

                  {useCustomDimensions ? (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Width (cm)</label>
                        <input
                          type="number"
                          value={customWidth}
                          onChange={(e) => setCustomWidth(e.target.value)}
                          placeholder="52"
                          step="0.1"
                          min="10"
                          max="100"
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Height (cm)</label>
                        <input
                          type="number"
                          value={customHeight}
                          onChange={(e) => setCustomHeight(e.target.value)}
                          placeholder="11"
                          step="0.1"
                          min="5"
                          max="50"
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm font-medium mb-2">Standard Mauritius Dimensions:</p>
                      <div className="space-y-1 text-sm text-gray-700">
                        <p>• Car (Full Rectangle): 52 × 11 cm</p>
                        <p>• Car (Square-like): 28 × 20 cm</p>
                        <p>• Motorcycle: 28 × 20 cm</p>
                      </div>
                      <p className="text-xs text-gray-600 mt-3">
                        Current: {dimensions.width} × {dimensions.height} cm
                      </p>
                    </div>
                  )}

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
                    <Info className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-700">
                      For accurate measurements or assistance, call{" "}
                      <a href="tel:+2305989 1414" className="font-bold text-black hover:text-yellow-600">
                        5989 1414
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="5989 1414"
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Delivery Address *</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street, Town, Mauritius/Rodrigues"
                      rows={3}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none resize-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Additional Notes (Optional)</label>
                    <textarea
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="Any special instructions or requests..."
                      rows={2}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Live Preview - Sticky on desktop */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Live Preview</h2>

                <div className="space-y-6">
                  {/* Front Plate Preview */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-3">
                      Front Plate (White Background)
                    </h3>
                    <div
                      className="bg-white border-4 border-gray-800 rounded-lg shadow-lg overflow-hidden"
                      style={{
                        aspectRatio: `${dimensions.width} / ${dimensions.height}`,
                        maxWidth: '100%',
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center p-4">
                        <p
                          className="font-bold text-black tracking-wider text-center leading-none"
                          style={{
                            fontFamily: "monospace",
                            fontSize: `clamp(1.5rem, ${Math.min(dimensions.width / plateNumber.length * 0.5, 4)}rem, 4rem)`,
                            letterSpacing: "0.15em",
                          }}
                        >
                          {plateNumber || "ABC 1234"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Rear Plate Preview */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 mb-3">
                      Rear Plate (Yellow Background)
                    </h3>
                    <div
                      className="bg-yellow-400 border-4 border-gray-800 rounded-lg shadow-lg overflow-hidden"
                      style={{
                        aspectRatio: `${dimensions.width} / ${dimensions.height}`,
                        maxWidth: '100%',
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center p-4">
                        <p
                          className="font-bold text-black tracking-wider text-center leading-none"
                          style={{
                            fontFamily: "monospace",
                            fontSize: `clamp(1.5rem, ${Math.min(dimensions.width / plateNumber.length * 0.5, 4)}rem, 4rem)`,
                            letterSpacing: "0.15em",
                          }}
                        >
                          {plateNumber || "ABC 1234"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gray-50 rounded-lg p-6 mt-6">
                    <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Plate Type:</span>
                        <span className="font-semibold">
                          {plateType === "3d" ? "3D Acrylic" : "Standard Vinyl"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vehicle:</span>
                        <span className="font-semibold capitalize">{vehicleType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shape:</span>
                        <span className="font-semibold capitalize">
                          {plateShape === "standard" ? "Full Rectangle" : "Square-like"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dimensions:</span>
                        <span className="font-semibold">{dimensions.width} × {dimensions.height} cm</span>
                      </div>
                      <div className="border-t border-gray-300 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Base Price:</span>
                          <span className="font-semibold">Rs {basePrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Heavy-duty Tape:</span>
                          <span className="font-semibold">Rs {tapePrice}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t border-gray-300">
                          <span>Total:</span>
                          <span className="text-yellow-600">Rs {totalPrice}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                      <p className="text-sm text-green-800 font-medium">
                        ⏱️ Ready in up to 5 working hours
                      </p>
                    </div>
                    <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded">
                      <p className="text-xs text-gray-700">
                        <strong>Note:</strong> All plates include heavy-duty double-sided tape for secure mounting. No drilling required.
                      </p>
                    </div>
                  </div>

                  {/* Payment Instructions */}
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 border-2 border-yellow-300">
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Phone className="w-5 h-5 text-yellow-600" />
                      MCB Juice Payment
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="bg-white/80 rounded p-3">
                        <p className="font-semibold mb-2">How to pay:</p>
                        <ol className="list-decimal list-inside space-y-1 text-gray-700">
                          <li>Open MCB Juice app on your mobile</li>
                          <li>Select "Pay" or "Send Money"</li>
                          <li>Enter: <span className="font-bold text-black">5989 1414</span></li>
                          <li>Amount: <span className="font-bold text-yellow-600">Rs {totalPrice}</span></li>
                          <li>Reference: <span className="font-bold">plaquexpress</span></li>
                        </ol>
                      </div>
                      <div className="bg-yellow-200/50 rounded p-3">
                        <p className="font-semibold mb-1">After payment:</p>
                        <p className="text-gray-700">
                          Send payment proof (screenshot) to{" "}
                          <a href="tel:+2305989 1414" className="font-bold text-black hover:text-yellow-700">
                            5989 1414
                          </a>
                          {" "}via WhatsApp or SMS with reference: <span className="font-bold">plaquexpress</span>
                        </p>
                      </div>
                      <p className="text-xs text-gray-600 italic">
                        For any questions, call us at 5989 1414
                      </p>
                    </div>
                  </div>

                  {/* Proceed Button */}
                  <button
                    onClick={handleProceedToCheckout}
                    disabled={!canProceedToCheckout()}
                    className="w-full px-6 py-4 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-black font-bold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-lg"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    {canProceedToCheckout() ? "Complete Order" : "Fill in all required fields"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
