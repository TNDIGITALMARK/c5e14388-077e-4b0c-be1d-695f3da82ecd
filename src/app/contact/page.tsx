"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { PhoneButton } from "@/components/phone-button";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 3000);
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

      {/* Hero */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-gray-600">
              Have questions? We're here to help. Get in touch with our team.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                <p className="text-gray-600 mb-8">
                  We're available to answer your questions about our legal number plates,
                  production times, and ordering process.
                </p>

                <div className="space-y-6">
                  {/* Location */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Service Area</h3>
                      <p className="text-gray-600 text-sm">
                        Mauritius & Rodrigues Island
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Phone</h3>
                      <PhoneButton variant="outline" size="sm" />
                      <p className="text-gray-500 text-xs mt-2">
                        Available during business hours
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-gray-600 text-sm">info@plaquexpress.mu</p>
                      <p className="text-gray-500 text-xs mt-1">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Business Hours</h3>
                      <div className="text-gray-600 text-sm space-y-1">
                        <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                        <p>Saturday: 9:00 AM - 1:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Production Info */}
                <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-bold mb-2">Fast Production</h3>
                  <p className="text-sm text-gray-700">
                    All plates are produced in up to 5 working hours. Order online and
                    we'll notify you when your plates are ready for pickup or delivery.
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-gray-600">
                      Thank you for contacting us. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
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
                        placeholder="Your name"
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
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
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
                        Subject *
                      </label>
                      <select
                        required
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none"
                      >
                        <option value="">Select a subject</option>
                        <option value="order-inquiry">Order Inquiry</option>
                        <option value="technical-support">Technical Support</option>
                        <option value="pricing">Pricing Question</option>
                        <option value="legal-requirements">Legal Requirements</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="How can we help you?"
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-yellow-400 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">
                  How long does production take?
                </h3>
                <p className="text-gray-600">
                  All plates are ready in up to 5 working hours from the time you place
                  your order. We'll contact you as soon as they're ready.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">
                  Are your plates legal in Mauritius?
                </h3>
                <p className="text-gray-600">
                  Yes, all our plates meet Mauritius legal requirements. We use only
                  approved Charles Wright font and legal color combinations (white/black
                  for front, yellow/black for rear).
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">
                  What's the difference between 3D and Vinyl plates?
                </h3>
                <p className="text-gray-600">
                  3D Acrylic plates have raised letters for a premium look (Rs 1,200),
                  while Standard Vinyl plates have flat letters (Rs 800). Both are fully
                  legal and made with quality Alucobond base material.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">
                  Do you deliver to Rodrigues Island?
                </h3>
                <p className="text-gray-600">
                  Yes, we service both Mauritius and Rodrigues Island. Delivery options
                  and timing will be confirmed during the ordering process.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">
                  Can I choose any font or color?
                </h3>
                <p className="text-gray-600">
                  No, to maintain legal compliance, we only use Charles Wright font and
                  legal color combinations. This ensures your plates are fully compliant
                  with local regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 to-yellow-500">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Order?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start building your custom legal number plate now.
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
