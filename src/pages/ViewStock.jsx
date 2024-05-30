import React, { useEffect, useState } from 'react';
import { db } from '../Firebase/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { FiSearch } from 'react-icons/fi';

const ViewStock = () => {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const inventoryCollection = collection(db, 'inventory');
      const inventorySnapshot = await getDocs(inventoryCollection);
      const inventoryList = inventorySnapshot.docs.map(doc => doc.data());
      setInventory(inventoryList);
    };
    
    fetchData();
  }, []);

  const filteredInventory = inventory.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 p-5">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">View Stock</h2>
        <div className="relative mb-6">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Search for items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute right-3 top-3 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInventory.length > 0 ? (
            filteredInventory.map((item, index) => (
              <div key={index} className="bg-white p-5 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{item.itemName}</h3>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-600">Price: ₹{item.price.toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No items found</p>
          )}
        </div> 
      </div>
    </div>
  );
};

export default ViewStock;
