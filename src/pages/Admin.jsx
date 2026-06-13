import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['OZONE AUTO', 'OZONE INDUSTRIAL', 'OZONE TEXTILE', 'OZONE METALWORK'];
const ICONS = ['shield', 'thermometer', 'clock'];

const Admin = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('adminToken') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Login credentials state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Products state
  const [productsList, setProductsList] = useState([]);
  const [fetchingProducts, setFetchingProducts] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Form Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [editingId, setEditingId] = useState('');
  
  // Product Form state
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState(CATEGORIES[0]);
  const [formPrice, setFormPrice] = useState('Contact for Price');
  const [formPriceUnit, setFormPriceUnit] = useState('/ Bulk Inquiry');
  const [formImage, setFormImage] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formSpecs, setFormSpecs] = useState([{ label: '', value: '' }]);
  const [formFeatures, setFormFeatures] = useState([{ title: '', description: '', icon: 'shield' }]);
  const [formError, setFormError] = useState('');

  // Validate Token on Mount
  useEffect(() => {
    if (token) {
      verifyToken(token);
    }
  }, [token]);

  // Load products when logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetchProducts();
    }
  }, [isLoggedIn]);

  // Lock background scroll when modal is open (including Lenis scroll support)
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('no-scroll');
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.classList.remove('no-scroll');
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.classList.remove('no-scroll');
      if (window.lenis) window.lenis.start();
    };
  }, [isModalOpen]);

  const verifyToken = async (authToken) => {
    try {
      const res = await fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        setIsLoggedIn(true);
      } else {
        handleLogout();
      }
    } catch (err) {
      console.error('Verify error, using offline/local mode', err);
      setIsLoggedIn(true); // Fallback for local dev convenience
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        setToken(data.token);
        setIsLoggedIn(true);
      } else {
        setLoginError(data.message || 'Login failed');
      }
    } catch (err) {
      setLoginError('Could not connect to backend server. Make sure server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    setIsLoggedIn(false);
    setProductsList([]);
  };

  const fetchProducts = async () => {
    setFetchingProducts(true);
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProductsList(data);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setFetchingProducts(false);
    }
  };

  const openAddModal = () => {
    setModalMode('add');
    setEditingId('');
    setFormName('');
    setFormCategory(CATEGORIES[0]);
    setFormPrice('Contact for Price');
    setFormPriceUnit('/ Bulk Inquiry');
    setFormImage('');
    setFormDescription('');
    setFormSpecs([{ label: '', value: '' }]);
    setFormFeatures([{ title: '', description: '', icon: 'shield' }]);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setModalMode('edit');
    setEditingId(product.id);
    setFormName(product.name);
    setFormCategory(product.category);
    setFormPrice(product.price || 'Contact for Price');
    setFormPriceUnit(product.priceUnit || '/ Bulk Inquiry');
    setFormImage(product.image || '');
    setFormDescription(product.description || '');
    setFormSpecs(product.specs && product.specs.length > 0 ? product.specs : [{ label: '', value: '' }]);
    setFormFeatures(product.features && product.features.length > 0 ? product.features : [{ title: '', description: '', icon: 'shield' }]);
    setFormError('');
    setIsModalOpen(true);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setProductsList(productsList.filter(p => p.id !== productId));
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to delete product');
      }
    } catch (err) {
      alert('Error communicating with server');
    }
  };

  // Specs helper handlers
  const handleSpecChange = (index, field, value) => {
    const updated = [...formSpecs];
    updated[index][field] = value;
    setFormSpecs(updated);
  };

  const addSpecRow = () => {
    setFormSpecs([...formSpecs, { label: '', value: '' }]);
  };

  const removeSpecRow = (index) => {
    setFormSpecs(formSpecs.filter((_, i) => i !== index));
  };

  // Features helper handlers
  const handleFeatureChange = (index, field, value) => {
    const updated = [...formFeatures];
    updated[index][field] = value;
    setFormFeatures(updated);
  };

  const addFeatureRow = () => {
    setFormFeatures([...formFeatures, { title: '', description: '', icon: 'shield' }]);
  };

  const removeFeatureRow = (index) => {
    setFormFeatures(formFeatures.filter((_, i) => i !== index));
  };

  // Submit Product Form
  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formName.trim()) return setFormError('Product Name is required');
    if (!formImage.trim()) return setFormError('Product Image URL is required');

    // Filter out empty rows
    const cleanSpecs = formSpecs.filter(s => s.label.trim() && s.value.trim());
    const cleanFeatures = formFeatures.filter(f => f.title.trim() && f.description.trim());

    const productPayload = {
      name: formName,
      category: formCategory,
      price: formPrice,
      priceUnit: formPriceUnit,
      image: formImage,
      description: formDescription,
      specs: cleanSpecs,
      features: cleanFeatures
    };

    const url = modalMode === 'add' ? '/api/products' : `/api/products/${editingId}`;
    const method = modalMode === 'add' ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productPayload)
      });

      const data = await res.json();
      if (res.ok) {
        setIsModalOpen(false);
        fetchProducts(); // Refresh list
      } else {
        setFormError(data.message || 'Failed to save product');
      }
    } catch (err) {
      setFormError('Error connecting to backend server');
    }
  };

  // Filtering list
  const filteredProducts = productsList.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-brand-main pt-[150px] pb-20 flex justify-center items-center px-4">
        <div className="w-full max-w-[450px] bg-brand-panel/40 backdrop-blur-xl border border-brand-border/60 p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="font-heading text-2xl font-bold tracking-wider text-white">ADMIN PANEL</h1>
            <p className="text-brand-muted text-sm mt-1">Jitesh Trading Company</p>
          </div>
          
          {loginError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6 text-sm">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-brand-muted text-[0.8rem] uppercase tracking-wider mb-2 font-semibold">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/30 border border-brand-border rounded-lg px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-all duration-300"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-brand-muted text-[0.8rem] uppercase tracking-wider mb-2 font-semibold">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/30 border border-brand-border rounded-lg px-4 py-3.5 text-white focus:outline-none focus:border-primary transition-all duration-300"
                placeholder="Enter password"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full py-4 rounded-lg font-heading tracking-widest font-bold text-center block cursor-pointer transition-all duration-300"
            >
              {loading ? 'AUTHENTICATING...' : 'LOGIN'}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-main pt-[130px] pb-24 text-brand-text">
      <div className="container">
        
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-brand-border pb-6 mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-wide text-white">Product Manager</h1>
            <p className="text-brand-muted mt-1">Add, edit or delete catalog products</p>
          </div>
          <div className="flex gap-4">
            <button onClick={openAddModal} className="btn-primary py-3 px-6 rounded-lg font-heading text-sm font-semibold tracking-wider cursor-pointer">
              + ADD NEW PRODUCT
            </button>
            <button onClick={handleLogout} className="border border-brand-border hover:border-red-500/50 hover:text-red-400 py-3 px-5 rounded-lg text-sm transition-all duration-300 cursor-pointer">
              LOGOUT
            </button>
          </div>
        </div>

        {/* Toolbar (Search & Category Filter) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search products by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-panel/30 border border-brand-border/60 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-all duration-300"
            />
          </div>
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-brand-panel/30 border border-brand-border/60 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-all duration-300"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products List Table */}
        {fetchingProducts ? (
          <div className="text-center py-20 text-brand-muted">Fetching catalog data...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-brand-muted border border-brand-border/40 rounded-xl bg-brand-panel/10">No products found matching filters.</div>
        ) : (
          <div className="bg-brand-panel/20 border border-brand-border/60 rounded-xl overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-panel/40 border-b border-brand-border text-[0.8rem] text-brand-muted uppercase tracking-wider">
                  <th className="p-4 pl-6">Image</th>
                  <th className="p-4">Product Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Specs Count</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40 text-[0.92rem]">
                {filteredProducts.map(p => (
                  <tr key={p.id} className="hover:bg-brand-panel/10 transition-colors duration-200">
                    <td className="p-4 pl-6">
                      <div className="w-12 h-12 bg-black/30 rounded border border-brand-border flex items-center justify-center p-1.5">
                        <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                      </div>
                    </td>
                    <td className="p-4 font-bold text-white">{p.name}</td>
                    <td className="p-4">
                      <span className="bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded text-[0.75rem] uppercase tracking-wider font-semibold">
                        {p.category.replace('OZONE ', '')}
                      </span>
                    </td>
                    <td className="p-4 text-brand-muted">{(p.specs || []).length} specs</td>
                    <td className="p-4 text-right pr-6 space-x-3">
                      <button onClick={() => openEditModal(p)} className="text-primary hover:underline font-semibold cursor-pointer">Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:underline font-semibold cursor-pointer">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[2000] flex justify-center items-center overflow-y-auto p-4 pt-10">
          <div className="w-full max-w-[700px] bg-brand-panel border border-brand-border rounded-xl shadow-2xl p-6 md:p-8 max-h-[85vh] overflow-y-auto my-8">
            <div className="flex justify-between items-center border-b border-brand-border pb-4 mb-6">
              <h2 className="font-heading text-xl font-bold text-white">
                {modalMode === 'add' ? 'Add New Product' : 'Edit Product'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-brand-muted hover:text-white text-2xl font-bold cursor-pointer">
                &times;
              </button>
            </div>

            {formError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6 text-sm">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmitProduct} className="space-y-6">
              {/* Product Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-muted text-xs uppercase tracking-wider mb-2 font-bold">Product Name</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-black/20 border border-brand-border rounded px-3.5 py-2.5 text-white focus:outline-none focus:border-primary"
                    placeholder="e.g. OZONE Turbo"
                    required
                  />
                </div>
                <div>
                  <label className="block text-brand-muted text-xs uppercase tracking-wider mb-2 font-bold">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-black/20 border border-brand-border rounded px-3.5 py-2.5 text-white focus:outline-none focus:border-primary"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-brand-muted text-xs uppercase tracking-wider mb-2 font-bold">Price (Display Text)</label>
                  <input
                    type="text"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full bg-black/20 border border-brand-border rounded px-3.5 py-2.5 text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-brand-muted text-xs uppercase tracking-wider mb-2 font-bold">Price Unit</label>
                  <input
                    type="text"
                    value={formPriceUnit}
                    onChange={(e) => setFormPriceUnit(e.target.value)}
                    className="w-full bg-black/20 border border-brand-border rounded px-3.5 py-2.5 text-white focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-brand-muted text-xs uppercase tracking-wider mb-2 font-bold">Image URL / Path</label>
                <input
                  type="text"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full bg-black/20 border border-brand-border rounded px-3.5 py-2.5 text-white focus:outline-none focus:border-primary"
                  placeholder="e.g. /assets/images/automotive/ozone-trans-multi-a.png"
                  required
                />
              </div>

              <div>
                <label className="block text-brand-muted text-xs uppercase tracking-wider mb-2 font-bold">Description</label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows="3"
                  className="w-full bg-black/20 border border-brand-border rounded px-3.5 py-2.5 text-white focus:outline-none focus:border-primary resize-y"
                  placeholder="Enter deep product summary details..."
                />
              </div>

              {/* Specs Rows Section */}
              <div>
                <div className="flex justify-between items-center border-b border-brand-border/40 pb-2 mb-3">
                  <h3 className="text-sm uppercase tracking-wider font-bold text-white">Key Specifications</h3>
                  <button type="button" onClick={addSpecRow} className="text-primary hover:underline text-xs font-bold cursor-pointer">+ Add Row</button>
                </div>
                <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                  {formSpecs.map((spec, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Label (e.g. Grade)"
                        value={spec.label}
                        onChange={(e) => handleSpecChange(i, 'label', e.target.value)}
                        className="flex-1 bg-black/20 border border-brand-border rounded px-3 py-1.5 text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g. SAE 15W-40)"
                        value={spec.value}
                        onChange={(e) => handleSpecChange(i, 'value', e.target.value)}
                        className="flex-1 bg-black/20 border border-brand-border rounded px-3 py-1.5 text-xs text-white"
                      />
                      <button type="button" onClick={() => removeSpecRow(i)} className="text-red-400 hover:text-red-500 font-bold px-2 text-sm cursor-pointer">
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features Rows Section */}
              <div>
                <div className="flex justify-between items-center border-b border-brand-border/40 pb-2 mb-3">
                  <h3 className="text-sm uppercase tracking-wider font-bold text-white">Product Features</h3>
                  <button type="button" onClick={addFeatureRow} className="text-primary hover:underline text-xs font-bold cursor-pointer">+ Add Feature</button>
                </div>
                <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                  {formFeatures.map((feat, i) => (
                    <div key={i} className="border border-brand-border/30 p-3 rounded bg-black/10 flex flex-col gap-2 relative">
                      <button type="button" onClick={() => removeFeatureRow(i)} className="absolute top-2 right-2.5 text-red-400 hover:text-red-500 font-bold text-lg cursor-pointer">
                        &times;
                      </button>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="col-span-2">
                          <input
                            type="text"
                            placeholder="Feature Title (e.g. Power Shield)"
                            value={feat.title}
                            onChange={(e) => handleFeatureChange(i, 'title', e.target.value)}
                            className="w-full bg-black/20 border border-brand-border rounded px-3 py-1.5 text-xs text-white"
                          />
                        </div>
                        <div>
                          <select
                            value={feat.icon}
                            onChange={(e) => handleFeatureChange(i, 'icon', e.target.value)}
                            className="w-full bg-black/20 border border-brand-border rounded px-2 py-1.5 text-xs text-white"
                          >
                            {ICONS.map(ic => (
                              <option key={ic} value={ic}>{ic}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <textarea
                        placeholder="Feature Description details..."
                        value={feat.description}
                        onChange={(e) => handleFeatureChange(i, 'description', e.target.value)}
                        rows="1"
                        className="w-full bg-black/20 border border-brand-border rounded px-3 py-1.5 text-xs text-white resize-y"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 border-t border-brand-border pt-4 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="border border-brand-border hover:bg-white/[0.04] px-5 py-2.5 rounded font-bold text-sm cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="btn-primary px-6 py-2.5 rounded font-bold text-sm cursor-pointer">
                  {modalMode === 'add' ? 'Add Product' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Admin;
