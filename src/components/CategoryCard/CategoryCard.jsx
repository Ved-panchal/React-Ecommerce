import React from "react";
import Grid from "../Utils/Grid";
import CustomButton from "../Button/CustomButton";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  console.log(category);
  return (
    <>
      <div className="product-card">
        <img
          src={cat}
          alt="product"
          className="w-full h-full object-contain rounded-lg"
        />
        <div className="text-primary text-2xl font-semibold">
          {category.name}
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
