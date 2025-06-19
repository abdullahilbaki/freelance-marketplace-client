import { useLoaderData } from "react-router";
import BannerSlider from "./BannerSlider";
import FAQSection from "./FAQSection";
import FeaturedTasks from "./FeaturedTasks";
import Testimonials from "./Testimonials";

const Home = () => {
  const featuredTasks = useLoaderData();
  return (
    <div className="flex flex-col gap-16">
      <BannerSlider />
      <FeaturedTasks featuredTasks={featuredTasks}/>
      <Testimonials />
      <FAQSection />
    </div>
  );
};

export default Home;
