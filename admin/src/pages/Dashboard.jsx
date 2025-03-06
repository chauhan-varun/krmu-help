import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteFormId, setDeleteFormId] = useState(null);

  const handleDeleteClick = (formId) => {
    setDeleteFormId(formId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteFormId) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/admin/forms/${deleteFormId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to delete form');
      }

      setForms(forms.filter(form => form._id !== deleteFormId));
      setShowDeleteModal(false);
      setDeleteFormId(null);
    } catch (err) {
      setError('Failed to delete form');
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteFormId(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchForms();
  }, [navigate]);

  const fetchForms = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/admin/forms`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch forms');
      }

      const data = await response.json();
      setForms(data);
    } catch (err) {
      setError('Failed to load forms');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Form Submissions</h1>
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700 hidden sm:table-header-group">
                <tr>
                  <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Tech Stack
                  </th>
                  <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Timeline
                  </th>
                  <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Budget
                  </th>
                  <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {forms.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-3 sm:px-6 py-4 text-center text-xs sm:text-sm text-gray-400">
                      No form submissions yet
                    </td>
                  </tr>
                ) : (
                  forms.map((form) => (
                    <tr key={form._id} className="block sm:table-row">
                      <td className="block sm:table-cell px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm">
                        <span className="inline-block sm:hidden font-medium text-gray-300 mb-1">Name:</span>
                        <span className="text-white">{form.name}</span>
                      </td>
                      <td className="block sm:table-cell px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm">
                        <span className="inline-block sm:hidden font-medium text-gray-300 mb-1">Tech Stack:</span>
                        <span className="text-gray-300">{form.projectType || 'N/A'}</span>
                      </td>
                      <td className="block sm:table-cell px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm">
                        <span className="inline-block sm:hidden font-medium text-gray-300 mb-1">Timeline:</span>
                        <span className="text-gray-300">{form.timeline || 'N/A'}</span>
                      </td>
                      <td className="block sm:table-cell px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm">
                        <span className="inline-block sm:hidden font-medium text-gray-300 mb-1">Budget:</span>
                        <span className="text-gray-300">₹{form.budget}</span>
                      </td>
                      <td className="block sm:table-cell px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm">
                        <span className="inline-block sm:hidden font-medium text-gray-300 mb-1">Contact:</span>
                        <span className="text-gray-300">+91 {form.description.replace('Phone: ', '')}</span>
                      </td>
                      <td className="block sm:table-cell px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-right">
                        <button
                          onClick={() => handleDeleteClick(form._id)}
                          className="text-red-500 hover:text-red-400 w-full sm:w-auto text-center sm:text-right"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-white mb-4">Confirm Delete</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this form? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;