import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query } from 'firebase/firestore';
import { db } from '../../services/firebase';
import DataTable from '../../components/Common/DataTable';
import DestinationForm from '../Management/DestinationForm';
import ErrorBoundary from '../../components/Common/ErrorBoundary';

export default function ManageDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        // Basic query without where clause
        const q = query(collection(db, 'destinations'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDestinations(data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const filteredData = destinations.filter(dest =>
    dest.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAdd = () => {
    setSelectedDestination(null);
    setIsFormOpen(true);
  };

  const handleEdit = (dest) => {
    setSelectedDestination(dest);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      try {
        await deleteDoc(doc(db, 'destinations', id));
        setDestinations(destinations.filter(dest => dest.id !== id));
      } catch (error) {
        console.error('Error deleting destination:', error);
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedDestination) {
        // Update existing
        await updateDoc(doc(db, 'destinations', selectedDestination.id), formData);
        setDestinations(destinations.map(dest =>
          dest.id === selectedDestination.id ? { ...dest, ...formData } : dest
        ));
      } else {
        // Add new
        const docRef = await addDoc(collection(db, 'destinations'), formData);
        setDestinations([...destinations, { id: docRef.id, ...formData }]);
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error saving destination:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Destinations</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Destination
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search destinations..."
          className="border p-2 rounded-md w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
     
      <DataTable
        columns={[
          { header: 'City', accessor: 'city' },
          { header: 'Country', accessor: 'country' },
          { header: 'Price', accessor: 'price' },
          { header: 'Discount', accessor: 'discount' },
          { header: 'Rating', accessor: 'rating' },
          { header: 'Quota', accessor: 'quota' },
          {
            header: 'Actions',
            cell: (row) => (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(row)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(row.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ),
          },
        ]}
        data={paginatedData}
        loading={loading}
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />

      {isFormOpen && (
        <DestinationForm
          initialData={selectedDestination}
          onSubmit={handleSubmit}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}