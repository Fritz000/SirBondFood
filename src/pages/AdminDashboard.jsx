import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", location: "", description: "", image: "" });

  // Protect Dashboard: Redirect if admin is not logged in
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuth") === "true";
    if (!isAuthenticated) {
      navigate("/AdminLogin"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("marketItems")) || [];
    setItems(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("marketItems", JSON.stringify(items));
  }, [items]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = () => {
    if (form.name && form.price && form.image) {
      setItems([...items, { ...form, id: Date.now() }]);
      setForm({ name: "", price: "", location: "", description: "", image: "" });
    }
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth"); // Remove admin auth state
    navigate("/AdminLogin"); // Redirect to login
  };

  return (
    <div className="admin-container10">
      <h2 className="admindash">Admin Dashboard</h2>
      <button className="logout-button10" onClick={handleLogout}>Logout</button>
      <div className="form-group10">
        <input type="text" name="name" placeholder="Item Name" value={form.name} onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange}></textarea>
        <input type="file" onChange={handleImageUpload} />
        {form.image && <img src={form.image} alt="Preview" className="preview-image" />}
        <button className="adminbutton" onClick={addItem}>Add Item</button>
      </div>
      <div className="items-list">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>₦ {item.price}</p>
            <p>{item.location}</p>
            <p>{item.description}</p>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
