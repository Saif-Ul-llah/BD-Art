import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from '../../../utilis/axios';


const EditProductModal = ({ isOpen, onClose, product, onUpdate }) => {

    const [editedProduct, setEditedProduct] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        setEditedProduct(product);
    }, [product]);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        handleFile(file);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: false,
    });

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        handleFile(file);
    };

    // Function to handle the image file
    const handleFile = (file) => {
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const imageData = reader.result.split(',')[1];
            console.log('Generated image data:', imageData);
            setSelectedFile({ file, imageData });
        };

        reader.readAsDataURL(file);
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    // Function to handle the update

    const handleUpdateClick = async () => {
        try {
            
            let imageData, imageContentType; // Declare the variables here

        // If a new image is selected, update the imageData and imageContentType
        if (selectedFile) {
            imageData = selectedFile.imageData;
            imageContentType = selectedFile.file.type;
            setEditedProduct((prevProduct) => ({
                ...prevProduct,
                imageData,
                imageContentType,
            }));
        }

        console.log('Received image data:', imageData);
        console.log('Received image content type:', imageContentType);

            // Create a FormData object
            const formData = new FormData();

            // Append product data to FormData
            Object.entries(editedProduct).forEach(([key, value]) => {
                formData.append(key, value);
            });

            // Append image data to FormData
            if (selectedFile) {
                formData.append('imageData', imageData);
                formData.append('imageContentType', imageContentType);

            }

            const response = await axios.post(`/update-product/${product._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data); // Handle the response as needed
            onUpdate(response.data.updatedProduct); // Assuming you have a function to handle the updated product
            onClose(); // Close the modal after updating
        } catch (error) {
            console.error('Error updating product:', error);
            // Handle errors, display an error message, etc.
        }
    };

    return (
        <div className={`fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Product</h3>
                        <button
                            onClick={onClose}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            &times;
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form>
                        {/* Rest of your code */}
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={editedProduct?.name || ''}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type product name"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                                <input
                                    type="text"
                                    name="brand"
                                    id="brand"
                                    value={editedProduct?.brand || ''}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Product brand"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    value={editedProduct?.price || ''}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="$2999"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={editedProduct?.category || ''}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                >
                                    <option value="" disabled>Select category</option>
                                    <option value="TV">TV/Monitors</option>
                                    <option value="PC">PC</option>
                                    <option value="GA">Gaming/Console</option>
                                    <option value="PH">Phones</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="imageInput"
                                className={`relative cursor-pointer ${selectedFile ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                                {...getRootProps()}
                            >
                                <div className="flex flex-col items-center">
                                    {/* Display previous image if available */}
                                    {product?.imageUrl && !selectedFile && (
                                        <img
                                            src={product.imageUrl}
                                            alt="Previous Product Image"
                                            className="w-full h-auto rounded-lg mb-2"
                                        />
                                    )}
                                    {selectedFile ? (
                                        <img
                                            src={URL.createObjectURL(selectedFile.file)}
                                            alt="Selected Product"
                                            className="w-full h-auto rounded-lg mb-2"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center w-full border-2 border-gray-400 border-dashed">
                                            <svg
                                                className="w-10 h-10 text-gray-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                ></path>
                                            </svg>
                                            <p className="text-gray-500 text-center mt-2">Click to select an image</p>
                                        </div>
                                    )}
                                    {/* Hidden file input */}
                                    <input {...getInputProps()} />
                                </div>
                            </label>
                        </div>
                        <button
                            type="button"
                            onClick={handleUpdateClick}
                            className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-4"
                        >
                            Update Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProductModal;
