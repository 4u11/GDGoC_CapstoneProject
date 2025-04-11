import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function VacationForm({
  initialData,
  onSubmit,
  onClose
}) {
  const [formData, setFormData] = useState(initialData || {
    city: '',
    country: '',
    price: 0,
    dayTrip: 1,
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
      [name]: name.includes('price') || name.includes('dayTrip') || 
              name.includes('rating') || name.includes('quota') 
        ? Number(value) 
        : value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (formData.dayTrip < 1) newErrors.dayTrip = 'Must be at least 1 day';
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
            {initialData ? 'Edit Vacation Plan' : 'Add Vacation Plan'}
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
                required
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
                required
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
                required
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>

            {/* Day Trip */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (Days)*
              </label>
              <input
                type="number"
                name="dayTrip"
                min="1"
                value={formData.dayTrip}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.dayTrip ? 'border-red-500' : ''}`}
                required
              />
              {errors.dayTrip && <p className="text-red-500 text-xs mt-1">{errors.dayTrip}</p>}
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
                required
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
                required
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
              {initialData ? 'Update' : 'Create'} Vacation Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}