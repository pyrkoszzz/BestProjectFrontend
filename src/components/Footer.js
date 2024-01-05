import { Link } from "react-router-dom";
import logo from "../images/logo-white.svg";

function Footer() {
  return (
    <footer className="bg-foundColor h-[180px] sm:h-[160px] w-full flex justify-between md:pl-[165px] md:pr-[214px] px-[40px] py-4">
      <img src={logo} alt="Logo" className="self-center" />

      <div className="flex gap-8 text-white self-center sm:text-base text-xs ml-4">
        <div>
          <h4 className="font-bold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/post-new-item">Post New Item</Link>
            </li>
            <li>
              <Link to="/my-account">My Account</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
