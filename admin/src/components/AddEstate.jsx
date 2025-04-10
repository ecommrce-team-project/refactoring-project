import React, { useState } from 'react';
import axios from 'axios';

function AddEstate({ onEstateAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bathrooms: '',
    bedrooms: '',
    area: '',
    category_id: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Function to upload the image to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Rayen Preset');

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dba2zunte/image/upload`,
        formData
      );
      return response.data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw new Error('Failed to upload image');
    }
  };

  // Function to handle form submission and add the estate
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';

      // Upload the image if a file is selected
      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      }

      // Create the new estate object
      const newEstate = { ...formData, image_url: imageUrl };
      await axios.post('http://localhost:3000/api/estate/create', newEstate);

      if (onEstateAdded) onEstateAdded();

      // Reset the form
      setFormData({
        title: '',
        description: '',
        price: '',
        location: '',
        bathrooms: '',
        bedrooms: '',
        area: '',
        category_id: '',
      });
      setImageFile(null);
      console.log("added estate successfully");
      
    } catch (error) {
      console.error('Error adding estate:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="p-8 bg-white rounded-lg shadow-lg max-w-4xl mx-auto border border-gray-300">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Estate</h2>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* General Information Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Property Details Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Property Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Area (m²)</label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Category Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Category</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="string"
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Description Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Description</h3>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              required
            />
          </div>

          {/* Image Upload Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Image</h3>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Estate'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEstate;