import React from 'react';
import { Image } from '@nextui-org/react';

const Ordersummary = ({ cartItems, totalAmount }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Image
              src={item.images[0]}
              alt={item.title}
              width={100}
              height={100}
              radius="full"
            />
            <div className="flex flex-col">
              <p className="font-semibold">{item.title}</p>
              <p>Quantity: {item.quantity}</p>
              <p className="text-primary-100">₹{item.price}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center mt-4">
        <span className="font-semibold">Total Amount</span>
        <span className="font-semibold">₹{totalAmount}</span>
      </div>
    </div>
  );
};

export default Ordersummary;
