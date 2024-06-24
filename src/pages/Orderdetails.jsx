import React, { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Orderform from '../components/orderForms/Orderform';
import Ordersummary from '../components/orderSummary/Ordersummary';
import { Button } from '@nextui-org/react';
import { useDispatch, useSelector } from 'react-redux';
import { emptyCart, fetchCart } from '../services/redux/actions/cartAction';
import { getCookie } from '../components/Utils/getCookie';
import Toast, { showToast } from "../services/toasts";
import setCookie from '../components/Utils/setCookie';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  address: Yup.string().required('Address is required'),
});

const OrderDetails = () => {
  const initialValues = {
    name: '',
    email: '',
    address: '',
  };
  const dispatch = useDispatch();
  const userId = getCookie('userId');
  const navigate = useNavigate();

  useEffect(() => {

    if(!userId){
      navigate("/")
    }

    dispatch(fetchCart(userId));

    setCookie('address', '', -1); 
    setCookie('email', '', -1); 
    setCookie('name', '', -1); 
  }, [dispatch, navigate, userId]);

  const cartItems = useSelector((state) => state.cart.items);

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmit = () => {

    if (!getCookie("name") || !getCookie("email")) {
      showToast('Please fill all fields in the form', 'error');
      return;
    }

    showToast("Order has been places","success")
    setTimeout(() => {
      navigate("/");
    },1500)
    dispatch(emptyCart(userId))
  };
    

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Order Details</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/2">
                <Orderform />
              </div>
              <div className="w-full lg:w-1/2">
                <Ordersummary cartItems={cartItems} totalAmount={calculateTotalAmount()} />
              </div>
            </div>
            <div className="mt-8 flex justify-center">
              <Button color="primary" onClick={handleSubmit}>
                Submit Order
              </Button>
            </div>
          </>
        )}
      </Formik>
      <Toast />
    </div>
  );
};

export default OrderDetails;
