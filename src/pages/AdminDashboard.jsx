import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("marketRuns");
  const [image, setImage] = useState(null);
  const [reviewer1, setReviewer1] = useState("");
  const [review1, setReview1] = useState("");
  const [reviewer2, setReviewer2] = useState("");
  const [review2, setReview2] = useState("");
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
      computersTv: "computersTvItems",
    };

    const fetchItems = () => {
      const updatedItems = {};
      Object.keys(categoryMap).forEach((key) => {
        const items = localStorage.getItem(categoryMap[key]);
        try {
          updatedItems[key] = JSON.parse(items) || [];
        } catch (error) {
          console.error(`Error parsing items for category ${key}:`, error);
          updatedItems[key] = []; // Ensure empty array fallback
        }
      });
      setItemsByCategory(updatedItems);
    };

    const handleStorageChange = (event) => {
      if (Object.values(categoryMap).includes(event.key)) {
        fetchItems();
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
      discountedPrice,
      description,
      image,
      reviews: [
        { reviewer: reviewer1, comment: review1 },
        { reviewer: reviewer2, comment: review2 },
      ],
      pending: true,
    };

    const categoryMap = {
      marketRuns: "marketItems",
      foodGrocery: "foodGroceryItems",
      pantryStable: "pantryStableItems",
      meatSeafood: "meatSeafoodItems",
      dairyEggs: "dairyEggsItems",
      bakery: "bakeryItems",
      beverages: "beveragesItems",
      computersTv: "computersTvItems",
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
    setDiscountedPrice("");
    setDescription("");
    setImage(null);
    setReviewer1("");
    setReview1("");
    setReviewer2("");
    setReview2("");
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="number" placeholder="Discounted Price" value={discountedPrice} onChange={(e) => setDiscountedPrice(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="text" placeholder="Reviewer 1 Name" value={reviewer1} onChange={(e) => setReviewer1(e.target.value)} />
        <textarea placeholder="Review 1" value={review1} onChange={(e) => setReview1(e.target.value)} />
        <input type="text" placeholder="Reviewer 2 Name" value={reviewer2} onChange={(e) => setReviewer2(e.target.value)} />
        <textarea placeholder="Review 2" value={review2} onChange={(e) => setReview2(e.target.value)} />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {image && <img src={image} alt="Preview" className="image-preview" />}
        <button className="button1000" type="submit">Add Item</button>
      </form>

      {Object.entries(itemsByCategory).map(([key, items]) => (
        Array.isArray(items) && items.length > 0 && (
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
                      {item.discountedPrice && <p className="discounted-price">Discounted: ₦ {item.discountedPrice}</p>}
                      <p>{item.description}</p>
                      <h4>Reviews:</h4>
                      {item.reviews.map((review, index) => (
                        <p key={index}><strong>{review.reviewer}:</strong> {review.comment}</p>
                      ))}
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
