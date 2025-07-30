import { HiBars3 } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import { useState } from "react";

// Tailwind: secondaryBrown = #7d5a38 (hoặc thay thành class của bạn)
const iconBase =
  "text-2xl max-sm:text-xl transition-transform duration-150 ease-out cursor-pointer";
const iconHover =
  "hover:text-secondaryBrown hover:scale-110 active:scale-95";
const logoHover =
  "hover:text-secondaryBrown hover:scale-105 transition-transform duration-200";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="max-w-screen-2xl flex text-center justify-between items-center py-4 px-5 text-black mx-auto max-sm:px-5 max-[400px]:px-3">
        <HiBars3
          className={`${iconBase} mr-20 max-lg:mr-0 ${iconHover}`}
          onClick={() => setIsSidebarOpen(true)}
        />
        <Link
          to="/"
          className={`text-4xl font-light tracking-[1.08px] max-sm:text-3xl max-[400px]:text-2xl transition-transform ${logoHover}`}
        >
          FASHION
        </Link>
        <div className="flex gap-4 items-center max-sm:gap-2">
          <Link to="/search">
            <HiOutlineMagnifyingGlass className={`${iconBase} ${iconHover}`} />
          </Link>
          <Link to="/login">
            <HiOutlineUser className={`${iconBase} ${iconHover}`} />
          </Link>
          <Link to="/cart">
            <HiOutlineShoppingBag className={`${iconBase} ${iconHover}`} />
          </Link>
        </div>
      </header>
      <SidebarMenu
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </>
  );
};

export default Header;
