import React from 'react';
import ImageAbout from '../assets/aboutimg.png'    
import TrueFocus from '../animations/animation';
import { FaStar } from 'react-icons/fa6';
import { usersImages } from '../constant/images/images-users';




const About = () => {
    const features = [
        { id : 1 , image : usersImages.user2 , title : "Samir ba" , description : "The Trading Hub is a game-changer! I had an old PC gathering dust and managed to swap it for a 27-inch monitor with a neighbor. The whole process was smooth, secure, and local.", rating: 5 } , 
        { id : 2 , image : usersImages.user16 , title : "Hamouda abl" , description : "I recently moved to a new city and felt quite isolated. Thanks to the Events section, I joined a cinema meetup and met some incredible people who are now my closest friends.", rating: 4 } , 
        { id : 3 , image : usersImages.user13 , title : "Oussama belle" , description : "I lost my car keys in the park and was panicking. I posted on 'Lost & Found,' and within 20 minutes, a neighbor reached out saying they found them. This community is amazing!", rating: 3 } ,
        { id : 4 , image : usersImages.user31 , title : "Siven rose" , description : "I love the idea of a knowledge-sharing economy. I taught a neighbor Photoshop, and in return, they helped me understand the basics of React. It's such a rewarding way to learn!", rating: 4 } ,
        { id : 5 , image : usersImages.user13 , title : "Ibra ls" , description : "Finding a workout partner used to be a struggle, but now I have a running buddy living just two blocks away. My motivation has skyrocketed since I joined the MarocConnect community!", rating: 5 } ,
    ]
    return (
        <div className='px-10 py-16 space-y-16 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50'>
            {/* Hero Image */}
            <div className="w-full  flex justify-center">
                <img className='w-full max-w-5xl rounded-3xl shadow-2xl' src="https://i.pinimg.com/1200x/21/a5/19/21a519be42e3e0c78875b24c8655cc3c.jpg" alt="Community" />
            </div>

            {/* Our Story Section */}
            <div className="text-center space-y-6 max-w-4xl mx-auto">
                <h1 className='font-extrabold text-5xl '>
                    <TrueFocus sentence="Our Story" borderColor="#C837AB" animationDuration={0.7} pauseBetweenAnimations={1}/>
                </h1>
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
                <h2 className='text-4xl font-bold text-center mb-12 '>
                    <TrueFocus sentence="What our community says" borderColor="#C837AB"/>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                        >
                            <div className="w-16 h-16 rounded-full flex items-center justify-center  mb-4">
                                <img className='w-16 h-16 object-cover  rounded-full' src={feature.image} alt="" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                            <p className="text-gray-600 leading-relaxed">" {feature.description} "</p>
                            <div className="mt-3 flex gap-0.5 text-amber-300">
                                {[...Array(feature.rating)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Community Impact Section */}
            <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-12">
                <h2 className='text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#8B3FDE] via-[#C837AB] to-[#FF6B35] bg-clip-text text-transparent'>
                    Community Impact
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <div className="text-5xl font-extrabold bg-gradient-to-r from-[#8B3FDE] to-[#C837AB] bg-clip-text text-transparent mb-2">10K+</div>
                        <p className="text-xl text-gray-700 font-semibold">Active Members</p>
                    </div>
                    <div>
                        <div className="text-5xl font-extrabold bg-gradient-to-r from-[#C837AB] to-[#FF6B35] bg-clip-text text-transparent mb-2">5K+</div>
                        <p className="text-xl text-gray-700 font-semibold">Items Exchanged</p>
                    </div>
                    <div>
                        <div className="text-5xl font-extrabold bg-gradient-to-r from-[#8B3FDE] to-[#FF6B35] bg-clip-text text-transparent mb-2">500+</div>
                        <p className="text-xl text-gray-700 font-semibold">Events Organized</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;
