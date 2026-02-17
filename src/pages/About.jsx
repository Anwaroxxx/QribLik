import React from 'react';
import { GiCardExchange } from 'react-icons/gi';
import { IoMdSwap } from 'react-icons/io';
import { MdOutlineEventNote, MdOutlineSportsHandball } from 'react-icons/md';
import { TbReportSearch } from 'react-icons/tb';

const About = () => {
    const features = [
        { icon : <IoMdSwap/> , title : "Trading Hub" , description : "what you don't need or find your next treasure. Whether it's tech, books, or furniture, our Trading Hub lets you swap items directly with people in your neighborhood. It's sustainable, local, and built on trust."} , 
        { icon : <MdOutlineEventNote/> , title : "Events" , description : "Never head out alone. From cinema nights and coffee meetups to gallery visits, post your plans and find like-minded people to join you. Turn every outing into a shared experience and build new friendships."} , 
        { icon : <TbReportSearch/> , title : "Lost & Found" , description : "A dedicated space to reconnect people with their belongings. If you've lost something or found an item in your area, post it here. Our community works together to make sure everything finds its way back home."} ,
        { icon : <MdOutlineSportsHandball/> , title : "Sports" , description : "Find your perfect workout partner. Whether you're looking for a running buddy, a football team, or a gym mate, the Sport category connects you with active neighbors to keep you motivated and healthy."} ,
        { icon : <GiCardExchange/> , title : "Skill Swap" , description : "Share what you know and learn what you don't. Trade your Photoshop skills for web development lessons, or cooking tips for language practice. It's a knowledge-sharing economy where everyone has something valuable to offer."} ,
    ]
    return (
        <div className='px-10 py-16 space-y-16 bg-linear-to-br from-purple-50 via-pink-50 to-orange-50'>
            {/* Hero Image */}
            <div className="w-full flex justify-center">
                <img className='w-full max-w-5xl rounded-3xl shadow-2xl' src="https://i.pinimg.com/1200x/21/a5/19/21a519be42e3e0c78875b24c8655cc3c.jpg" alt="Community" />
            </div>

            {/* Our Story Section */}
            <div className="text-center space-y-6 max-w-4xl mx-auto">
                <h1 className='font-extrabold text-5xl bg-gradient-to-r from-[#8B3FDE] via-[#C837AB] to-[#FF6B35] bg-clip-text text-transparent'>Our Story</h1>
                <p className='text-lg text-gray-700 leading-relaxed'>
                    We started Connect because we believed in something simple: neighbors helping
                    neighbors creates stronger, happier communities. In a world where we're more connected
                    than ever online, we felt more disconnected from the people living right next door.
                    <br/><br/>
                    What began as a small neighborhood experiment has grown into a thriving platform
                    where thousands of people discover the joy of true community connection. Every day, we
                    see strangers become friends, skills being shared, and neighborhoods transforming into
                    extended families.
                    <br/><br/>
                    This is more than an app—it's a movement to rebuild the fabric of community, one
                    connection at a time.
                </p>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto">
                <h2 className='text-4xl font-bold text-center mb-12 bg-linear-to-r from-[#8B3FDE] via-[#C837AB] to-[#FF6B35] bg-clip-text text-transparent'>
                    What We Offer
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                        >
                            <div className="w-16 h-16 rounded-xl bg-linear-to-br from-[#8B3FDE] via-[#C837AB] to-[#FF6B35] flex items-center justify-center text-white text-3xl mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Community Impact Section */}
            <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-12">
                <h2 className='text-4xl font-bold text-center mb-12 bg-linear-to-r from-[#8B3FDE] via-[#C837AB] to-[#FF6B35] bg-clip-text text-transparent'>
                    Community Impact
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <div className="text-5xl font-extrabold bg-linear-to-r from-[#8B3FDE] to-[#C837AB] bg-clip-text text-transparent mb-2">10K+</div>
                        <p className="text-xl text-gray-700 font-semibold">Active Members</p>
                    </div>
                    <div>
                        <div className="text-5xl font-extrabold bg-linear-to-r from-[#C837AB] to-[#FF6B35] bg-clip-text text-transparent mb-2">5K+</div>
                        <p className="text-xl text-gray-700 font-semibold">Items Exchanged</p>
                    </div>
                    <div>
                        <div className="text-5xl font-extrabold bg-linear-to-r from-[#8B3FDE] to-[#FF6B35] bg-clip-text text-transparent mb-2">500+</div>
                        <p className="text-xl text-gray-700 font-semibold">Events Organized</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
