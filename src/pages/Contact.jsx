import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-[#1e1e2e] text-white rounded-lg shadow-lg">
      <motion.h1
        className="text-3xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Contact Us
      </motion.h1>

      <p className="text-gray-300 text-center mb-6">
        Have questions? Feel free to reach out.
      </p>

      <form className="space-y-4">
        <div>
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            className="w-full p-2 bg-[#2a2a3a] border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            className="w-full p-2 bg-[#2a2a3a] border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
            placeholder="Your Email"
          />
        </div>
        <div>
          <label className="block font-semibold">Message</label>
          <textarea
            className="w-full p-2 bg-[#2a2a3a] border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500"
            rows="4"
            placeholder="Your Message"
          ></textarea>
        </div>
        <button className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded-lg font-semibold">
          Send Message
        </button>
      </form>
    </div>
  );
}
