import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function HowItWorks() {
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
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-black font-medium">
                Home
              </Link>
              <Link href="/builder" className="text-gray-700 hover:text-black font-medium">
                Build Your Plate
              </Link>
              <Link href="/how-it-works" className="text-gray-700 hover:text-black font-medium">
                How It Works
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-black font-medium">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">How It Works</h1>
            <p className="text-xl text-gray-600">
              Ordering your legal number plate is simple and fast. Follow these easy steps.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Step 1 */}
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">Choose Your Vehicle Type</h3>
                <p className="text-gray-600 mb-4">
                  Select whether you need plates for a car or motorcycle. This determines
                  the size and format of your plate.
                </p>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <p className="text-sm font-semibold text-gray-700">Available Options:</p>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    <li>• Car plates (standard size)</li>
                    <li>• Motorcycle plates (compact size)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">Select Plate Type</h3>
                <p className="text-gray-600 mb-4">
                  Choose between 3D Acrylic plates with raised letters or Standard Vinyl
                  plates with flat lettering. Both meet legal requirements.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <p className="font-bold mb-2">3D Acrylic - Rs 1,500</p>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Raised 3D letters
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Premium finish
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Alucobond base
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <p className="font-bold mb-2">Standard Vinyl - Rs 800</p>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Flat vinyl letters
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Professional finish
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Alucobond base
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">Enter Your Plate Number</h3>
                <p className="text-gray-600 mb-4">
                  Type your plate number and see it update in real-time on both front
                  (white) and rear (yellow) plate previews.
                </p>
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Legal Requirements:</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Only alphanumeric characters allowed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Charles Wright font (legally required)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Front plate: white background, black letters</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Rear plate: yellow background, black letters</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">Choose Mounting Option</h3>
                <p className="text-gray-600 mb-4">
                  Select how you want to mount your plates. Standard holes are included,
                  or add double-sided tape for no-drill installation.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <p className="font-bold mb-2">Mounting Holes</p>
                    <p className="text-sm text-gray-600">
                      Standard screw mounting with pre-drilled holes. Included in base price.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                    <p className="font-bold mb-2">Double-Sided Tape (+Rs 50)</p>
                    <p className="text-sm text-gray-600">
                      Premium adhesive tape for no-drill installation. Easy to apply.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold">
                5
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">Checkout & Confirmation</h3>
                <p className="text-gray-600 mb-4">
                  Enter your contact details and complete your order. You'll receive
                  immediate confirmation via email.
                </p>
                <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <p className="text-sm font-semibold text-gray-700 mb-3">What happens next:</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <span>Order confirmation sent to your email</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <span>Admin notified with your specifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <span>Production begins immediately</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <span>Ready in up to 5 working hours</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <span>We contact you for pickup or delivery</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Production Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Production & Quality</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Materials Used</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Premium Alucobond base material</li>
                  <li>• Weather-resistant vinyl or acrylic lettering</li>
                  <li>• UV-protected finish for longevity</li>
                  <li>• Meets all legal requirements</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-3">Production Time</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Orders processed immediately</li>
                  <li>• Ready in up to 5 working hours</li>
                  <li>• Quality checked before dispatch</li>
                  <li>• Available for Mauritius & Rodrigues</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 to-yellow-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Build your custom legal number plate now and have it ready in just 5 working hours.
          </p>
          <Link
            href="/builder"
            className="inline-block bg-black hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-lg text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Build Your Plate Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">PlaqueXpress</h3>
              <p className="text-gray-400 text-sm">
                Legal vehicle number plates for Mauritius and Rodrigues Island
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/builder" className="text-gray-400 hover:text-white">
                    Build Your Plate
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works" className="text-gray-400 hover:text-white">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <p className="text-gray-400 text-sm">
                Mauritius & Rodrigues Island<br />
                Production time: Up to 5 hours
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 PlaqueXpress. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
