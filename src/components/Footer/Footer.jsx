import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
    return (
        <section className="relative overflow-hidden py-10 bg-gradient-to-r from-gray-700 via-gray-900 to-black border-t-2 border-t-gray-800">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full p-6 md:w-1/2 lg:w-1/3">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="100px" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">
                                    &copy; Copyright 2025. All Rights Reserved by Mukul.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2 lg:w-1/3">
                        <div className="h-full">
                            <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-gray-400">
                                Quick Links
                            </h3>
                            <ul>
                                <li className="mb-2">
                                    <Link
                                        className="text-base font-medium text-gray-200 hover:text-gray-400 transition duration-300"
                                        to="/about"
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link
                                        className="text-base font-medium text-gray-200 hover:text-gray-400 transition duration-300"
                                        to="/contact"
                                    >
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-base font-medium text-gray-200 hover:text-gray-400 transition duration-300"
                                        to="/privacy"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent to-gray-900 opacity-50 transform skew-y-6"></div>
        </section>
    )
}

export default Footer
