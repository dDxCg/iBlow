// components/Header.jsx
import { FiMenu, FiSearch, FiHeart, FiShoppingBag } from "react-icons/fi";
import PropTypes from 'prop-types';

const Header = ({ handleSearch, searchTerm, setSearchTerm }) => {
  return (
    <header className="flex flex-col items-center px-8 py-4 bg-white shadow-md">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4 cursor-pointer">
          <button className="text-2xl text-gray-700">
            <FiMenu />
          </button>
          <h1 className="text-xl font-bold">
            <span className="text-black">i</span>
            <span className="text-red-500">B</span>
            <span className="text-green-500">l</span>
            <span className="text-yellow-500">o</span>
            <span className="text-blue-500">w</span>
            <span className="text-black">.online</span>
          </h1>
        </div>

        <div className="relative flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Search for decorations..."
            className="w-full py-2 pl-4 pr-10 bg-gray-100 rounded-full focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <FiSearch
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            onClick={handleSearch}
          />
        </div>

        <div className="flex items-center gap-6">
          <button className="text-2xl text-purple-500">
            <FiHeart />
          </button>
          <button className="relative text-2xl text-purple-500">
            <FiShoppingBag />
          </button>
        </div>
      </div>

      <nav className="flex gap-8 mt-6 text-gray-700">
        {["Birthday", "Anniversary", "Baby Shower", "Newborn Welcome", "Other Categories"].map((item) => (
          <button 
            key={item} 
            className="hover:text-red-500 cursor-pointer"
            onClick={() => handleSearch(item)}
          >
            {item}
          </button>
        ))}
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