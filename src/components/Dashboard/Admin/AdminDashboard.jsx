import { useState, useEffect } from 'react';
import axios from 'axios';
import { LocalUrl } from '../../../GlobalUrl.jsx';
import { useAuth } from '../../context/AllContext.jsx';
import { useNavigate } from 'react-router-dom';
import { showSuccessToast, showErrorToast } from '../../Notification/ToastNotification.jsx';
import { HiOutlineUsers,HiOutlineChartBar,HiOutlineBookOpen,HiOutlineTrash,HiOutlineLogout,HiOutlineShieldCheck,
  HiOutlineShoppingBag,HiOutlinePlus,HiOutlineSearch,HiOutlinePencilAlt,HiOutlineCheckCircle} from 'react-icons/hi';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Data States
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalOrders: 0, totalBooks: 0 });
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Edit Admin Profile Modal States
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTab, setEditTab] = useState("info");
  const [adminNameInput, setAdminNameInput] = useState('');
  const [adminBioInput, setAdminBioInput] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add Book Modal State
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    price: '',
    category: '',
    stock: '',
    description: '',
    image: null
  });

  const { user, updateUser, logout, userToken } = useAuth() || {};
  const token = userToken || localStorage.getItem("userToken");
  const navigate = useNavigate();

  const currentAdminName = user?.name || localStorage.getItem("name") || "Admin User";
  const currentAdminEmail = user?.email || localStorage.getItem("email") || "admin@librocart.com";
  const firstLetter = currentAdminName.trim().charAt(0).toUpperCase();

  // Load All Dashboard Data
  useEffect(() => {
    fetchAdminStats();
    fetchAllUsers();
    fetchAllBooks();
    fetchAllOrders();
    if (user) {
      setAdminNameInput(user.name || '');
      setAdminBioInput(user.bio || '');
    }
  }, [user]);

  const fetchAdminStats = async () => {
    try {
      const res = await axios.get(`${LocalUrl}admin_stats`, {
        headers: { 'x-api-key': token }
      });
      if (res.data?.status) setStats(res.data.stats);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${LocalUrl}get_all_user`, {
        headers: { 'x-api-key': token }
      });
      if (res.data?.status) setUsers(res.data.data);
    } catch (err) {
      showErrorToast(err?.response?.data?.msg || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllBooks = async () => {
    try {
      const res = await axios.get(`${LocalUrl}get_all_books`, {
        headers: { 'x-api-key': token }
      });
      if (res.data?.status) setBooks(res.data.data || []);
    } catch (err) {
      console.error("Books fetch error:", err);
    }
  };

  const fetchAllOrders = async () => {
    try {
      const res = await axios.get(`${LocalUrl}get_all_orders`, {
        headers: { 'x-api-key': token }
      });
      if (res.data?.status) setOrders(res.data.data || []);
    } catch (err) {
      console.error("Orders fetch error:", err);
    }
  };

  // Actions
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await axios.delete(`${LocalUrl}delete_user/${userId}`, {
        headers: { 'x-api-key': token }
      });
      if (res.data?.status) {
        showSuccessToast("User deleted successfully!");
        fetchAllUsers();
      }
    } catch (err) {
      showErrorToast(err?.response?.data?.msg || "Delete failed");
    }
  };

  const handleToggleRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      const res = await axios.put(
        `${LocalUrl}update_user_role/${userId}`,
        { role: newRole },
        { headers: { 'x-api-key': token } }
      );
      if (res.data?.status) {
        showSuccessToast(`User role updated to ${newRole.toUpperCase()}`);
        fetchAllUsers();
      }
    } catch (err) {
      showErrorToast(err?.response?.data?.msg || "Role update failed");
    }
  };

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.put(
        `${LocalUrl}update_admin_info`,
        { name: adminNameInput, bio: adminBioInput },
        { headers: { 'x-api-key': token } }
      );
      if (res.data?.status) {
        showSuccessToast(res.data.msg || "Profile updated!");
        if (updateUser) updateUser({ name: adminNameInput, bio: adminBioInput });
        setShowEditModal(false);
      }
    } catch (err) {
      showErrorToast(err?.response?.data?.msg || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showErrorToast("New passwords do not match!");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await axios.put(
        `${LocalUrl}update_admin_password`,
        { oldPassword, newPassword },
        { headers: { 'x-api-key': token } }
      );
      if (res.data?.status) {
        showSuccessToast(res.data.msg || "Password updated!");
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setShowEditModal(false);
      }
    } catch (err) {
      showErrorToast(err?.response?.data?.msg || "Failed to update password");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddBookSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', newBook.title);
      formData.append('author', newBook.author);
      formData.append('price', newBook.price);
      formData.append('category', newBook.category);
      formData.append('stock', newBook.stock);
      formData.append('description', newBook.description);
      if (newBook.image) formData.append('image', newBook.image);

      const res = await axios.post(`${LocalUrl}add_book`, formData, {
        headers: {
          'x-api-key': token,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data?.status || res.status === 200) {
        showSuccessToast("New Book added successfully!");
        setShowAddBookModal(false);
        setNewBook({ title: '', author: '', price: '', category: '', stock: '', description: '', image: null });
        fetchAllBooks();
      }
    } catch (err) {
      showErrorToast(err?.response?.data?.msg || "Failed to add book");
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      const res = await axios.delete(`${LocalUrl}delete_book/${bookId}`, {
        headers: { 'x-api-key': token }
      });
      if (res.data?.status) {
        showSuccessToast("Book removed from inventory!");
        fetchAllBooks();
      }
    } catch (err) {
      showErrorToast(err?.response?.data?.msg || "Failed to delete book");
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await axios.put(
        `${LocalUrl}update_order_status/${orderId}`,
        { status: newStatus },
        { headers: { 'x-api-key': token } }
      );
      if (res.data?.status) {
        showSuccessToast("Order status updated!");
        fetchAllOrders();
      }
    } catch (err) {
      showErrorToast(err?.response?.data?.msg || "Status update failed");
    }
  };

  const handleLogout = () => {
    if (logout) logout();
    else localStorage.clear();
    navigate('/admin-login');
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col md:flex-row font-sans">
      
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#121212] border-r border-zinc-800 p-4 flex flex-col shrink-0">
        <div className="space-y-6">
          
          {/* Admin Header & Profile Details */}
          <div className="px-3 py-3 border-b border-zinc-800 space-y-3">
            <div className="flex items-center gap-2">
              <HiOutlineShieldCheck className="text-[#FF5F1F] text-xl" />
              <h2 className="text-lg font-black text-white">Admin <span className="text-[#FF5F1F]">Panel</span></h2>
            </div>

            {/* Admin Profile Box */}
            <div className="flex items-center gap-3 bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/80">
              <div className="w-9 h-9 rounded-full bg-[#FF5F1F] text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0">
                {firstLetter}
              </div>

              <div className="overflow-hidden text-xs flex-1">
                <p className="font-bold text-white truncate">{currentAdminName}</p>
                <p className="text-[10px] text-zinc-400 truncate">{currentAdminEmail}</p>
              </div>

              <button
                onClick={() => setShowEditModal(true)}
                className="p-1.5 bg-zinc-800 hover:bg-[#FF5F1F] text-zinc-300 hover:text-white rounded-lg transition-colors"
                title="Edit Admin Profile"
              >
                <HiOutlinePencilAlt size={14} />
              </button>
            </div>

            {/* Logout Admin Button placed directly below Admin Details */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full py-2 px-3 text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-red-500/20"
            >
              <HiOutlineLogout size={16} /> Logout Admin
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === "overview"
                  ? "bg-[#FF5F1F] text-white shadow-lg shadow-orange-950/40"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              <HiOutlineChartBar size={20} /> Overview
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === "users"
                  ? "bg-[#FF5F1F] text-white shadow-lg shadow-orange-950/40"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              <HiOutlineUsers size={20} /> Manage Users
            </button>

            <button
              onClick={() => setActiveTab("books")}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === "books"
                  ? "bg-[#FF5F1F] text-white shadow-lg shadow-orange-950/40"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              <HiOutlineBookOpen size={20} /> Book Inventory
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === "orders"
                  ? "bg-[#FF5F1F] text-white shadow-lg shadow-orange-950/40"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-900"
              }`}
            >
              <HiOutlineShoppingBag size={20} /> Orders Management
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 bg-[#121212] overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-6">

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-black border border-zinc-800 p-6 rounded-2xl flex items-center justify-between shadow-xl">
                <div>
                  <h1 className="text-2xl font-black text-white">Welcome Back, {currentAdminName}! 👋</h1>
                  <p className="text-xs text-zinc-400 mt-1">Logged in as <span className="text-[#FF5F1F] font-bold">{currentAdminEmail}</span></p>
                </div>
                <button
                  onClick={() => setShowEditModal(true)}
                  className="bg-[#FF5F1F] hover:bg-orange-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-lg"
                >
                  Edit Profile
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-2xl space-y-1">
                  <span className="text-xs font-bold text-zinc-400 uppercase">Total Users</span>
                  <p className="text-3xl font-black text-[#FF5F1F]">{stats.totalUsers || users.length}</p>
                </div>
                <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-2xl space-y-1">
                  <span className="text-xs font-bold text-zinc-400 uppercase">Total Books</span>
                  <p className="text-3xl font-black text-white">{stats.totalBooks || books.length}</p>
                </div>
                <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-2xl space-y-1">
                  <span className="text-xs font-bold text-zinc-400 uppercase">Orders</span>
                  <p className="text-3xl font-black text-emerald-400">{stats.totalOrders || orders.length}</p>
                </div>
                <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-2xl space-y-1">
                  <span className="text-xs font-bold text-zinc-400 uppercase">System Status</span>
                  <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 pt-2">
                    <HiOutlineCheckCircle size={16} /> Admin Verified
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MANAGE USERS */}
          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-4">
                <div>
                  <h1 className="text-2xl font-black text-white">Manage Registered Users ({users.length})</h1>
                  <p className="text-xs text-zinc-400">View users, authorize roles, or delete accounts</p>
                </div>

                <div className="relative w-full sm:w-64">
                  <HiOutlineSearch className="absolute left-3 top-3 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#1a1a1a] border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#FF5F1F]"
                  />
                </div>
              </div>

              {loading ? (
                <p className="text-xs text-zinc-500">Loading users...</p>
              ) : (
                <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs text-zinc-300">
                    <thead className="bg-zinc-800/80 text-zinc-400 uppercase font-bold text-[10px]">
                      <tr>
                        <th className="p-4">User</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Gender</th>
                        <th className="p-4">Role & Privilege</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      {filteredUsers.map((u) => (
                        <tr key={u._id} className="hover:bg-zinc-800/30 transition-colors">
                          <td className="p-4 font-bold text-white flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#FF5F1F] text-white flex items-center justify-center font-black">
                              {u.name ? u.name.charAt(0).toUpperCase() : "U"}
                            </div>
                            {u.name}
                          </td>
                          <td className="p-4 text-zinc-400">{u.email}</td>
                          <td className="p-4 capitalize">{u.gender || "N/A"}</td>
                          <td className="p-4">
                            <button
                              onClick={() => handleToggleRole(u._id, u.role)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                                u.role === 'admin'
                                  ? 'bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20'
                                  : 'bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20'
                              }`}
                            >
                              {u.role ? u.role.toUpperCase() : "USER"} (Change)
                            </button>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDeleteUser(u._id)}
                              className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                              title="Delete Account"
                            >
                              <HiOutlineTrash size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: BOOK INVENTORY */}
          {activeTab === "books" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                <div>
                  <h1 className="text-2xl font-black text-white">Book Inventory Management</h1>
                  <p className="text-xs text-zinc-400">Add, edit, or remove books from store catalog</p>
                </div>
                <button
                  onClick={() => setShowAddBookModal(true)}
                  className="flex items-center gap-2 bg-[#FF5F1F] hover:bg-orange-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all"
                >
                  <HiOutlinePlus size={16} /> Add New Book
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {books.length === 0 ? (
                  <div className="col-span-full p-8 bg-zinc-900/40 border border-dashed border-zinc-800 rounded-2xl text-center text-zinc-500 text-xs">
                    No books in catalog yet. Click "Add New Book" to publish your first book.
                  </div>
                ) : (
                  books.map((b) => (
                    <div key={b._id} className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl space-y-3 relative group">
                      <div className="h-40 bg-zinc-800/80 rounded-xl overflow-hidden flex items-center justify-center">
                        {b.image ? (
                          <img src={b.image} alt={b.title} className="h-full w-full object-cover" />
                        ) : (
                          <HiOutlineBookOpen size={40} className="text-zinc-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-white truncate">{b.title}</h3>
                        <p className="text-xs text-zinc-400">{b.author || "Unknown Author"}</p>
                      </div>
                      <div className="flex justify-between items-center text-xs pt-2 border-t border-zinc-800">
                        <span className="font-black text-[#FF5F1F]">₹{b.price}</span>
                        <span className="text-zinc-500">Stock: {b.stock || 0}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteBook(b._id)}
                        className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        title="Delete Book"
                      >
                        <HiOutlineTrash size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: ORDERS MANAGEMENT */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="border-b border-zinc-800 pb-4">
                <h1 className="text-2xl font-black text-white">Orders Management</h1>
                <p className="text-xs text-zinc-400">Track and update customer order fulfillment status</p>
              </div>

              {orders.length === 0 ? (
                <div className="p-8 bg-zinc-900/40 border border-dashed border-zinc-800 rounded-2xl text-center text-zinc-500 text-xs">
                  No orders placed yet. Customer orders will appear here automatically.
                </div>
              ) : (
                <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs text-zinc-300">
                    <thead className="bg-zinc-800/80 text-zinc-400 uppercase font-bold text-[10px]">
                      <tr>
                        <th className="p-4">Order ID</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Total Amount</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Update Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      {orders.map((o) => (
                        <tr key={o._id} className="hover:bg-zinc-800/30">
                          <td className="p-4 font-mono text-zinc-400">#{o._id?.substring(0, 8)}</td>
                          <td className="p-4 font-bold text-white">{o.userName || o.userEmail}</td>
                          <td className="p-4 font-black text-[#FF5F1F]">₹{o.totalAmount}</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              o.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'
                            }`}>
                              {o.status || 'Pending'}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <select
                              value={o.status || 'Pending'}
                              onChange={(e) => handleUpdateOrderStatus(o._id, e.target.value)}
                              className="bg-[#121212] border border-zinc-800 text-xs text-white rounded-lg px-2 py-1 focus:outline-none"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* EDIT ADMIN PROFILE MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-zinc-800 w-full max-w-md rounded-2xl p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <h2 className="text-lg font-black text-white">Edit Admin Profile</h2>
              <button onClick={() => setShowEditModal(false)} className="text-zinc-500 hover:text-white">✕</button>
            </div>

            <div className="flex border-b border-zinc-800 gap-4 text-xs font-bold">
              <button
                onClick={() => setEditTab("info")}
                className={`pb-2 transition-colors ${editTab === "info" ? "text-[#FF5F1F] border-b-2 border-[#FF5F1F]" : "text-zinc-400"}`}
              >
                Basic Info
              </button>
              <button
                onClick={() => setEditTab("password")}
                className={`pb-2 transition-colors ${editTab === "password" ? "text-[#FF5F1F] border-b-2 border-[#FF5F1F]" : "text-zinc-400"}`}
              >
                Change Password
              </button>
            </div>

            {editTab === "info" ? (
              <form onSubmit={handleUpdateInfo} className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Admin Display Name</label>
                  <input
                    type="text"
                    value={adminNameInput}
                    onChange={(e) => setAdminNameInput(e.target.value)}
                    className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FF5F1F]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Admin Bio</label>
                  <textarea
                    value={adminBioInput}
                    onChange={(e) => setAdminBioInput(e.target.value)}
                    rows="3"
                    className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FF5F1F] resize-none"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-3">
                  <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-zinc-800 text-zinc-400 rounded-xl font-bold">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="px-5 py-2 bg-[#FF5F1F] text-white rounded-xl font-bold shadow-lg">Save</button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleUpdatePassword} className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Current Password</label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FF5F1F]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-bold mb-1">New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FF5F1F]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FF5F1F]"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 pt-3">
                  <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-zinc-800 text-zinc-400 rounded-xl font-bold">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="px-5 py-2 bg-[#FF5F1F] text-white rounded-xl font-bold shadow-lg">Update</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ADD BOOK MODAL */}
      {showAddBookModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-zinc-800 w-full max-w-lg rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <h2 className="text-lg font-black text-white">Add New Book to Inventory</h2>
              <button onClick={() => setShowAddBookModal(false)} className="text-zinc-500 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddBookSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-bold mb-1">Book Title</label>
                <input
                  type="text"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-3 py-2 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Author</label>
                  <input
                    type="text"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-3 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={newBook.price}
                    onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
                    className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-3 py-2 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Category</label>
                  <input
                    type="text"
                    value={newBook.category}
                    onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                    className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-bold mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={newBook.stock}
                    onChange={(e) => setNewBook({ ...newBook, stock: e.target.value })}
                    className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-bold mb-1">Cover Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewBook({ ...newBook, image: e.target.files[0] })}
                  className="w-full bg-[#121212] border border-zinc-800 rounded-xl px-3 py-2 text-zinc-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowAddBookModal(false)}
                  className="px-4 py-2 bg-zinc-800 text-zinc-400 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF5F1F] text-white rounded-xl font-bold shadow-lg"
                >
                  Publish Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}