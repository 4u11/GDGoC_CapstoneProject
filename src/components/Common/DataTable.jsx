// src/components/Common/DataTable.jsx
import { useState } from 'react';

const DataTable = ({ 
  columns = [], 
  data = [], 
  loading = false, 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange = () => {} 
}) => {
  const [sortConfig, setSortConfig] = useState(null);

  // Safe data processing
  const processedData = Array.isArray(data) ? data : [];
  const processedColumns = Array.isArray(columns) ? columns : [];

  const handleSort = (key) => {
    if (!key || !processedData.length) return;
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'ascending' 
        ? 'descending' 
        : 'ascending'
    }));
  };

  const sortedData = [...processedData].sort((a, b) => {
    if (!sortConfig?.key) return 0;
    
    const aValue = a[sortConfig.key] ?? '';
    const bValue = b[sortConfig.key] ?? '';

    if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
    return 0;
  });

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (!processedData.length) return <div className="p-4 text-center">No data available</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table header */}
        <thead className="bg-gray-50">
          <tr>
            {processedColumns.map((column, idx) => (
              <th
                key={`header-${idx}`}
                onClick={() => column.accessor && handleSort(column.accessor)}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                <div className="flex items-center">
                  {column.header}
                  {sortConfig?.key === column.accessor && (
                    <span className="ml-1">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        
        {/* Table body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((row, rowIdx) => (
            <tr key={`row-${rowIdx}`}>
              {processedColumns.map((column, colIdx) => (
                <td 
                  key={`cell-${rowIdx}-${colIdx}`}
                  className="px-6 py-4 whitespace-nowrap"
                >
                  {column.cell?.(row) ?? (row[column.accessor] ?? '-')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;