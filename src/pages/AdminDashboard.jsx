import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("marketRuns");
  const [image, setImage] = useState(null);
  const [itemsByCategory, setItemsByCategory] = useState({});

  useEffect(() => {
    const categoryMap = {
      marketRuns: "marketItems",
      foodGrocery: "foodGroceryItems",
      pantryStable: "pantryStableItems",
      meatSeafood: "meatSeafoodItems",
      dairyEggs: "dairyEggsItems",
      bakery: "bakeryItems",
      beverages: "beveragesItems",
    };
  
    const fetchItems = () => {
      const updatedItems = {};
      Object.keys(categoryMap).forEach((key) => {
        updatedItems[key] = JSON.parse(localStorage.getItem(categoryMap[key])) || [];
      });
      setItemsByCategory(updatedItems);
    };
  
    fetchItems(); // Fetch initially
  
    const handleStorageChange = (event) => {
      if (Object.values(categoryMap).includes(event.key)) {
        fetchItems(); // Re-fetch items when storage updates
      }
    };
  
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { 
      id: Date.now(), 
      name, 
      price, 
      description, 
      image,
      pending: true // Mark as pending for Super Admin review
    };
  
    const categoryMap = {
      marketRuns: "marketItems",
      foodGrocery: "foodGroceryItems",
      pantryStable: "pantryStableItems",
      meatSeafood: "meatSeafoodItems",
      dairyEggs: "dairyEggsItems",
      bakery: "bakeryItems",
      beverages: "beveragesItems",
    };
  
    const storageKey = categoryMap[category] || "marketItems";
    const storedItems = JSON.parse(localStorage.getItem(storageKey)) || [];
    storedItems.push(newItem);
    localStorage.setItem(storageKey, JSON.stringify(storedItems));
  
    setItemsByCategory((prev) => ({
      ...prev,
      [category]: [...(prev[category] || []), newItem],
    }));
  
    setName("");
    setPrice("");
    setDescription("");
    setImage(null);
  };

  const handleDelete = (category, id) => {
    const categoryMap = {
      marketRuns: "marketItems",
      foodGrocery: "foodGroceryItems",
      pantryStable: "pantryStableItems",
      meatSeafood: "meatSeafoodItems",
      dairyEggs: "dairyEggsItems",
      bakery: "bakeryItems",
      beverages: "beveragesItems",
    };

    const storageKey = categoryMap[category];
    const updatedItems = itemsByCategory[category].filter(item => item.id !== id);
    localStorage.setItem(storageKey, JSON.stringify(updatedItems));
    setItemsByCategory(prev => ({ ...prev, [category]: updatedItems }));
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="marketRuns">Market Runs</option>
          <option value="foodGrocery">Food Grocery</option>
          <option value="pantryStable">Pantry & Stable</option>
          <option value="meatSeafood">Meat & Seafood</option>
          <option value="dairyEggs">Dairy & Eggs</option>
          <option value="bakery">Bakery</option>
          <option value="beverages">Beverages</option>
        </select>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && <img src={image} alt="Preview" className="image-preview" />}
        <button className="button1000" type="submit">Add Item</button>
      </form>

      {Object.entries(itemsByCategory).map(([key, items]) => (
  items.length > 0 && (
    <div key={key} className="category-section">
      <h3>{key.replace(/([A-Z])/g, ' $1').trim().replace(/\b\w/g, c => c.toUpperCase())}</h3>
      <div className="items-grid">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <img src={item.image} alt={item.name} className="item-image" />
            <p>{item.name}</p>
            
            {item.pending ? (
              <p className="pending-label">Pending Approval</p>
            ) : (
              <>
                <p>₦ {item.price}</p>
                <p>{item.description}</p>
              </>
            )}
            
            <button onClick={() => handleDelete(key, item.id)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
))}

    </div>
  );
};

export default AdminDashboard;
