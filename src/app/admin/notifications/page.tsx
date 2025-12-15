"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Bell, Mail, MessageCircle, CheckCircle } from "lucide-react";

interface NotificationSettings {
  email_enabled: boolean;
  email_address: string | null;
  whatsapp_enabled: boolean;
  whatsapp_number: string | null;
}

export default function NotificationSettings() {
  const [settings, setSettings] = useState<NotificationSettings>({
    email_enabled: false,
    email_address: "",
    whatsapp_enabled: false,
    whatsapp_number: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const response = await fetch('/api/notifications/settings');
      const data = await response.json();

      if (data.settings) {
        setSettings(data.settings);
      }
    } catch (err) {
      console.error('Error loading settings:', err);
      setError('Failed to load settings');
    } finally {
      setLoading(false);
    }
  }

  async function saveSettings(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    setError("");

    try {
      const response = await fetch('/api/notifications/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settings)
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      console.error('Error saving settings:', err);
      setError(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading settings...</p>
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
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Bell className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Notification Settings</h1>
                <p className="text-gray-600 text-sm">Receive alerts when new orders are placed</p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                {error}
              </div>
            )}

            {saveSuccess && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Settings saved successfully!</span>
              </div>
            )}

            <form onSubmit={saveSettings} className="space-y-8">
              {/* Email Notifications */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Mail className="w-6 h-6 text-gray-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">Email Notifications</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Receive order details via email when a new order is placed
                    </p>

                    <label className="flex items-center gap-2 mb-4">
                      <input
                        type="checkbox"
                        checked={settings.email_enabled}
                        onChange={(e) => setSettings({ ...settings, email_enabled: e.target.checked })}
                        className="w-5 h-5 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                      />
                      <span className="font-medium">Enable email notifications</span>
                    </label>

                    {settings.email_enabled && (
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={settings.email_address || ""}
                          onChange={(e) => setSettings({ ...settings, email_address: e.target.value })}
                          placeholder="your@email.com"
                          required={settings.email_enabled}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* WhatsApp Notifications */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <MessageCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">WhatsApp Notifications</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Receive instant order alerts via WhatsApp message
                    </p>

                    <label className="flex items-center gap-2 mb-4">
                      <input
                        type="checkbox"
                        checked={settings.whatsapp_enabled}
                        onChange={(e) => setSettings({ ...settings, whatsapp_enabled: e.target.checked })}
                        className="w-5 h-5 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                      />
                      <span className="font-medium">Enable WhatsApp notifications</span>
                    </label>

                    {settings.whatsapp_enabled && (
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          WhatsApp Number (with country code)
                        </label>
                        <input
                          type="tel"
                          value={settings.whatsapp_number || ""}
                          onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                          placeholder="+230 5989 1414"
                          required={settings.whatsapp_enabled}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          Include country code (e.g., +230 for Mauritius)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>ℹ️ How it works:</strong>
                  <br />
                  When a customer completes an order, you'll receive notifications to the configured email and/or WhatsApp number with the order details.
                </p>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                <span>{saving ? 'Saving...' : 'Save Settings'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
