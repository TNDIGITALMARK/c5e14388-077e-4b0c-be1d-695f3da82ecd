"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { PhoneButton } from "@/components/phone-button";

type VehicleType = "car" | "motorcycle";
type PlateType = "3d" | "vinyl";
type MountingOption = "holes" | "tape";

export default function Builder() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialType = (searchParams.get("type") || "3d") as PlateType;

  const [step, setStep] = useState(1);
  const [vehicleType, setVehicleType] = useState<VehicleType>("car");
  const [plateType, setPlateType] = useState<PlateType>(initialType);
  const [plateNumber, setPlateNumber] = useState("");
  const [mountingOption, setMountingOption] = useState<MountingOption>("holes");

  // Calculate price
  const basePrice = plateType === "3d" ? 1200 : 800;
  const mountingPrice = mountingOption === "tape" ? 50 : 0;
  const totalPrice = basePrice + mountingPrice;

  // Validate plate number
  const validatePlateNumber = (value: string) => {
    // Allow only alphanumeric and spaces
    return value.toUpperCase().replace(/[^A-Z0-9 ]/g, "");
  };

  const handlePlateNumberChange = (value: string) => {
    const validated = validatePlateNumber(value);
    // Limit length based on vehicle type
    const maxLength = vehicleType === "car" ? 8 : 6;
    setPlateNumber(validated.slice(0, maxLength));
  };

  const canProceedToNextStep = () => {
    if (step === 1) return vehicleType !== "";
    if (step === 2) return plateType !== "";
    if (step === 3) return plateNumber.length >= 3;
    if (step === 4) return mountingOption !== "";
    return false;
  };

  const handleAddToCart = () => {
    // Store order in sessionStorage
    const order = {
      vehicleType,
      plateType,
      plateNumber,
      mountingOption,
      totalPrice,
    };
    sessionStorage.setItem("plaqueXpressOrder", JSON.stringify(order));
    router.push("/checkout");
  };

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
            <div className="flex items-center gap-4">
              <PhoneButton variant="accent" size="sm" showText={false} className="md:hidden" />
              <PhoneButton variant="accent" size="md" className="hidden md:flex" />
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-black"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-2 rounded-full mx-1 ${
                    s <= step ? "bg-yellow-400" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Vehicle Type</span>
              <span>Plate Type</span>
              <span>Plate Number</span>
              <span>Mounting</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Builder Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Build Your Plate</h2>

              {/* Step 1: Vehicle Type */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Step 1: Choose Vehicle Type
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setVehicleType("car")}
                      className={`p-6 border-2 rounded-lg transition-all ${
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
                      onClick={() => setVehicleType("motorcycle")}
                      className={`p-6 border-2 rounded-lg transition-all ${
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
              )}

              {/* Step 2: Plate Type */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Step 2: Choose Plate Type
                  </h3>
                  <div className="space-y-4">
                    <button
                      onClick={() => setPlateType("3d")}
                      className={`w-full p-6 border-2 rounded-lg transition-all text-left ${
                        plateType === "3d"
                          ? "border-yellow-400 bg-yellow-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-lg">3D Acrylic Plates</p>
                          <p className="text-sm text-gray-600">
                            Raised letters, premium finish
                          </p>
                        </div>
                        <p className="text-2xl font-bold text-yellow-600">
                          Rs 1,200
                        </p>
                      </div>
                    </button>
                    <button
                      onClick={() => setPlateType("vinyl")}
                      className={`w-full p-6 border-2 rounded-lg transition-all text-left ${
                        plateType === "vinyl"
                          ? "border-yellow-400 bg-yellow-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-lg">Standard Vinyl Plates</p>
                          <p className="text-sm text-gray-600">
                            Flat letters, professional finish
                          </p>
                        </div>
                        <p className="text-2xl font-bold text-yellow-600">
                          Rs 800
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Plate Number */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Step 3: Enter Plate Number
                  </h3>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Plate Number
                    </label>
                    <input
                      type="text"
                      value={plateNumber}
                      onChange={(e) => handlePlateNumberChange(e.target.value)}
                      placeholder={
                        vehicleType === "car" ? "ABC 1234" : "AB 123"
                      }
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none text-lg font-mono uppercase"
                      maxLength={vehicleType === "car" ? 8 : 6}
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      {vehicleType === "car"
                        ? "Maximum 8 characters"
                        : "Maximum 6 characters"}
                    </p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <strong>Legal Requirements:</strong> Only alphanumeric
                      characters are allowed. Charles Wright font will be used.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Mounting Option */}
              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Step 4: Choose Mounting Option
                  </h3>
                  <div className="space-y-4">
                    <button
                      onClick={() => setMountingOption("holes")}
                      className={`w-full p-6 border-2 rounded-lg transition-all text-left ${
                        mountingOption === "holes"
                          ? "border-yellow-400 bg-yellow-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-lg">Mounting Holes</p>
                          <p className="text-sm text-gray-600">
                            Standard screw mounting
                          </p>
                        </div>
                        <p className="text-lg font-bold">Included</p>
                      </div>
                    </button>
                    <button
                      onClick={() => setMountingOption("tape")}
                      className={`w-full p-6 border-2 rounded-lg transition-all text-left ${
                        mountingOption === "tape"
                          ? "border-yellow-400 bg-yellow-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-lg">Double-Sided Tape</p>
                          <p className="text-sm text-gray-600">
                            No drilling required
                          </p>
                        </div>
                        <p className="text-lg font-bold text-yellow-600">
                          +Rs 50
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
                {step < 4 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    disabled={!canProceedToNextStep()}
                    className="flex-1 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-black font-semibold rounded-lg transition-colors"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    disabled={!canProceedToNextStep()}
                    className="flex-1 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-black font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                )}
              </div>
            </div>

            {/* Live Preview */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Live Preview</h2>

              <div className="space-y-6">
                {/* Front Plate Preview */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-3">
                    Front Plate (White Background)
                  </h3>
                  <div className="bg-white border-4 border-gray-800 rounded-lg p-8 shadow-lg">
                    <div className="text-center">
                      <p
                        className="text-4xl md:text-5xl font-bold tracking-widest"
                        style={{
                          fontFamily: "monospace",
                          letterSpacing: "0.15em",
                        }}
                      >
                        {plateNumber || (vehicleType === "car" ? "ABC 1234" : "AB 123")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rear Plate Preview */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-3">
                    Rear Plate (Yellow Background)
                  </h3>
                  <div className="bg-yellow-400 border-4 border-gray-800 rounded-lg p-8 shadow-lg">
                    <div className="text-center">
                      <p
                        className="text-4xl md:text-5xl font-bold tracking-widest"
                        style={{
                          fontFamily: "monospace",
                          letterSpacing: "0.15em",
                        }}
                      >
                        {plateNumber || (vehicleType === "car" ? "ABC 1234" : "AB 123")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg p-6 mt-8">
                  <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vehicle Type:</span>
                      <span className="font-semibold capitalize">{vehicleType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plate Type:</span>
                      <span className="font-semibold">
                        {plateType === "3d" ? "3D Acrylic" : "Standard Vinyl"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mounting:</span>
                      <span className="font-semibold capitalize">
                        {mountingOption === "holes" ? "Holes" : "Double-sided Tape"}
                      </span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 mt-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Base Price:</span>
                        <span className="font-semibold">Rs {basePrice}</span>
                      </div>
                      {mountingPrice > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Mounting:</span>
                          <span className="font-semibold">Rs {mountingPrice}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t border-gray-300">
                        <span>Total:</span>
                        <span className="text-yellow-600">Rs {totalPrice}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                    <p className="text-sm text-green-800 font-medium">
                      ⏱️ Production time: Up to 5 working hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
