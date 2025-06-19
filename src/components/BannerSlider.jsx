import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Typewriter } from "react-simple-typewriter";

const BannerSlider = () => {
  const slides = [
    {
      id: 1,
      title: "Find Trusted Freelancers",
      description:
        "Connect with verified freelancers for design, development, writing, and more.",
      image: "https://i.ibb.co/FbFQZ60Q/freelancer-banner.png",
    },
    {
      id: 2,
      title: "Post Tasks with Ease",
      description:
        "Add your tasks in seconds and get bids from skilled professionals.",
      image: "https://i.ibb.co/TDknWBBh/post-task-banner.png",
    },
    {
      id: 3,
      title: "Bid & Work Securely",
      description:
        "Freelancers can bid on projects and collaborate securely with clients.",
      image: "https://i.ibb.co/kVQTVX0Z/bid-secure-banner.png",
    },
  ];

  return (
    <div className="container mx-auto mt-6 rounded-lg overflow-hidden">
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-[400px] md:h-[550px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg libre-baskerville">
                  <Typewriter
                    words={[slide.title]}
                    loop={0} // 0 = infinite loop
                    cursor
                    cursorStyle="_"
                    typeSpeed={60}
                    deleteSpeed={40}
                    delaySpeed={2000}
                  />
                </h2>
                <p className="text-lg md:text-xl text-gray-200 drop-shadow-md max-w-2xl">
                  <Typewriter
                    words={[slide.description]}
                    loop={0} // infinite loop
                    cursor
                    cursorStyle="|"
                    typeSpeed={40}
                    deleteSpeed={20}
                    delaySpeed={2500}
                  />
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
