import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import categories from "../assets/categoryData/CategoriesData.js"; 

const Categories = () => {
  const categoryRefs = useRef({});
  const location = useLocation(); // Detects route changes

  // Scroll to top when the route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const scrollToCategory = (id) => {
    categoryRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: false,
    focusOnSelect: true,
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6">Categories</h2>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {categories.map((category) => (
          <div
            key={`category-card-${category.id}`}
            className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-md cursor-pointer hover:shadow-lg transition bg-white"
            onClick={() => scrollToCategory(category.id)}
          >
            <span className="text-4xl">{category.icon}</span>
            <h3 className="mt-2 font-semibold text-center">{category.name}</h3>
            <p className="text-gray-500 text-sm">{category.offers} Offers</p>
          </div>
        ))}
      </div>

      {/* Categories Sections */}
      <div className="mt-10">
        {categories.map((category) => (
          <div
            key={`category-section-${category.id}`}
            ref={(el) => (categoryRefs.current[category.id] = el)}
            className="mt-8 rounded-lg p-2 shadow-lg bg-white pb-13 w-full relative"
          >
            <h2 className="text-xl font-bold mb-4">{category.name} Offers</h2>

            {/* Slider Component */}
            <Slider
              {...settings}
              className="relative px-8 overflow-visible gap-4 ml-[-25px]"
            >
              {category.data.slice(0, 3).map((item, index) => (
                <div
                  key={`item-${category.id}-${index}`}
                  className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition flex flex-col items-center"
                >
                  <h3 className="font-semibold">{item}</h3>
                  <p className="text-sm text-gray-500">Limited-time offers</p>
                  <button className="bg-red-500 text-white rounded p-2 w-full mt-2 hover:bg-red-600 transition">
                    View Details
                  </button>
                </div>
              ))}
            </Slider>

            {/* Explore Now Button */}
            <Link
              to={`/category/${category.id}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-blue-500 text-white rounded p-2 text-sm absolute right-10 top-50 hover:bg-blue-600 transition"
            >
              Explore Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
