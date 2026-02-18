import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const Errors = () => {
    return (
        <div className='min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center px-6'>
            <div className='text-center space-y-8 max-w-2xl'>
                
                <div className='relative'>
                    <h1 className='text-[180px] md:text-[250px] font-extrabold leading-none bg-linear-to-r from-[#8B3FDE] via-[#C837AB] to-[#FF6B35] bg-clip-text text-transparent'>
                        404
                    </h1>
                    <div className='absolute inset-0 blur-3xl opacity-20 bg-linear-to-r from-[#8B3FDE] via-[#C837AB] to-[#FF6B35]'></div>
                </div>

                <div className='space-y-4'>
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-800'>
                        Oops! Page Not Found
                    </h2>
                    <p className='text-lg text-gray-600 leading-relaxed'>
                        The page you're looking for doesn't exist or has been moved.
                        Let's get you back to connecting with your neighbors!
                    </p>
                </div>

                {/* Buttons */}
                <div className='flex flex-col sm:flex-row gap-4 justify-center items-center pt-4'>
                    <Link 
                        to='/'
                        className='flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold bg-linear-to-r from-[#8B3FDE] via-[#C837AB] to-[#FF6B35] hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg'
                    >
                        <FiHome size={20} />
                        Go Home
                    </Link>
                    <button 
                        onClick={() => window.history.back()}
                        className='flex items-center gap-2 px-8 py-4 rounded-xl text-gray-700 font-semibold bg-white hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg border border-gray-200'
                    >
                        <FiArrowLeft size={20} />
                        Go Back
                    </button>
                </div>

                
                <div className='pt-8 opacity-50'>
                    <p className='text-sm text-gray-500'>Error Code: 404 | Page Not Found</p>
                </div>
            </div>
        </div>
    );
};

export default Errors;