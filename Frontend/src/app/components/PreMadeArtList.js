"use client"
import React, { useEffect, useState } from 'react';
import axios from '../../../utilis/axios';
import MineLoader from './mineloader';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { RxUpdate } from 'react-icons/rx';

const UpdateButton = ({ onClick }) => (
  <button
    className="bg-primary-700 hover:bg-primary-800 text-white font-bold py-2 px-4 rounded"
    onClick={onClick}
  >
   <RxUpdate/>
  </button>
);

const DeleteButton = ({ onClick }) => (
  <button
    className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mr-2"
    onClick={onClick}
  >
    <AiOutlineDelete />
  </button>
);

const EditButton = ({ onEdit, product }) => (
  <button
    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
    onClick={() => onEdit(product)}
  >
    <FiEdit />
  </button>
);


const ProductList = ({ onEditClick }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('/get-PreMadeArt');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error fetching products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdateClick = () => {
    fetchProducts();
  };

  const handleDeleteClick = async (productId) => {
    try {
      await axios.delete(`/delete-PreMadeArt/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      setError('Error deleting product. Please try again.');
    }
  };


  return (
    <div>
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        All Products
        <div className="flex justify-end items-center">
          <div className="flex space-x-4">
            <UpdateButton onClick={handleUpdateClick} />
          </div>
        </div>
      </h2>
      {loading && <MineLoader />}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <ul>
          {products.map((product) => (
            <li key={product._id} className="mb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={`${product.imageUrl}`}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-full mr-4"
                  />
                  <div>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {product.name}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {product.category} - ${product.price} - {product.brand}
                    </p>
                  </div>
                </div>
                <div className="mt-2 flex space-x-2">
                <DeleteButton onClick={() => handleDeleteClick(product._id)} />
                  <EditButton onEdit={() => onEditClick(product)} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
  );
};

export default ProductList;
