import { useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { useAppSelector } from "../hooks";
import { Link } from "react-router-dom";

const AnnouncementBanner = () => {
	const [visible, setVisible] = useState(true);
	const company = useAppSelector((state) => state.company.data);

	if (!visible) return null;

	return (
		<div className="relative w-full bg-black text-white text-xs select-none">
			<div className="max-w-screen-2xl mx-auto py-2 flex flex-col items-center justify-center relative">
				{/* Nút đóng */}
				<button
					onClick={() => setVisible(false)}
					className="absolute right-2 top-1/2 -translate-y-1/2 text-lg hover:text-secondaryBrown transition-colors"
					aria-label="Close"
					style={{ lineHeight: 1 }}
				>
					<HiXMark />
				</button>
				{/* Dòng 1 */}
				<p className="text-xs sm:text-sm text-center mb-1">
					Sign up and get 20% off your first order.&nbsp;
					<Link
						to="/register"
						className="underline font-medium hover:text-secondaryBrown"
					>
						Sign Up Now
					</Link>
				</p>
				{/* Dòng 2 */}
				{company?.email && (
					<p className="text-xs text-gray-300 text-center mb-1">
						<b>EMAIL:</b>{" "}
						<a href={`mailto:${company.email}`} className="underline">
							{company.email}
						</a>
					</p>
				)}
				{/* Dòng 3 */}
				{company?.hotline && (
					<p className="text-xs text-gray-300 text-center">
						<b>HOTLINE:</b> {company.hotline}
					</p>
				)}
			</div>
		</div>
	);
};

export default AnnouncementBanner;
