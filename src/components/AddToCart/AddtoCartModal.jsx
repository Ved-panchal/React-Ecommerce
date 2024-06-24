import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Image,
} from "@nextui-org/react";
import Loader from "../Loader/loader";
import { ShoppingBasket, Trash, ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  removeItemFromCart,
  updateQuantity as updateQuantityAction,
} from "../../services/redux/actions/cartAction";
import { getCookie } from "../Utils/getCookie";
import {
  updateQuantity,
  removeItem,
} from "../../services/redux/reducers/cartReducers";
import { debounce } from "../Utils/debounce";

const AddtoCartModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const userId = getCookie("userId");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchCart(userId)).then(() => setLoading(false)); // Set loading to false after fetching cart
    }
  }, [isOpen, dispatch, userId]);

  const debouncedUpdateQuantity = debounce((productId, newQuantity) => {
    dispatch(
      updateQuantityAction({ userId, productId, quantity: newQuantity })
    );
  }, 500);

  const handleQuantityChange = (productId, newQuantity) => {
    newQuantity = Math.max(1, newQuantity);
    dispatch(updateQuantity({ userId, productId, quantity: newQuantity }));
    debouncedUpdateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeItem({ productId }));
    debouncedRemoveItem(userId, productId);
  };

  const debouncedRemoveItem = debounce((userId, productId) => {
    dispatch(removeItemFromCart({ userId, productId }));
  }, 500);

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    onOpenChange(false); // Close the modal
    navigate("/orderdetails");
  };

  return (
    <div>
      <Button
        onPress={onOpen}
        color="primary"
        className="bg-transparent hover:bg-transparent"
      >
        <ShoppingCart />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        classNames={{
          base: "z-20",
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        backdrop="opaque"
        size="2xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <span className="inline-block">
                    <ShoppingBasket />
                  </span>
                  <span className="inline-block">Cart</span>
                </div>
              </ModalHeader>
              {loading ? (
                <div className="flex justify-center items-center h-[400px]">
                  <Loader size="large" />
                </div>
              ) : (
                <ModalBody className="max-h-[500px] overflow-auto  max-sm:space-y-10">
                  {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500">Cart is empty</p>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} className="flex flex-col gap-5">
                        <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start">
                          <div className="flex items-center gap-3  flex-shrink-0">
                            <Image
                              as="img"
                              width={100}
                              height={100}
                              src={
                                item.images ? item.images[0] : "../../assets/Placeholder-img.jpg"} 
                              alt={item.title}
                              radius="full"
                            />

                            <div className="flex flex-col">
                              <p className="font-semibold w-[200px] line-clamp-1">
                                {item.title}
                              </p>
                              <p className="text-primary-100">₹{item.price}</p>
                            </div>
                          </div>
                          <div className="flex">
                            <div className="flex items-center gap-1">
                              <Button
                                size="md"
                                variant="text"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity - 1
                                  )
                                }
                              >
                                -
                              </Button>
                              <Input
                                className="text-center"
                                size="md"
                                value={item.quantity}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    item.id,
                                    Number(e.target.value)
                                  )
                                }
                              />
                              <Button
                                size="md"
                                variant="text"
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity + 1
                                  )
                                }
                              >
                                +
                              </Button>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                size="sm"
                                variant="text"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <Trash className="text-red-500 h-5 w-5" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </ModalBody>
              )}
              {!loading && (
                <>
                  <hr className="my-4" />
                  <ModalFooter>
                    <div className="flex flex-col w-full justify-center items-center">
                      <div className="flex justify-between items-center w-full">
                        <span className="font-semibold">Total Amount</span>
                        <span className="font-semibold">
                          ₹{calculateTotalAmount()}
                        </span>
                      </div>
                      <Button
                        color="primary"
                        className="mt-7 w-15"
                        onClick={handleCheckout}
                      >
                        Checkout
                      </Button>
                    </div>
                  </ModalFooter>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddtoCartModal;
