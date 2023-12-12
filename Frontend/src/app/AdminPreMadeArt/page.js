'use client'

import React, { useState } from 'react';
import AdminSideMenu from '../components/adminSideMenu';
import PreMadeArt from '../components/addPreMadeArt';
import ProductList from '../components/PreMadeArtList';
import EditProductModal from '../components/EditProductModal';

const Product = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
    const handleEditClick = (product) => {
      setSelectedProduct(product);
      setIsEditModalOpen(true);
    };
  
    const handleEditModalClose = () => {
      setSelectedProduct(null);
      setIsEditModalOpen(false);
    }; 
  
  return (
    <div>
    <AdminSideMenu />
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        {/* <AddProduct /> */}
        <PreMadeArt/>
      </div>
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-3">
        <ProductList onEditClick={handleEditClick} />
      </div>
    </div>

    {/* Render the EditProductModal component */}
    <EditProductModal
      isOpen={isEditModalOpen}
      onClose={handleEditModalClose}
      product={selectedProduct}
      onUpdate={(updatedProduct) => {
        handleEditModalClose();
      }}
    />
  </div>
  )
}

export default Product