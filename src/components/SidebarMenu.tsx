import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiXMark } from "react-icons/hi2";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { setLoginStatus } from "../features/auth/authSlice";
import { store } from "../store";

// Tailwind: secondaryBrown = #7d5a38 (bạn chỉnh nếu custom màu khác)
const menuItemBase =
  "py-2 border-y border-secondaryBrown w-full block flex justify-center font-medium relative overflow-hidden group transition-all";
const menuItemHover =
  "hover:bg-secondaryBrown hover:text-white hover:scale-[1.03] hover:shadow-lg duration-150";

const SidebarMenu = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (prev: boolean) => void;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { loginStatus } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // Hàm đóng sidebar
  const handleMenuClick = () => setIsSidebarOpen(false);

  // Đăng xuất và đóng sidebar
  const logout = () => {
    toast.error("Logged out successfully");
    localStorage.removeItem("user");
    store.dispatch(setLoginStatus(false));
    navigate("/login");
    handleMenuClick();
  };

  useEffect(() => {
    if (isSidebarOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isSidebarOpen]);

  // Render menu item với hiệu ứng và active
  const renderMenuItem = (
    label: string,
    to: string,
    icon?: React.ReactNode
  ) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={handleMenuClick}
        className={`
          ${menuItemBase} 
          ${menuItemHover}
          ${isActive ? "bg-secondaryBrown text-white shadow-inner scale-[1.03]" : "text-secondaryBrown"}
        `}
      >
        {icon}
        <span className="ml-1">{label}</span>
        {/* Hiệu ứng underline slide-in khi hover */}
        <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-[2px] bg-white transition-all duration-300" />
      </Link>
    );
  };

  // Render button như 1 menu item
  const renderButtonItem = (label: string, onClick: () => void) => (
    <button
      onClick={onClick}
      className={`${menuItemBase} ${menuItemHover} text-secondaryBrown`}
    >
      {label}
      <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-[2px] bg-white transition-all duration-300" />
    </button>
  );

  return (
    <>
      {(isSidebarOpen || isAnimating) && (
        <div
          className={
            isSidebarOpen
              ? "fixed top-0 left-0 w-64 z-50 h-full transition-transform duration-300 ease-in-out bg-white shadow-lg transform border-r border-secondaryBrown translate-x-0"
              : "fixed top-0 left-0 w-64 z-50 h-full transition-transform duration-300 ease-in-out bg-white shadow-lg transform border-r border-secondaryBrown -translate-x-full"
          }
        >
          <div className="flex justify-end mr-1 mt-1">
            <HiXMark
              className="text-3xl cursor-pointer text-secondaryBrown hover:rotate-90 transition-transform duration-200"
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>
          <div className="flex justify-center mt-2">
            <Link
              to="/"
              className="text-4xl font-light tracking-[1.08px] max-sm:text-3xl max-[400px]:text-2xl text-secondaryBrown hover:text-secondaryBrown"
              tabIndex={-1}
            >
              FASHION
            </Link>
          </div>
          <div className="flex flex-col items-center gap-1 mt-7">
            {renderMenuItem("Home", "/")}
            {renderMenuItem("Shop", "/shop")}
            {renderMenuItem("Search", "/search")}
            {renderMenuItem("Contact", "/contact")}
            {loginStatus ? (
              renderButtonItem("Logout", logout)
            ) : (
              <>
                {renderMenuItem("Sign in", "/login")}
                {renderMenuItem("Sign up", "/register")}
              </>
            )}
            {renderMenuItem("Cart", "/cart")}
          </div>
        </div>
      )}
    </>
  );
};
export default SidebarMenu;
