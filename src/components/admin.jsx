// AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Search, Check, X, Eye, Edit, Trash2, RefreshCw, Mail, Clock, CheckCircle, XCircle, LogOut, Lock } from 'lucide-react';
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  where,
  onSnapshot 
} from 'firebase/firestore';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { db, auth } from '../firebase/firebase'; /// You'll need to create this file

const AdminDashboard = () => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Dashboard state
  const [submissions, setSubmissions] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [notification, setNotification] = useState(null);

  // Check authentication state on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setCurrentUser(user);
        loadSubmissions();
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Real-time listener for submissions
  useEffect(() => {
    if (!isAuthenticated) return;

    const q = query(
      collection(db, 'subscriptions'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const submissionsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubmissions(submissionsData);
    }, (error) => {
      console.error('Error listening to submissions:', error);
      showNotification('Error loading submissions', 'error');
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      showNotification('Login successful', 'success');
      setLoginEmail('');
      setLoginPassword('');
    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setLoginError('Invalid email or password');
      } else if (error.code === 'auth/too-many-requests') {
        setLoginError('Too many failed attempts. Please try again later.');
      } else {
        setLoginError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      showNotification('Logged out successfully', 'success');
    } catch (error) {
      console.error('Logout error:', error);
      showNotification('Error logging out', 'error');
    }
  };

  const loadSubmissions = async () => {
    try {
      const q = query(
        collection(db, 'subscriptions'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const submissionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubmissions(submissionsData);
    } catch (error) {
      console.error('Error loading submissions:', error);
      showNotification('Error loading submissions', 'error');
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

 const handleApprove = async (submission) => {
  if (!window.confirm(`Approve submission for ${submission.fullName}?`)) {  // ← FIX HERE
    return;
  }

  setLoading(true);
  try {
    const ticketId = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    await updateDoc(doc(db, 'subscriptions', submission.id), {
      status: 'approved',
      approvedAt: new Date().toISOString(),
      approvedBy: currentUser.email,
      ticketId: ticketId,
      updatedAt: new Date().toISOString()
    });

    showNotification(`Submission approved for ${submission.fullName}`, 'success');  // ← FIX HERE
    setSelectedSubmission(null);
  } catch (error) {
    console.error('Error approving submission:', error);
    showNotification('Error approving submission: ' + error.message, 'error');
  } finally {
    setLoading(false);
  }
};

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      showNotification('Please provide a rejection reason', 'error');
      return;
    }

    setLoading(true);
    try {
      await updateDoc(doc(db, 'subscriptions', selectedSubmission.id), {
        status: 'rejected',
        rejectedAt: new Date().toISOString(),
        rejectedBy: currentUser.email,
        rejectionReason: rejectionReason,
        updatedAt: new Date().toISOString()
      });

      showNotification('Submission rejected', 'success');
      setShowRejectModal(false);
      setRejectionReason('');
      setSelectedSubmission(null);
    } catch (error) {
      console.error('Error rejecting submission:', error);
      showNotification('Error rejecting submission: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!editData.fullName || !editData.email || !editData.phone) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    setLoading(true);
    try {
      await updateDoc(doc(db, 'subscriptions', selectedSubmission.id), {
        ...editData,
        updatedAt: new Date().toISOString(),
        updatedBy: currentUser.email
      });

      showNotification('Submission updated successfully', 'success');
      setShowEditModal(false);
      setSelectedSubmission(null);
      setEditData({});
    } catch (error) {
      console.error('Error updating submission:', error);
      showNotification('Error updating submission: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'subscriptions', selectedSubmission.id));
      showNotification('Submission deleted successfully', 'success');
      setShowDeleteModal(false);
      setSelectedSubmission(null);
    } catch (error) {
      console.error('Error deleting submission:', error);
      showNotification('Error deleting submission: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (submission) => {
    setSelectedSubmission(submission);
    setEditData({
      fullName: submission.fullName,
      position: submission.position,
      email: submission.email,
      phone: submission.phone,
      mpesaCode: submission.mpesaCode,
      mpesaMessage: submission.mpesaMessage,
      amount: submission.amount
    });
    setShowEditModal(true);
  };

  const filteredSubmissions = submissions
    .filter(s => filter === 'all' || s.status === filter)
    .filter(s =>
      s.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.mpesaCode?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const stats = {
    pending: submissions.filter(s => s.status === 'pending').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    rejected: submissions.filter(s => s.status === 'rejected').length,
    total: submissions.length
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
              <Lock className="w-12 h-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
            <p className="text-gray-600">Impact360 Dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="admin@impact360.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold transition-colors"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-6">
            Contact your system administrator if you need access.
          </p>
        </div>
      </div>
    );
  }

  // Main Dashboard (same as before, but now using real Firestore data)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        } text-white flex items-center gap-3`}>
          {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Impact360 Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Logged in as: {currentUser?.email}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={loadSubmissions}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Submissions</p>
                <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
              </div>
              <Mail className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Review</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="w-12 h-12 text-yellow-600 opacity-20" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Approved</p>
                <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Rejected</p>
                <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="w-12 h-12 text-red-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or M-Pesa code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'pending'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Pending ({stats.pending})
              </button>
              <button
                onClick={() => setFilter('approved')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'approved'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Approved ({stats.approved})
              </button>
              <button
                onClick={() => setFilter('rejected')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'rejected'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Rejected ({stats.rejected})
              </button>
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All ({stats.total})
              </button>
            </div>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">M-Pesa Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">{submission.fullName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{submission.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {submission.planName}
                      <br />
                      <span className="text-xs text-gray-500">{submission.planPeriod}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">{submission.mpesaCode}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">KES {submission.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {submission.status?.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {submission.createdAt?.toDate ? submission.createdAt.toDate().toLocaleDateString() : 'N/A'}
                   </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedSubmission(submission)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        {submission.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(submission)}
                              disabled={loading}
                              className="p-2 text-green-600 hover:bg-green-50 rounded disabled:opacity-50 transition-colors"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedSubmission(submission);
                                setShowRejectModal(true);
                              }}
                              disabled={loading}
                              className="p-2 text-red-600 hover:bg-red-50 rounded disabled:opacity-50 transition-colors"
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        
                        <button
                          onClick={() => openEditModal(submission)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => {
                            setSelectedSubmission(submission);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredSubmissions.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Mail className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">No submissions found</p>
                <p className="text-sm">Try adjusting your filters or search term</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-4">Reject Submission</h3>
            <p className="text-gray-600 mb-4">
              Please provide a reason for rejecting this submission.
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason (e.g., 'M-Pesa code not found', 'Amount mismatch')..."
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 min-h-24 focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectionReason('');
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={loading || !rejectionReason.trim()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Rejecting...' : 'Reject Submission'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 my-8">
            <h3 className="text-2xl font-bold mb-6">Edit Submission</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={editData.fullName || ''}
                  onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  value={editData.position || ''}
                  onChange={(e) => setEditData({ ...editData, position: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={editData.email || ''}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  value={editData.phone || ''}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">M-Pesa Code</label>
                <input
                  type="text"
                  value={editData.mpesaCode || ''}
                  onChange={(e) => setEditData({ ...editData, mpesaCode: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (KES)</label>
                <input
                  type="text"
                  value={editData.amount || ''}
                  onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">M-Pesa Message</label>
                <textarea
                  value={editData.mpesaMessage || ''}
                  onChange={(e) => setEditData({ ...editData, mpesaMessage: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg min-h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-3 justify-end mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditData({});
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold mb-4 text-red-600">Delete Submission</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the submission from <strong>{selectedSubmission?.fullName}</strong>? 
              This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedSubmission(null);
                }}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    {/* Details Modal */}
{selectedSubmission && !showRejectModal && !showEditModal && !showDeleteModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
    <div className="bg-white rounded-lg max-w-2xl w-full p-6 my-8">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-bold">Submission Details</h3>
        <button
          onClick={() => setSelectedSubmission(null)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Full Name</label>
            <p className="text-lg">{selectedSubmission.fullName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Position</label>
            <p className="text-lg">{selectedSubmission.position || 'N/A'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Email</label>
            <p className="text-lg">{selectedSubmission.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Phone</label>
            <p className="text-lg">{selectedSubmission.phone}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Plan</label>
            <p className="text-lg">{selectedSubmission.planName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Period</label>
            <p className="text-lg">{selectedSubmission.planPeriod}</p>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500">M-Pesa Transaction Code</label>
          <p className="text-lg font-mono bg-gray-100 p-3 rounded">{selectedSubmission.mpesaCode}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500">Amount Paid</label>
          <p className="text-lg font-semibold">KES {selectedSubmission.amount}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500">M-Pesa Message</label>
          <p className="text-sm bg-gray-100 p-3 rounded whitespace-pre-wrap">{selectedSubmission.mpesaMessage}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500">Status</label>
          <p>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
              selectedSubmission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              selectedSubmission.status === 'approved' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}>
              {selectedSubmission.status?.toUpperCase()}
            </span>
          </p>
        </div>

        {selectedSubmission.status === 'approved' && selectedSubmission.ticketId && (
          <div>
            <label className="text-sm font-medium text-gray-500">Ticket ID</label>
            <p className="text-lg font-mono bg-green-50 p-3 rounded">{selectedSubmission.ticketId}</p>
          </div>
        )}

        {selectedSubmission.status === 'rejected' && selectedSubmission.rejectionReason && (
          <div>
            <label className="text-sm font-medium text-gray-500">Rejection Reason</label>
            <p className="text-sm bg-red-50 p-3 rounded">{selectedSubmission.rejectionReason}</p>
          </div>
        )}

        {/* Submitted & Updated */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Submitted At</label>
            <p className="text-sm">
              {selectedSubmission.createdAt?.toDate
                ? selectedSubmission.createdAt.toDate().toLocaleString()
                : 'N/A'}
            </p>
          </div>

          {selectedSubmission.updatedAt && (
            <div>
              <label className="text-sm font-medium text-gray-500">Last Updated</label>
              <p className="text-sm">
                {selectedSubmission.updatedAt?.toDate
                  ? selectedSubmission.updatedAt.toDate().toLocaleString()
                  : new Date(selectedSubmission.updatedAt).toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* Approved At */}
        {selectedSubmission.approvedAt && (
          <div>
            <label className="text-sm font-medium text-gray-500">Approved At</label>
            <p className="text-sm text-green-600">
              {selectedSubmission.approvedAt?.toDate
                ? selectedSubmission.approvedAt.toDate().toLocaleString()
                : new Date(selectedSubmission.approvedAt).toLocaleString()}
            </p>
          </div>
        )}
      </div> {/* <-- Close inner space-y-4 */}

      {/* Action Buttons */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => setSelectedSubmission(null)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Close
        </button>

        {selectedSubmission.status === 'pending' && (
          <>
            <button
              onClick={() => handleApprove(selectedSubmission)}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              <Check className="w-4 h-4 inline mr-2" />
              Approve
            </button>
            <button
              onClick={() => setShowRejectModal(true)}
              disabled={loading}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              <X className="w-4 h-4 inline mr-2" />
              Reject
            </button>
          </>
        )}

        {selectedSubmission.status === 'rejected' && (
          <button
            onClick={() => openEditModal(selectedSubmission)}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit className="w-4 h-4 inline mr-2" />
            Edit & Resubmit
          </button>
        )}
      </div>
    </div>
  </div>
)}
    </div>
  );
} 

export default AdminDashboard;