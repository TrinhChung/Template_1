import { useEffect } from "react";
import { useAppSelector } from "../hooks";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaIdCard } from "react-icons/fa";

const Contact = () => {
  const company = useAppSelector((state) => state.company.data);
  const status = useAppSelector((state) => state.company.status);

  useEffect(() => {
    document.title = "Contact";
  }, []);

  if (status === "loading" || !company) {
    return <div className="max-w-screen-2xl mx-auto px-5 mt-24">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-5 mt-24 flex flex-col gap-8 py-10">
      {/* Logo & Tên công ty */}
      <div className="flex flex-col items-center gap-3">
        {company.logo_url && (
          <img
            src={company.logo_url}
            alt={company.name}
            className="max-h-20 object-contain mb-1"
          />
        )}
        <h1 className="text-4xl font-bold text-gray-800 text-center">{company.name}</h1>
        {company.description && (
          <p className="text-lg text-gray-600 text-center">{company.description}</p>
        )}
      </div>

      {/* Thông tin liên hệ */}
      <div className="flex flex-col gap-3 text-base text-gray-700">
        <div className="flex items-start gap-3">
          <FaMapMarkerAlt className="mt-1 text-secondaryBrown" />
          <span className="whitespace-pre-line">{company.address}</span>
        </div>
        <div className="flex items-center gap-3">
          <FaEnvelope className="text-secondaryBrown" />
          <span>{company.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <FaPhoneAlt className="text-secondaryBrown" />
          <span>{company.hotline}</span>
        </div>
        {company.license_no && (
          <div className="flex items-center gap-3">
            <FaIdCard className="text-secondaryBrown" />
            <span>License No: {company.license_no}</span>
          </div>
        )}
        {company.note && (
          <div className="mt-2 px-4 py-2 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <span className="font-semibold">Note:</span> {company.note}
          </div>
        )}
      </div>

      {/* Google Map */}
      {company.google_map_embed && (
        <div className="rounded overflow-hidden">
          <div
            className="w-full h-64"
            dangerouslySetInnerHTML={{ __html: company.google_map_embed }}
          />
        </div>
      )}

      {/* Footer text riêng nếu muốn dùng ở đây */}
      {company.footer_text && (
        <div className="border-t pt-4 text-center text-gray-400 text-sm">{company.footer_text}</div>
      )}
    </div>
  );
};

export default Contact;
