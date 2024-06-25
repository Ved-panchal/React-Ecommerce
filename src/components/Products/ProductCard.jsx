import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomButton from '../Button/CustomButton';
import { addItemToCart } from '../../services/redux/actions/cartAction';
import { showToast } from '../../services/toasts';
import { getCookie } from '../Utils/getCookie';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const userId = getCookie("userId");

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!userId) {
      showToast('Please log in first to add items to the cart.', "error");
      return;
    }

    dispatch(addItemToCart({ userId, product }))
      .then(() => {
        showToast('Item has been added to the cart', "success");
      })
      .catch((error) => {
        showToast('Failed to add item to the cart', "error");
      });
  };
  

  return (
    <div className="product-card">
      <Link
        className="flex flex-col bg-white shadow-t-primary shadow-2xl rounded-2xl overflow-hidden cursor-pointer transition-transform transform hover:scale-105 duration-300 ease-in-out"
        to={{
          pathname: `/product/${product.id}`,
          state: { product },
        }}
      >
        <div className="h-[220px] flex-shrink-0 p-2 pt-4">
          <img
            src={product.images[0]}
            alt="product"
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
        <div className="flex items-center text-primary justify-between w-full h-full p-6 max-sm:p-3">
          <div className="flex flex-col flex-shrink-0">
            <p className="text-lg font-semibold max-w-[180px] max-sm:max-w-[150px] break-all line-clamp-1">
              {product.title}
            </p>
            <p className="text-primary-100">₹{product.price}</p>
          </div>
          <div className="flex-shrink-0">
            <CustomButton
              variant={"primary"}
              label={"Add to Cart"}
              size={"md"}
              onClick={handleAddToCart}
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
