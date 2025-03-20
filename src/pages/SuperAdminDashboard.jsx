import React, { useState, useEffect } from "react";
import "./SuperAdminDashboard.css";

const categoryMap = {
  marketRuns: "marketItems",
  foodGrocery: "foodGroceryItems",
  pantryStable: "pantryStableItems",
  meatSeafood: "meatSeafoodItems",
  dairyEggs: "dairyEggsItems",
  bakery: "bakeryItems",
  beverages: "beveragesItems",
};

const SuperAdminDashboard = () => {
  const [itemsByCategory, setItemsByCategory] = useState({});
  const [editingItem, setEditingItem] = useState(null); // Track the item being edited

  useEffect(() => {
    const fetchItems = () => {
      const updatedItems = {};
      Object.keys(categoryMap).forEach((key) => {
        updatedItems[key] = JSON.parse(localStorage.getItem(categoryMap[key])) || [];
      });
      setItemsByCategory(updatedItems);
    };

    fetchItems(); // Initial fetch

    const handleStorageChange = (event) => {
      if (Object.values(categoryMap).includes(event.key)) {
        fetchItems(); // Re-fetch items when storage updates
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleApprove = (category, id) => {
    const storageKey = categoryMap[category]; // ✅ Now categoryMap is accessible
    if (!storageKey) return; // Prevent errors if category is not found

    const updatedItems = itemsByCategory[category].map((item) =>
      item.id === id ? { ...item, pending: false, approved: true } : item
    );

    localStorage.setItem(storageKey, JSON.stringify(updatedItems));
    setItemsByCategory((prev) => ({ ...prev, [category]: updatedItems }));

    window.dispatchEvent(new Event("storage"));
  };

  const handleEdit = (item) => {
    setEditingItem({ ...item }); // Set item in edit mode
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (category) => {
    if (!editingItem) return;

    const storageKey = categoryMap[category]; // ✅ Fix: Now categoryMap is available
    if (!storageKey) return;

    const updatedItems = itemsByCategory[category].map((item) =>
      item.id === editingItem.id ? editingItem : item
    );

    localStorage.setItem(storageKey, JSON.stringify(updatedItems));
    setItemsByCategory((prev) => ({ ...prev, [category]: updatedItems }));
    setEditingItem(null);

    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="super-admin-container">
      <h2>Super Admin Dashboard</h2>
      {Object.entries(itemsByCategory).map(([key, items]) =>
        items.length > 0 ? (
          <div key={key} className="category-section">
            <h3>{key.replace(/([A-Z])/g, " $1").trim()}</h3>
            <div className="items-grid">
              {items.map((item) => (
                <div key={item.id} className="item-card">
                  <img src={item.image} alt={item.name} className="item-image" />

                  {editingItem && editingItem.id === item.id ? (
                    // Edit Form
                    <>
                      <input
                        type="text"
                        name="name"
                        value={editingItem.name}
                        onChange={handleChange}
                      />
                      <input
                        type="number"
                        name="price"
                        value={editingItem.price}
                        onChange={handleChange}
                      />
                      <textarea
                        name="description"
                        value={editingItem.description}
                        onChange={handleChange}
                      />
                      <button onClick={() => handleSave(key)} className="save-button">Save</button>
                      <button onClick={() => setEditingItem(null)} className="cancel-button">Cancel</button>
                    </>
                  ) : (
                    // Normal View
                    <>
                      <p>{item.name}</p>
                      <p>₦ {item.price}</p>
                      <p>{item.description}</p>
                      {item.pending && (
                        <button onClick={() => handleApprove(key, item.id)} className="approve-button">
                          Approve
                        </button>
                      )}
                      <button onClick={() => handleEdit(item)} className="edit-button">Edit</button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default SuperAdminDashboard;
