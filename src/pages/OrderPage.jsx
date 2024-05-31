import React, { useState, useEffect } from 'react';
import { db } from '../Firebase/FirebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const OrderPage = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchInventory = async () => {
      const inventoryCollection = collection(db, 'inventory');
      const inventorySnapshot = await getDocs(inventoryCollection);
      const inventoryList = inventorySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setInventory(inventoryList);
    };
    
    fetchInventory();
  }, []);

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!selectedItem || !quantity) {
      setMessage('Please select an item and enter a quantity.');
      return;
    }

    const item = inventory.find(i => i.id === selectedItem);
    const newQuantity = item.quantity - parseInt(quantity);

    if (newQuantity < 0) {
      setMessage('Not enough stock available.');
      return;
    }

    try {
      const itemRef = doc(db, 'inventory', selectedItem);
      await updateDoc(itemRef, { quantity: newQuantity });
      setInventory(inventory.map(i => i.id === selectedItem ? { ...i, quantity: newQuantity } : i));
      setSelectedItem('');
      setQuantity('');
      setMessage('Order placed successfully!');
    } catch (error) {
      console.error("Error updating document: ", error);
      setMessage('Error placing order.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 p-5">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Place an Order</h2>
        {message && <p className="mb-4 text-center text-red-500">{message}</p>}
        <form onSubmit={handleOrder} className="space-y-6">
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">Select Item</label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
            >
              <option value="">--Select an item--</option>
              {inventory.map(item => (
                <option key={item.id} value={item.id}>
                  {item.itemName} (Available: {item.quantity})
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-2">Quantity</label>
            <input
              type="number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              min="1"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
