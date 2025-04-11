import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, query } from 'firebase/firestore';
import { db } from '../../services/firebase';
import DataTable from '../../components/Common/DataTable';
import BookingForm from '../Management/BookingForm';

export default function ManageBooking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [vacations, setVacations] = useState([]);

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch bookings
        const bookingsQuery = query(collection(db, 'bookings'));
        const bookingsSnapshot = await getDocs(bookingsQuery);
        const bookingsData = bookingsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Fetch destinations and vacations for dropdowns
        const [destinationsSnapshot, vacationsSnapshot] = await Promise.all([
          getDocs(collection(db, 'destinations')),
          getDocs(collection(db, 'vacations'))
        ]);

        setBookings(bookingsData);
        setDestinations(destinationsSnapshot.docs.map(d => ({ id: d.id, ...d.data() })));
        setVacations(vacationsSnapshot.docs.map(v => ({ id: v.id, ...v.data() })));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = bookings.filter(booking =>
    booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAdd = () => {
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteDoc(doc(db, 'bookings', id));
        setBookings(bookings.filter(b => b.id !== id));
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  const handleSubmit = async (formData) => {
    try {
      // Check quota availability
      const selectedItem = formData.type === 'destination' 
        ? destinations.find(d => d.id === formData.itemId)
        : vacations.find(v => v.id === formData.itemId);

      if (selectedItem.quota <= 0) {
        alert('Quota for this item has been reached');
        return;
      }

      await addDoc(collection(db, 'bookings'), formData);
      setBookings([...bookings, { ...formData }]);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error saving booking:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Bookings</h1>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          disabled={destinations.length === 0 && vacations.length === 0}
        >
          Add Booking
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search bookings..."
          className="border p-2 rounded-md w-full md:w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <DataTable
        columns={[
          { header: 'Customer Name', accessor: 'customerName' },
          { header: 'Phone Number', accessor: 'phoneNumber' },
          { 
            header: 'Type', 
            accessor: 'type',
            cell: (row) => row.type.charAt(0).toUpperCase() + row.type.slice(1)
          },
          { 
            header: 'Item', 
            cell: (row) => {
              const item = row.type === 'destination'
                ? destinations.find(d => d.id === row.itemId)
                : vacations.find(v => v.id === row.itemId);
              return item ? `${item.city}, ${item.country}` : 'N/A';
            }
          },
          {
            header: 'Actions',
            cell: (row) => (
              <div className="flex space-x-2">
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
        <BookingForm
          destinations={destinations}
          vacations={vacations}
          onSubmit={handleSubmit}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}