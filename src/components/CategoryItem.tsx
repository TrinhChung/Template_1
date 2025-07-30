import { Link } from "react-router-dom";

const CategoryItem = ({
  categoryTitle,
  image,
  link,
}: {
  categoryTitle: string;
  image: string;
  link: string;
}) => {
  return (
    <div className="w-[600px] relative group max-[1250px]:w-[400px] max-[1250px]:h-[400px] max-sm:w-[300px] max-sm:h-[300px] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <Link to={`/shop/${link}`}>
        <img
          src={`/src/assets/${image}`}
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
          alt={categoryTitle}
        />
        <div
          className="bg-secondaryBrown/90 backdrop-blur-[2px] text-white absolute bottom-0 w-full h-16 flex justify-center items-center 
            max-sm:h-12 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-secondaryBrown group-hover:to-[#a07c56] group-hover:shadow-lg"
        >
          <h3 className="text-2xl max-sm:text-xl font-semibold tracking-wide group-hover:scale-105 transition-transform duration-300">
            {categoryTitle}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
