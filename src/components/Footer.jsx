import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-300 text-base-content mt-10">
      <div className="container mx-auto p-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* Logo & Name */}
        <div>
          <Link to="/" className="flex items-center gap-3 mb-2">
            <img
              src={"/freelancer.png"}
              alt="Logo"
              className="w-10 h-10"
            />
            <span className="text-lg font-bold libre-baskerville">Freelance Marketplace</span>
          </Link>
          <p className="text-sm">
            A platform connecting freelancers with task posters. Find, post, and manage work with ease.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-2 libre-baskerville">Contact</h3>
          <p>Email: support@freelancemarket.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Location: Remote / Worldwide</p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-2 libre-baskerville">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link to="/" className="link link-hover">Home</Link></li>
            <li><Link to="/add-task" className="link link-hover">Add Task</Link></li>
            <li><Link to="/browse-tasks" className="link link-hover">Browse Tasks</Link></li>
            <li><Link to="/my-tasks" className="link link-hover">My Posted Tasks</Link></li>
            <li><Link to="/terms" className="link link-hover">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-2 libre-baskerville">Follow Us</h3>
          <div className="flex gap-3">
            <a href="https://facebook.com" className="btn btn-sm btn-circle btn-outline">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" className="btn btn-sm btn-circle btn-outline">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" className="btn btn-sm btn-circle btn-outline">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" className="btn btn-sm btn-circle btn-outline">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center py-4 border-t border-base-200 text-sm">
        &copy; {new Date().getFullYear()} Freelance Marketplace. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
