import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';

const Errors = () => {
    const { dark } = useTheme();

    return (
        <div
            className={`min-h-screen flex items-center justify-center px-6 transition-colors duration-500 ${
                dark
                    ? 'bg-gradient-to-br from-[#0f0a1e] via-[#130820] to-[#0a0514]'
                    : 'bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50'
            }`}
        >
            <div className='text-center space-y-8 max-w-2xl'>

                {/* 404 number */}
                <div className='relative'>
                    <h1 className='text-[180px] md:text-[250px] font-extrabold leading-none bg-gradient-to-r from-[#8B3FDE] via-[#C837AB] to-[#FF6B35] bg-clip-text text-transparent'>
                        404
                    </h1>
                    <div className='absolute inset-0 blur-3xl opacity-20 bg-gradient-to-r from-[#8B3FDE] via-[#C837AB] to-[#FF6B35]' />
                </div>

                {/* Text */}
                <div className='space-y-4'>
                    <h2
                        className={`text-3xl md:text-4xl font-bold transition-colors duration-500 ${
                            dark ? 'text-purple-50' : 'text-gray-800'
                        }`}
                    >
                        Oops! Page Not Found
                    </h2>
                    <p
                        className={`text-lg leading-relaxed transition-colors duration-500 ${
                            dark ? 'text-purple-200/60' : 'text-gray-600'
                        }`}
                    >
                        The page you're looking for doesn't exist or has been moved.
                        Let's get you back to connecting with your neighbors!
                    </p>
                </div>

                {/* Buttons */}
                <div className='flex flex-col sm:flex-row gap-4 justify-center items-center pt-4'>
                    <Link
                        to='/'
                        className='flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-[#8B3FDE] via-[#C837AB] to-[#FF6B35] hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg'
                    >
                        <FiHome size={20} />
                        Go Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all duration-500 hover:scale-105 shadow-lg ${
                            dark
                                ? 'bg-white/5 border border-purple-700/40 text-purple-100 hover:bg-white/10'
                                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <FiArrowLeft size={20} />
                        Go Back
                    </button>
                </div>

                {/* Footer note */}
                <div className='pt-8 opacity-50'>
                    <p
                        className={`text-sm transition-colors duration-500 ${
                            dark ? 'text-purple-300' : 'text-gray-500'
                        }`}
                    >
                        Error Code: 404 | Page Not Found
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Errors;