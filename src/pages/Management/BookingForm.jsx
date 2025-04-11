import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function BookingForm({
  destinations,
  vacations,
  onSubmit,
  onClose,
  initialData
}) {
  const [formData, setFormData] = useState(initialData || {
    customerName: '',
    phoneNumber: '',
    type: 'destination',
    itemId: '',
    bookingDate: new Date().toISOString().split('T')[0]
  });

  const [availableItems, setAvailableItems] = useState([]);

  useEffect(() => {
    setAvailableItems(formData.type === 'destination' ? destinations : vacations);
    if (!initialData) {
      setFormData(prev => ({ ...prev, itemId: '' }));
    }
  }, [formData.type, destinations, vacations]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const selectedItem = availableItems.find(item => item.id === formData.itemId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {initialData ? 'Edit Booking' : 'Add Booking'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Name
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Booking Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="destination">Destination</option>
                <option value="vacation">Vacation Plan</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formData.type === 'destination' ? 'Destination' : 'Vacation Plan'}
              </label>
              <select
                name="itemId"
                value={formData.itemId}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select {formData.type === 'destination' ? 'Destination' : 'Vacation'}</option>
                {availableItems.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.city}, {item.country} (Quota: {item.quota})
                  </option>
                ))}
              </select>
            </div>

            {selectedItem && selectedItem.quota <= 0 && (
              <div className="text-red-500 text-sm">
                This item has no available quota
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Booking Date
              </label>
              <input
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
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
              disabled={selectedItem?.quota <= 0}
              className={`px-4 py-2 rounded-md text-white ${selectedItem?.quota <= 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}