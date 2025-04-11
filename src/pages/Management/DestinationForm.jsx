import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function DestinationForm({
  initialData,
  onSubmit,
  onClose
}) {
  const [formData, setFormData] = useState(initialData || {
    city: '',
    country: '',
    price: 0,
    discount: 0,
    rating: 0,
    quota: 0,
    description: '',
    imageUrl: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('price') || name.includes('discount') || name.includes('rating') || name.includes('quota') 
        ? Number(value) 
        : value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (formData.discount < 0 || formData.discount > 100) newErrors.discount = 'Discount must be between 0-100';
    if (formData.rating < 1 || formData.rating > 5) newErrors.rating = 'Rating must be 1-5';
    if (formData.quota < 0) newErrors.quota = 'Quota cannot be negative';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {initialData ? 'Edit Destination' : 'Add Destination'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City*
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.city ? 'border-red-500' : ''}`}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country*
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.country ? 'border-red-500' : ''}`}
              />
              {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)*
              </label>
              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.price ? 'border-red-500' : ''}`}
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>

            {/* Discount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount (%)
              </label>
              <input
                type="number"
                name="discount"
                min="0"
                max="100"
                value={formData.discount}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.discount ? 'border-red-500' : ''}`}
              />
              {errors.discount && <p className="text-red-500 text-xs mt-1">{errors.discount}</p>}
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating (1-5)*
              </label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.rating ? 'border-red-500' : ''}`}
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num} ★</option>
                ))}
              </select>
              {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
            </div>

            {/* Quota */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Quota*
              </label>
              <input
                type="number"
                name="quota"
                min="0"
                value={formData.quota}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.quota ? 'border-red-500' : ''}`}
              />
              {errors.quota && <p className="text-red-500 text-xs mt-1">{errors.quota}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              disabled={Object.keys(errors).length > 0}
            >
              {initialData ? 'Update' : 'Create'} Destination
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}