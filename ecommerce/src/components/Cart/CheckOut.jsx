import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cart = {
  products: [
    {
      name: 'Stylish Jacket',
      size: 'M',
      color: 'Black',
      price: 120,
      image: 'https://picsum.photos/150?random=1',
    },
    {
      name: 'Casual Sneakers',
      size: '42',
      color: 'White',
      price: 75,
      image: 'https://picsum.photos/150?random=2',
    },
  ],
  totalPrice: 195,
};

const CheckOut = () => {
  const navigate = useNavigate();
  const [checkoutId, setCheckoutId] = useState(null);

  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const id = 'CHK' + Date.now();
    setCheckoutId(id);
    alert('Order placed successfully!');
    navigate('/');
  };

  return (
    <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tight">
      {/* Left Section - Form */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-2xl font-semibold uppercase mb-6">Checkout</h2>

        <form onSubmit={handlePlaceOrder}>
          <h3 className="text-lg font-medium mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value="user@example.com"
              className="w-full p-2 border rounded-lg bg-gray-100"
              disabled
            />
          </div>

          {/* Delivery Info */}
          <h3 className="text-lg font-medium mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                required
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, firstName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                required
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, lastName: e.target.value })
                }
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              required
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, address: e.target.value })
              }
            />
          </div>

          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                required
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, city: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                required
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                }
              />
            </div>
          </div>

          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Country</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                required
                value={shippingAddress.country}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, country: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                required
                value={shippingAddress.phone}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, phone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="mt-6">
  {!checkoutId ? (
    <button
      type="submit"
      className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
    >
      Continue to Payment
    </button>
  ) : (
    <div>
        <h3 className='text-lg mb-4'>Pay with Paypal</h3>
        {/* PayPal component  */}
        
    </div>
  )}
</div>

        </form>
      </div>

      {/* Right Section - Cart Summary */}
      <div className="bg-gray-50 rounded-lg p-6 shadow">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <div className="space-y-4">
          {cart.products.map((product, idx) => (
            <div key={idx} className="flex items-center gap-4 border-b pb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium">{product.name}</h4>
                <p className="text-sm text-gray-600">
                  Size: {product.size} | Color: {product.color}
                </p>
              </div>
              <span className="font-semibold">${product.price}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t pt-4 text-right">
          <p className="text-lg font-semibold">Total: ${cart.totalPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
