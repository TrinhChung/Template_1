import { HiBars3, HiOutlineUser, HiOutlineMagnifyingGlass, HiOutlineShoppingBag } from "react-icons/hi2";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import { useState } from "react";
import { useAppSelector } from "../hooks";
import toast from "react-hot-toast";
import { setLoginStatus } from "../features/auth/authSlice";
import { store } from "../store";
import AnnouncementBanner from "./AnnouncementBanner";

// Tailwind: secondaryBrown = #7d5a38
const iconBase = "text-2xl max-sm:text-xl transition-transform duration-150 ease-out cursor-pointer";
const iconHover = "hover:text-secondaryBrown hover:scale-110 active:scale-95";
const logoHover = "hover:text-secondaryBrown hover:scale-105 transition-transform duration-200";
const menuBase = "px-3 py-1 rounded font-medium transition-all";
const menuHover = "hover:bg-secondaryBrown hover:text-white duration-150";

const Header = () => {
  // ---- Tất cả hook đều ở đầu! ----
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { loginStatus } = useAppSelector((state) => state.auth);
  const company = useAppSelector((state) => state.company.data);
  const companyStatus = useAppSelector((state) => state.company.status);
  const navigate = useNavigate();
  const location = useLocation();

  // Logout handler
  const logout = () => {
    toast.error("Logged out successfully");
    localStorage.removeItem("user");
    store.dispatch(setLoginStatus(false));
    navigate("/login");
  };

  // Menu items
  const menuItems = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop" },
    { label: "Contact", to: "/contact" },
  ];

  // Render icons
  const renderIcons = () => (
    <div className="flex gap-4 items-center max-sm:gap-2">
      <Link to="/search">
        <HiOutlineMagnifyingGlass className={`${iconBase} ${iconHover}`} />
      </Link>
      {loginStatus ? (
        <button
          title="Logout"
          onClick={logout}
          className={`group relative ${iconBase} ${iconHover} flex items-center`}
        >
          <HiOutlineUser />
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs bg-secondaryBrown text-white px-2 py-0.5 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Logout
          </span>
        </button>
      ) : (
        <Link to="/login">
          <HiOutlineUser className={`${iconBase} ${iconHover}`} />
        </Link>
      )}
      <Link to="/cart">
        <HiOutlineShoppingBag className={`${iconBase} ${iconHover}`} />
      </Link>
    </div>
  );

  // Loading state
  if (companyStatus === "loading" || !company) {
    return <div className="max-w-screen-2xl mx-auto px-5 mt-24">Loading...</div>;
  }

  return (
    <>
      <AnnouncementBanner /> {/* THÊM DÒNG NÀY LÊN TRÊN */}
      <header className="max-w-screen-2xl flex text-center justify-between items-center py-4 px-5 text-black mx-auto max-sm:px-5 max-[400px]:px-3">
        {/* Sidebar icon: chỉ mobile */}
        <div className="lg:hidden">
          <HiBars3
            className={`${iconBase} mr-3 ${iconHover}`}
            onClick={() => setIsSidebarOpen(true)}
          />
        </div>
        {/* Logo + menu ngang desktop */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className={`text-4xl font-light tracking-[1.08px] max-sm:text-3xl max-[400px]:text-2xl transition-transform ${logoHover}`}
          >
            <span className="align-middle">{company.name || "FASHION"}</span>
          </Link>
          {/* Menu text: chỉ desktop */}
          <nav className="hidden lg:flex gap-2 items-center">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`
                  ${menuBase} ${menuHover}
                  ${location.pathname === item.to ? "bg-secondaryBrown text-white shadow-inner scale-[1.03]" : "text-secondaryBrown"}
                `}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        {/* Icons: desktop và mobile đều hiện */}
        {renderIcons()}
      </header>
      {/* Sidebar Menu (mobile) */}
      <SidebarMenu
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </>
  );
};

export default Header;
