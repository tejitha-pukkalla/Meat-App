import React, { useState, useEffect } from 'react';
import '../App.css';

const API_BASE_URL = 'http://localhost:4000/api'; 

const Icons = {
  Search: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
  ),
  Plus: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  Edit: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  ),
  Trash: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  ),
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  Package: () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  )
};

export default function ProductsDashboard() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: ''
  });

  const itemsPerPage = 5;

  // Debounce search term with 500ms delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      // Reset to first page when search term changes
      if (searchTerm !== debouncedSearchTerm) {
        setCurrentPage(1);
      }
    }, 500);

    // Cleanup function to clear timeout if searchTerm changes before delay
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch products when debounced search term or current page changes
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, debouncedSearchTerm]);

  const fetchProducts = async (page = 1) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(
        `${API_BASE_URL}/items/get-items?page=${page}&limit=${itemsPerPage}&search=${encodeURIComponent(debouncedSearchTerm)}`
      );
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();

      setProducts(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please check your API connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const url = modalMode === 'add' 
        ? `${API_BASE_URL}/items/add-item`
        : `${API_BASE_URL}/items/${selectedProduct._id}`;
      const method = modalMode === 'add' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save product');
      }

      fetchProducts(currentPage);
      closeModal();
    } catch (error) {
      console.error('Error saving product:', error);
      setError(error.message || 'Failed to save product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/items/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete product');
      }

      fetchProducts(currentPage);
    } catch (error) {
      console.error('Error deleting product:', error);
      setError(error.message || 'Failed to delete product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (mode, product = null) => {
    setModalMode(mode);
    setSelectedProduct(product);
    setError('');

    if (mode === 'edit' && product) {
      setFormData({
        name: product.name,
        description: product.description || '',
        price: product.price,
        quantity: product.quantity
      });
    } else {
      setFormData({ name: '', description: '', price: '', quantity: '' });
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setError('');
    setFormData({ name: '', description: '', price: '', quantity: '' });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div className="headerContent">
          <div className="headerLeft">
            <div className="iconBox"><Icons.Package /></div>
            <div>
              <h1 className="title">Products Dashboard</h1>
              <p className="subtitle">Meat Mart</p>
            </div>
          </div>
          <button onClick={() => openModal('add')} className="addButton">
            <Icons.Plus /><span>Add Product</span>
          </button>
        </div>
      </div>

      <div className="mainContent">
        {error && <div className="errorBox">{error}</div>}

        {/* Search */}
        <div className="searchContainer">
          <div className="searchWrapper">
            <div className="searchIcon"><Icons.Search /></div>
            <input
              type="text"
              placeholder="Search products by name or description..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="searchInput"
            />
          </div>
        </div>

        {/* Products Table */}
        {isLoading ? (
          <div className="loadingContainer"><div className="spinner"></div></div>
        ) : products.length === 0 ? (
          <div className="emptyState">
            <Icons.Package />
            <p className="emptyText">No products found</p>
          </div>
        ) : (
          <div className="tableContainer">
            <table className="productTable">
              <thead>
                <tr>
                  <th className="tableHeader">#</th>
                  <th className="tableHeader">Product Name</th>
                  <th className="tableHeader">Description</th>
                  <th className="tableHeader">Price</th>
                  <th className="tableHeader">Stock</th>
                  <th className="tableHeader">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id} className="tableRow">
                    <td className="tableCell tableCellNumber">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="tableCell tableCellName">{product.name}</td>
                    <td className="tableCell tableCellDescription">
                      {product.description || 'No description available'}
                    </td>
                    <td className="tableCell tableCellPrice">
                      <span className="priceTag">R {product.price}</span>
                    </td>
                    <td className="tableCell tableCellStock">
                      <span className={`stockBadge ${product.quantity > 10 ? 'stockHigh' : product.quantity > 0 ? 'stockMedium' : 'stockLow'}`}>
                        {product.quantity} units
                      </span>
                    </td>
                    <td className="tableCell tableCellActions">
                      <div className="actionButtons">
                        <button 
                          onClick={() => openModal('edit', product)} 
                          className="iconButton editButton"
                          title="Edit Product"
                        >
                          <Icons.Edit />
                        </button>
                        <button 
                          onClick={() => handleDelete(product._id)} 
                          className="iconButton deleteButton"
                          title="Delete Product"
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`paginationButton ${currentPage === 1 ? 'disabledButton' : ''}`}
            >Previous</button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? 'paginationButtonActive' : 'paginationButton'}
              >{index + 1}</button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`paginationButton ${currentPage === totalPages ? 'disabledButton' : ''}`}
            >Next</button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <h2 className="modalTitle">{modalMode === 'add' ? 'Add New Product' : 'Edit Product'}</h2>
              <button onClick={closeModal} className="closeButton"><Icons.Close /></button>
            </div>
            <form onSubmit={handleSubmit} className="form">
              {error && <div className="errorBoxSmall">{error}</div>}
              <div className="formGroup">
                <label className="label">Product Name *</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="input" placeholder="Enter product name" />
              </div>
              <div className="formGroup">
                <label className="label">Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="input textarea" placeholder="Enter product description" />
              </div>
              <div className="formRow">
                <div className="formGroup">
                  <label className="label">Price *</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" step="0.01" className="input" placeholder="0.00" />
                </div>
                <div className="formGroup">
                  <label className="label">Quantity *</label>
                  <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} required min="0" className="input" placeholder="0" />
                </div>
              </div>
              <div className="modalActions">
                <button type="button" onClick={closeModal} className="cancelButton">Cancel</button>
                <button type="submit" disabled={isLoading} className={`submitButton ${isLoading ? 'disabledButton' : ''}`}>
                  {isLoading ? 'Saving...' : modalMode === 'add' ? 'Add Product' : 'Update Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}