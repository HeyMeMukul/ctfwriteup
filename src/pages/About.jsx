import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-[#1e1e2e] text-white rounded-lg shadow-lg">
      <motion.h1
        className="text-3xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        About Us
      </motion.h1>

      <p className="text-gray-300 text-lg leading-relaxed">
        Welcome to our CTF Writeup platform! We aim to provide high-quality 
        cybersecurity challenge writeups to help learners and professionals 
        understand different attack methodologies.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Our Mission</h2>
      <p className="text-gray-300">
        We believe in sharing knowledge freely. Our goal is to help you learn 
        ethical hacking, penetration testing, and cybersecurity through 
        real-world challenges.
      </p>

      <h2 className="text-2xl font-semibold mt-6">Meet the Team</h2>
      <p className="text-gray-300">
        We are a group of cybersecurity enthusiasts passionate about learning 
        and sharing knowledge with the community.
      </p>
    </div>
  );
}
