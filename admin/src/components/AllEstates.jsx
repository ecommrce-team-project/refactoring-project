import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilLine, Trash } from 'lucide-react';

function AllEstates() {
  const [estates, setEstates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEstate, setSelectedEstate] = useState(null);
  const [imageFile, setImageFile] = useState(null);


  const fetchEstates = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/estate/getall');
        setEstates(response.data);
      } catch (error) {
        console.error('Error fetching estates:', error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
  

    fetchEstates();
  }, []);

  const handleEditClick = (estate) => {
    setSelectedEstate(estate);
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = selectedEstate.image_url;

      // If a new image is selected, upload it to Cloudinary
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'Rayen Preset'); // Replace with your Cloudinary upload preset
        const cloudinaryResponse = await axios.post(
            `https://api.cloudinary.com/v1_1/dba2zunte/image/upload`,// Replace with your Cloudinary cloud name
          formData
        );
        imageUrl = cloudinaryResponse.data.secure_url;
      }

      // Update the estate with the new data
      const updatedEstate = { ...selectedEstate, image_url: imageUrl };
      await axios.put(`http://localhost:3000/api/estate/update/${selectedEstate.id}`, updatedEstate);
      setEstates(estates)
      setIsModalOpen(false);
      setImageFile(null); // Reset the file input
      fetchEstates(); // Refresh the estate list after updating
    } catch (error) {
      console.error('Error updating estate:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEstate((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteClick = async (estateId) => {
    try {
     await axios.delete(`http://localhost:3000/api/estate/delete/${estateId}`);
     setEstates(estates);
     fetchEstates(); // Refresh the estate list after deletion
    } catch (error) {
      console.error('Error deleting estate:', error);
    }
  };
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Estates List</h1>
  
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {estates.map((estate) => (
            <div
              key={estate.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={estate.image_url}
                alt={estate.title}
                className="w-full h-36 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{estate.title}</h2>
                <p className="text-gray-600 mt-1">{estate.location}</p>
                <p className="text-gray-800 font-bold mt-2">${estate.price.toLocaleString()}</p>
                <p className="text-gray-500 text-sm mt-1">
                  Category: {estate.category?.name || 'N/A'}
                </p>
              </div>
              <div className="flex justify-between items-center p-4 border-t">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleEditClick(estate)}
                >
                  <PencilLine size={20} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteClick(estate.id)}
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Editing Estate */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Estate</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={selectedEstate.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={selectedEstate.location}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={selectedEstate.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-2 px-4 py-2 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllEstates;