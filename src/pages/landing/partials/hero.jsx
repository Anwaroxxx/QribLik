import React from 'react';
import { WiDirectionRight } from "react-icons/wi";
const Hero = () => {
    const ImageCarousel = () => {
        const [images, setImages] = useState([
            "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=800&q=80",
            "https://images.unsplash.com/photo-1606229365485-93a3b8ee0385?w=800&q=80",
            "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=800&q=80",
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"
        ]);

        useEffect(() => {
            const interval = setInterval(() => {
                setImages(prev => {
                    const newImages = [...prev];
                    const firstImage = newImages.shift(); // Remove first image
                    newImages.push(firstImage); // Add it to the end
                    return newImages;
                });
            }, 3000);

            return () => clearInterval(interval);
        }, []);
        return (
            <div>
                <div className="min-h-screen bg-[linear-gradient(160deg,_#ffffff_0%,_#f7f0ff_50%,_#fff5f0_100%)] h-500 px-30 pt-30">
                    <div>
                        <button className='text-[#8B3FDE] bg-[#8c3fde2b] rounded-2xl px-2 border-2'>
                            Your Community Hub
                        </button>
                        <h1>Help is <span>closer</span> <br />than you think</h1>
                        <p>Join QribLik to connect with people just blocks away. Whether <br />
                            you're offering your skills or need a helping hand, we're building a <br />
                            stronger, kinder neighborhood together.</p>
                        <div>
                            <button className='flex items-center'>Get Started <WiDirectionRight /> </button>
                            <button>Explore Features</button>
                        </div>

                    </div>
                    <div></div>


                </div>
            </div>
        );
    };
}

export default Hero