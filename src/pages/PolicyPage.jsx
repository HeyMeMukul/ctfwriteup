import React from "react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-[#1e1e2e] text-white rounded-lg shadow-lg">
      <motion.h1
        className="text-3xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Privacy Policy
      </motion.h1>

      <p className="text-gray-300 text-lg">
        We respect your privacy and are committed to protecting your personal 
        data. This Privacy Policy explains how we collect, use, and disclose 
        your information when you use our website.
      </p>

      <h2 className="text-2xl font-semibold mt-6">1. Information We Collect</h2>
      <p className="text-gray-300">
        We collect information such as your name, email, and any content you 
        submit to our platform.
      </p>

      <h2 className="text-2xl font-semibold mt-6">2. How We Use Your Information</h2>
      <p className="text-gray-300">
        We use your data to improve our services, respond to inquiries, and 
        ensure a better user experience.
      </p>

      <h2 className="text-2xl font-semibold mt-6">3. Data Security</h2>
      <p className="text-gray-300">
        We implement security measures to protect your personal data. However, 
        no method of transmission over the internet is 100% secure.
      </p>

      <h2 className="text-2xl font-semibold mt-6">4. Contact Us</h2>
      <p className="text-gray-300">
        If you have any questions about our privacy practices, please 
        <a href="/contact" className="text-purple-400 hover:underline"> contact us</a>.
      </p>
    </div>
  );
}
