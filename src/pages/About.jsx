import TrueFocus from "../animations/TrueFocus";
import { usersImages } from "../constant/images/images-users";
import MagicBento from "../components/MagicBento";
import UserData from "../data/UserData.json";
import SwapGalleryCarousel from "../components/SwapGalleryCarousel";
import PixelBlast from "../animations/Pixel";
import { Link } from "react-router-dom";
import { Image } from "../constant/images/images-activité";
import { useTheme } from "../contexts/ThemeContext";

const About = () => {
  const { dark } = useTheme();

  const features = [
    {
      id: 1,
      image: usersImages.user2,
      title: UserData[1].name,
      description:
        "The Trading Hub is a game-changer! I had an old PC gathering dust and managed to swap it for a 27-inch monitor with a neighbor. The whole process was smooth, secure, and local.",
      rating: 5,
    },
    {
      id: 2,
      image: usersImages.girl3,
      title: UserData[14].name,
      description:
        "I recently moved to a new city and felt quite isolated. Thanks to the Events section, I joined a cinema meetup and met some incredible people who are now my closest friends.",
      rating: 4,
    },
    {
      id: 3,
      image: usersImages.user29,
      title: UserData[27].name,
      description:
        "I lost my car keys in the park and was panicking. I posted on 'Lost & Found,' and within 20 minutes, a neighbor reached out saying they found them. This community is amazing!",
      rating: 3,
    },
    {
      id: 4,
      image: usersImages.user31,
      title: UserData[31].name,
      description:
        "I love the idea of a knowledge-sharing economy. I taught a neighbor Photoshop, and in return, they helped me understand the basics of React. It's such a rewarding way to learn!",
      rating: 4,
    },
    {
      id: 5,
      image: usersImages.girl11,
      title: UserData[12].name,
      description:
        "Finding a workout partner used to be a struggle, but now I have a running buddy living just two blocks away. My motivation has skyrocketed since I joined the MarocConnect community!",
      rating: 5,
    },
    {
      id: 6,
      image: usersImages.user15,
      title: UserData[45].name,
      description:
        "Finding a workout partner used to be a struggle, but now I have a running buddy living just two blocks away. My motivation has skyrocketed since I joined the MarocConnect community!",
      rating: 5,
    },
  ];

  return (
    <div
      className={`px-10 py-16 space-y-16 transition-colors duration-500 ${dark
          ? "bg-[#0d0719]"
          : "bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50"
        }`}
    >
      {/* ── Navbar ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 4000,
          height: 60,
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          background: dark ? "rgba(13,7,25,0.92)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(24px)",
          borderBottom: dark
            ? "1px solid rgba(139,63,222,0.12)"
            : "1px solid rgba(139,92,246,0.1)",
          boxShadow: dark
            ? "0 2px 20px rgba(0,0,0,0.4)"
            : "0 2px 20px rgba(139,92,246,0.07)",
          overflow: "hidden",
          transition: "background 0.4s, border-color 0.4s",
        }}
      >
        {/* Pixel background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            opacity: dark ? 0.05 : 0.08,
            pointerEvents: "none",
          }}
        >
          <PixelBlast
            variant="square"
            pixelSize={3}
            color="#d946ef"
            patternScale={2}
            patternDensity={1}
            pixelSizeJitter={0}
            enableRipples
            rippleSpeed={0.5}
            rippleThickness={0.1}
            rippleIntensityScale={1.2}
            speed={0.6}
            edgeFade={0.3}
            transparent
          />
        </div>

        {/* Logo */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            padding: "0 20px 0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <img
            src={Image.logo}
            alt="Qriblik Logo"
            style={{
              width: "100px",
              height: "auto",
              cursor: "pointer",
              transition: "transform 0.3s ease",
              filter: dark ? "brightness(1.1)" : "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>

        {/* Nav links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 100,
            flex: 1,
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {["Home", "About", "Support"].map((label, i) => (
            <Link
              key={label}
              to={["/home", "/about", "/support"][i]}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 500,
                color: dark ? "rgba(196,168,255,0.6)" : "#6B7280",
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#8B5CF6";
                e.currentTarget.style.background = dark
                  ? "rgba(139,92,246,0.15)"
                  : "rgba(139,92,246,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = dark
                  ? "rgba(196,168,255,0.6)"
                  : "#6B7280";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* ── Swap Gallery ── */}
      <div className="max-w-6xl mt-10 mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          <TrueFocus sentence="Swap Gallery" borderColor="#C837AB" />
          <SwapGalleryCarousel />
        </h2>
      </div>

      {/* ── Our Story ── */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <h1 className="font-extrabold text-5xl">
          <TrueFocus
            sentence="Our Story"
            borderColor="#C837AB"
            animationDuration={0.7}
            pauseBetweenAnimations={1}
          />
        </h1>
        <p
          className={`text-lg leading-relaxed transition-colors duration-300 ${dark ? "text-purple-200/60" : "text-gray-700"
            }`}
        >
          We started Connect because we believed in something simple: neighbors
          helping neighbors creates stronger, happier communities. In a world
          where we're more connected than ever online, we felt more disconnected
          from the people living right next door.
          <br />
          <br />
          What began as a small neighborhood experiment has grown into a
          thriving platform where thousands of people discover the joy of true
          community connection. Every day, we see strangers become friends,
          skills being shared, and neighborhoods transforming into extended
          families.
          <br />
          <br />
          This is more than an app—it's a movement to rebuild the fabric of
          community, one connection at a time.
        </p>
      </div>

      {/* ── Community Says ── */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          <TrueFocus sentence="What our community says" borderColor="#C837AB" />
        </h2>
        <MagicBento features={features} />
      </div>

      {/* ── Community Impact ── */}
      <div
        className={`max-w-7xl mx-auto rounded-3xl shadow-2xl p-12 transition-colors duration-300 ${dark
            ? "bg-[#150d27] border border-white/6"
            : "bg-white"
          }`}
      >
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#8B3FDE] via-[#C837AB] to-[#FF6B35] bg-clip-text text-transparent">
          Community Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { value: "10K+", gradient: "from-[#8B3FDE] to-[#C837AB]", label: "Active Members" },
            { value: "5K+", gradient: "from-[#C837AB] to-[#FF6B35]", label: "Items Exchanged" },
            { value: "500+", gradient: "from-[#8B3FDE] to-[#FF6B35]", label: "Events Organized" },
          ].map(({ value, gradient, label }) => (
            <div key={label}>
              <div
                className={`text-5xl font-extrabold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}
              >
                {value}
              </div>
              <p
                className={`text-xl font-semibold ${dark ? "text-purple-200/70" : "text-gray-700"
                  }`}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;