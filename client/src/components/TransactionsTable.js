

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8082/api/transactions');
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 bg-red-600">Transactions Table</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
          <th className="px-4 py-2 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">ID</th>
            <th className="px-4 py-2 text-left text-s font-medium text-blue-600 uppercase tracking-wider">Title</th>
            <th className="px-4 py-2 text-left text-s font-medium text-blue-600 uppercase tracking-wider">Description</th>
            <th className="px-4 py-2 text-left text-s font-medium text-blue-600 uppercase tracking-wider">Price</th>
            <th className="px-4 py-2 text-left text-s font-medium text-blue-600 uppercase tracking-wider">Sold</th>
            <th className="px-4 py-2 text-left text-s font-medium text-blue-600 uppercase tracking-wider">Category</th>
            <th className="px-4 py-2 text-left text-s font-medium text-blue-600 uppercase tracking-wider">Image</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction, index) => (
            <tr key={transaction._id} >
              <td className="px-4 py-2 text-xs whitespace-nowrap">{index + 1}</td>
              <td className="px-4 py-2 whitespace-nowrap">{transaction.title}</td>
              <td className="px-4 py-2 max-h-24 text-sm overflow-y-auto whitespace-nowrap">{transaction.description}</td>
              <td className="px-4 py-2 text-xs whitespace-nowrap">{transaction.price}</td>
              <td className="px-4 py-2 text-xs whitespace-nowrap">{transaction.sold ? 'Yes' : 'No'}</td>
              <td className="px-4 py-2 text-xs whitespace-nowrap">{transaction.category}</td>
              <td className="px-4 py-2 text-xs whitespace-nowrap"><img src={transaction.image} alt={transaction.title} className="h-12 w-12" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
