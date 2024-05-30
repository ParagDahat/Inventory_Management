import React, { useState } from 'react';
import { db } from '../Firebase/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { FiPlusCircle } from 'react-icons/fi'; // Importing an icon from react-icons

const AddStock = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (itemName === '' || quantity === '' || price === '') {
      setError('All fields are required');
      return;
    }
    try {
      await addDoc(collection(db, 'inventory'), {
        itemName,
        quantity: parseInt(quantity),
        price: parseFloat(price),
      });
      setItemName('');
      setQuantity('');
      setPrice('');
      setError('');
      alert('Item added successfully!');
    } catch (e) {
      console.error("Error adding document: ", e);
      setError('Error adding item');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-5">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Add New Stock</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">Item Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Enter item name"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">Quantity</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">Price</label>
            <input
              type="number"
              step="0.01"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
          >
            <FiPlusCircle className="mr-2" /> Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStock;
