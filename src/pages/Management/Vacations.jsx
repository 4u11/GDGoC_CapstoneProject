import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query } from 'firebase/firestore';
import { db } from '../../services/firebase';
import DataTable from '../../components/Common/DataTable';
import VacationForm from '../Management/VacationForm';

export default function ManageVacations() {
  const [vacations, setVacations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedVacation, setSelectedVacation] = useState(null);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchVacations = async () => {
      try {
        const q = query(collection(db, 'vacations'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setVacations(data);
      } catch (error) {
        console.error('Error fetching vacations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVacations();
  }, []);

  const filteredData = vacations.filter(vacation =>
    vacation.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vacation.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAdd = () => {
    setSelectedVacation(null);
    setIsFormOpen(true);
  };

  const handleEdit = (vacation) => {
    setSelectedVacation(vacation);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vacation?')) {
      try {
        await deleteDoc(doc(db, 'vacations', id));
        setVacations(vacations.filter(v => v.id !== id));
      } catch (error) {
        console.error('Error deleting vacation:', error);
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedVacation) {
        await updateDoc(doc(db, 'vacations', selectedVacation.id), formData);
        setVacations(vacations.map(v =>
          v.id === selectedVacation.id ? { ...v, ...formData } : v
        ));
      } else {
        const docRef = await addDoc(collection(db, 'vacations'), formData);
        setVacations([...vacations, { id: docRef.id, ...formData }]);
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error saving vacation:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Vacation Plans</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Vacation Plan
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search vacations..."
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
          { header: 'Day Trip', accessor: 'dayTrip' },
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
        <VacationForm
          initialData={selectedVacation}
          onSubmit={handleSubmit}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}