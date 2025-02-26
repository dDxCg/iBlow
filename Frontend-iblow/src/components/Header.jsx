import { FiMenu, FiSearch, FiLayers, FiSliders, FiShoppingCart, FiUsers } from "react-icons/fi";
import PropTypes from "prop-types";
import logo from "../assets/logo.jpg"; // Cập nhật đường dẫn logo nếu cần
import "../App.css";

const Header = ({ handleSearch, searchTerm, setSearchTerm }) => {
  return (
    <header className="flex flex-col items-center px-8 py-4 bg-white shadow-md">
      {/* Top bar */}
      <div className="flex items-center justify-between w-full">
        {/* Logo & Menu */}
        <div className="flex items-center gap-4 cursor-pointer">
          <button className="text-2xl text-gray-700">
            <FiMenu />
          </button>
          <img src={logo} alt="iBlow Logo" className="h-20" />
          <span className="text-3xl font-playfair text-gold">iBlow Global</span>
        </div>

        {/* Search bar */}
        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search for decorations..."
            className="w-full py-2 pl-4 pr-12 border border-gray-400 rounded-full focus:outline-none text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#D4AF37] text-white p-2 rounded-full"
            onClick={handleSearch}
          >
            <FiSearch className="text-xl" />
          </button>
        </div>

        {/* Cart & User options */}
        <div className="flex items-center gap-6">
          <button className="relative text-2xl text-black">
            <FiShoppingCart />
          </button>
          <button className="text-2xl text-black">
            <FiUsers />
          </button>
          <button className="px-4 py-1 bg-[#D4AF37] border border-[#D4AF37] rounded-md text-gray-700 hover:bg-[#d8c176]">
            Log in
          </button>
          <button className="px-4 py-1 bg-black text-[#D4AF37] rounded-md hover:bg-gray-700">
            Sign up
          </button>
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="flex justify-center gap-6 mt-4 text-gray-700 font-medium text-lg">
        <button className="flex items-center gap-2 hover:text-purple-500">
          <FiSearch /> Search
        </button>
        <button className="flex items-center gap-2 hover:text-purple-500">
          <FiLayers /> Style
        </button>
        <button className="flex items-center gap-2 hover:text-purple-500">
          <FiSliders /> Specify
        </button>
        <button className="flex items-center gap-2 hover:text-purple-500">
          <FiShoppingCart /> Source
        </button>
        <button className="flex items-center gap-2 hover:text-purple-500">
          <FiUsers /> Support
        </button>
      </nav>
    </header>
  );
};

Header.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};

export default Header;
