import Link from "next/link";
import { CheckCircle2, Clock, Shield, Package } from "lucide-react";
import { PhoneButton } from "@/components/phone-button";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-black rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-lg">PX</span>
              </div>
              <span className="text-xl font-bold">PlaqueXpress</span>
            </div>
            <div className="flex items-center gap-4">
              {/* Mobile phone button (icon only) */}
              <PhoneButton variant="accent" size="sm" showText={false} className="md:hidden" />

              {/* Desktop navigation */}
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
                <PhoneButton variant="accent" size="md" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Legal Vehicle Number Plates
              <span className="block mt-2 text-gray-600">Ready in 5 Hours</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Order custom legal number plates online for Mauritius and Rodrigues Island.
              Choose from 3D Acrylic or Standard Vinyl plates with instant preview.
            </p>
            <Link
              href="/builder"
              className="inline-block bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-4 rounded-lg text-lg transition-all shadow-md hover:shadow-lg"
            >
              Build Your Plate Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Production</h3>
              <p className="text-gray-600 text-sm">
                Ready in up to 5 working hours
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">100% Legal</h3>
              <p className="text-gray-600 text-sm">
                Only legal colors and Charles Wright font
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Live Preview</h3>
              <p className="text-gray-600 text-sm">
                See your plate design in real-time
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">
                Alucobond base with quality lettering
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Selection */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plate Type</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* 3D Acrylic Plate */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-transparent hover:border-yellow-400 transition-all">
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">3D Acrylic Plates</h3>
                    <p className="text-4xl font-bold text-yellow-600">Rs 1,200</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Raised 3D letters</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Premium Alucobond base</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Charles Wright font only</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Premium finish</span>
                    </li>
                  </ul>

                  <Link
                    href="/builder?type=3d"
                    className="block w-full bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg text-center transition-colors"
                  >
                    Select 3D Acrylic
                  </Link>
                </div>
              </div>

              {/* Standard Vinyl Plate */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-transparent hover:border-yellow-400 transition-all">
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">Standard Vinyl Plates</h3>
                    <p className="text-4xl font-bold text-yellow-600">Rs 800</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Flat vinyl letters</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Quality Alucobond base</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Charles Wright font only</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Professional finish</span>
                    </li>
                  </ul>

                  <Link
                    href="/builder?type=vinyl"
                    className="block w-full bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-lg text-center transition-colors"
                  >
                    Select Standard Vinyl
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Compliance Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="w-16 h-16 text-yellow-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">100% Legal Compliance</h2>
            <p className="text-lg text-gray-600 mb-8">
              All our plates meet Mauritius legal requirements with only approved colors and fonts.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3">Front Plates</h3>
                <div className="bg-white border-2 border-gray-300 rounded p-4 text-center">
                  <p className="text-3xl font-bold tracking-wider" style={{ fontFamily: 'monospace' }}>
                    ABC 1234
                  </p>
                  <p className="text-sm text-gray-600 mt-2">White background, black letters</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3">Rear Plates</h3>
                <div className="bg-yellow-400 border-2 border-gray-300 rounded p-4 text-center">
                  <p className="text-3xl font-bold tracking-wider" style={{ fontFamily: 'monospace' }}>
                    ABC 1234
                  </p>
                  <p className="text-sm text-gray-700 mt-2">Yellow background, black letters</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-yellow-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Order Your Plate?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get started now and have your legal number plate ready in just 5 working hours.
          </p>
          <Link
            href="/builder"
            className="inline-block bg-black hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-lg text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Start Building Now
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
              <p className="text-gray-400 text-sm mb-4">
                Mauritius & Rodrigues Island<br />
                Production time: Up to 5 hours
              </p>
              <PhoneButton variant="accent" size="sm" />
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
