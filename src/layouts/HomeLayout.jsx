import { Outlet, useNavigation } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ScaleLoader } from "react-spinners";
import ScrollToTop from "../components/ScrollToTop";

const HomeLayout = () => {
  const navigation = useNavigation();

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <header>
        <Navbar />
      </header>
      <main className="flex-grow container mx-auto px-4 py-12">
        {navigation.state === "loading" ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <ScaleLoader />
          </div>
        ) : (
          <div className="transition-opacity duration-500 opacity-0 animate-fadeIn">
            <Outlet />
          </div>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default HomeLayout;
