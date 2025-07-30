import { FaHome, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useEffect, useState } from "react";
import customFetch from "../axios/custom";

interface CompanyInfo {
  name: string;
  address: string;
  hotline: string;
  email: string;
  license_no?: string;
  google_map_embed?: string;
}

const Footer = () => {
  const [company, setCompany] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    const loadCompany = async () => {
      try {
        const response = await customFetch.get("/company");
        setCompany(response.data);
      } catch (error) {
        console.error("Failed to fetch company info", error);
      }
    };
    loadCompany();
  }, []);

  return (
    <footer className="w-full bg-secondaryBrown text-white py-10 px-4 mt-3">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Cột 1: Thông tin công ty */}
        <div>
          <div className="text-lg font-bold mb-2">{company?.name}</div>
          <div className="flex items-start mb-1 gap-2">
            <FaHome className="mt-1 text-white" />
            <span className="whitespace-pre-line">{company?.address}</span>
          </div>
          <div className="flex items-center mb-1 gap-2">
            <FaPhoneAlt className="text-white" />
            <span>Hotline: {company?.hotline}</span>
          </div>
          <div className="flex items-center mb-1 gap-2">
            <FaEnvelope className="text-white" />
            <span>Email: {company?.email}</span>
          </div>
          {company?.license_no && (
            <div className="mt-1">License No.: {company.license_no}</div>
          )}
        </div>
        {/* Cột 2: Link */}
        <div>
          <div className="font-bold mb-2">LINK</div>
          <ul className="space-y-1">
            <li><a href="/" className="hover:text-white flex items-center gap-1"><FaHome />Home page</a></li>
            <li><a href="/product" className="hover:text-white">Product</a></li>
            <li><a href="/news" className="hover:text-white">News</a></li>
            <li><a href="/checkout" className="hover:text-white">Checkout Page</a></li>
            <li><a href="/cart" className="hover:text-white">Cart page</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>
        {/* Cột 3: Product List */}
        <div>
          <div className="font-bold mb-2">PRODUCT LIST</div>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-white">Women's sweater</a></li>
            <li><a href="#" className="hover:text-white">Women's shirt</a></li>
            <li><a href="#" className="hover:text-white">Skirt</a></li>
            <li><a href="#" className="hover:text-white">Category 1</a></li>
            <li><a href="#" className="hover:text-white">Category 2</a></li>
          </ul>
        </div>
        {/* Cột 4: Google map */}
        <div>
          <div className="font-bold mb-2">GOOGLE MAP</div>
          <div className="w-full max-w-xs mx-auto rounded overflow-hidden">
            {company?.google_map_embed && (
              <div
                className="w-full"
                style={{ minHeight: "120px" }}
                dangerouslySetInnerHTML={{ __html: company.google_map_embed }}
              />
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
