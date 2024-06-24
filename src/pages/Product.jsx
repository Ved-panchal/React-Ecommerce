import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomButton from "./../components/Button/CustomButton";
import SingleProdSlider from "./../components/Sliders/SingleProdSlider";
import { Badge } from "@nextui-org/react";
import { Star } from "lucide-react";
import config from "../services/config";
import { addItemToCart } from "../services/redux/actions/cartAction";
import { useDispatch } from "react-redux";
import { showToast } from '../services/toasts';
import { getCookie } from "../components/Utils/getCookie";
import Toast from "../services/toasts";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const getSingleProduct = async () => {
    try {
      const response = await fetch(`${config.API_URL}/getproduct/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(product);
  useEffect(() => {
    getSingleProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const { title, price, description, images } = product;

  const handleAddToCart = () => {

    const userId = getCookie("userId")
    if (!userId) {
      showToast('Please log in first to add items to the cart.', "error");
      return;
    }

    dispatch(addItemToCart({ userId, product,quantity }))
      .then(() => {
        showToast('Item has been added to the cart', "success");
      })
      .catch((error) => {
        showToast('Failed to add item to the cart', "error");
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="flex items-center justify-center relative">
          <SingleProdSlider cat={product.images} />
        </div>
        <div className="flex flex-col ">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-gray-700 text-lg mb-4">{description}</p>
          <div className="flex items-center gap-5">
            <div className="flex items-center mb-4">
              <span className="text-gray-700 mr-2 text-lg">Price:</span>
              <span className="font-bold text-lg">₹{price}</span>
            </div>
            <div className="flex items-center mb-4 mr-auto">
              <span className="text-gray-700 mr-2 text-lg">In Stock:</span>
              <span className="font-bold text-lg">{product.stock}</span>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <span className="text-gray-700 mr-2 text-lg">Quantity:</span>
            <button
              className="w-6 h-6 bg-gray-200 text-gray-500 flex items-center justify-center  hover:bg-gray-300 focus:outline-none focus:ring-0 focus:border-0 focus:ring-offset-2 focus:ring-primary-500 rounded-full"
              onClick={() => setQuantity(quantity - 1)}
              disabled={quantity === 1}
            >
              -
            </button>
            <span className="mx-2 text-lg">{quantity}</span>
            <button
              className="w-6 h-6 bg-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-300 focus:outline-none focus:ring-0 focus:border-0 focus:ring-offset-2 focus:ring-primary-500 rounded-full"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          <div className="">
            <CustomButton
              variant={"secondary"}
              label={"Add to Cart"}
              onClick={handleAddToCart}
            />
          </div>
        </div>
      </div>
      <Toast/>
    </div>
  );
};

export default Product;
