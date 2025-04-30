import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("FoodAndGrocery"); // Default category
  const [subCategory, setSubCategory] = useState(""); // To store selected subcategory
  const [image, setImage] = useState(null);
  const [reviewer1, setReviewer1] = useState("");
  const [review1, setReview1] = useState("");
  const [reviewer2, setReviewer2] = useState("");
  const [review2, setReview2] = useState("");
  const [itemsByCategory, setItemsByCategory] = useState({});

  // Subcategories map for each category
  const subCategoriesMap = {
    FoodAndGrocery: [
      "FoodGrocery", "PantryStable", "MeatSeafood", "DairyEggs", "BakeryItems", "Beverages"
    ],
    Electronics: [
      "ComputersTv", "PhoneAccessories", "ComputerAccessories", "HomeAppliances", "AudioandMusical", 
      "CamerasPhotograph", "Gaming", "Wearable"
    ],
    HomeAndLiving: [
      "Furniture", "Homedecor", "BeddingLinen", "KitchenLinen", "HouseEssentials"
    ],
    HealthAndBeauty: [
      "Skincare", "Haircare", "Makeup", "Personalcare", "Healthwellness"
    ],
    FashionAndClothing: [
      "Women", "Men", "Kids", "Footwear", "Jewelries", "Bags", "Clothingaccessories"
    ],
    BabiesAndGames: [
      "BabyEssentials", "Toys", "ChildrenFurniture", "Kidsaccessories"
    ],
    SportAndOutdoors: [
      "FitnessEquipment", "OutdoorCamping", "BikesAccessories"
    ]
  };

  // Fetch stored items and set them in state
  useEffect(() => {
    const fetchItems = () => {
      const allKeys = Object.keys(localStorage);
      const updatedItems = {};
  
      allKeys.forEach((key) => {
        const items = localStorage.getItem(key);
        try {
          updatedItems[key] = JSON.parse(items) || [];
        } catch (error) {
          console.error(`Error parsing items for ${key}:`, error);
          updatedItems[key] = [];
        }
      });
  
      setItemsByCategory(updatedItems);  // Update state with the fetched items
    };
  
    const handleStorageChange = () => {
      fetchItems();  // Fetch items again when localStorage changes
    };
  
    fetchItems();  // Initial fetch
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  

  // Handle image upload for item
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

  // Handle form submission to add an item
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Ensure that the subcategory is selected if the category is not marketRuns
    if (category !== "marketRuns" && !subCategory) {
      alert("Please select a subcategory.");
      return;
    }
  
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
  
    // Determine the storage key based on category and subcategory
    let storageKey;
    if (category === "marketRuns") {
      storageKey = "marketItems";  // Market Runs doesn't need subcategory
    } else {
      storageKey = `${category}_${subCategory}`;  // For other categories, use category + subcategory
    }
  
    // Retrieve the stored items for the given storage key
    const storedItems = JSON.parse(localStorage.getItem(storageKey)) || [];
    storedItems.push(newItem);
    localStorage.setItem(storageKey, JSON.stringify(storedItems));
  
    // Update the state after the item is added
    setItemsByCategory((prev) => {
      const updatedCategoryItems = prev[storageKey] || [];
      return {
        ...prev,
        [storageKey]: [...updatedCategoryItems, newItem],  // Add the new item to the corresponding subcategory
      };
    });
  
    // Reset form after submission
    setName("");
    setPrice("");
    setDiscountedPrice("");
    setDescription("");
    setImage(null);
    setReviewer1("");
    setReview1("");
    setReviewer2("");
    setReview2("");
    setSubCategory(""); // Reset subcategory after form submission
  };
  

  // Handle deletion of an item
  const handleDelete = (storageKey, itemId) => {
    const updatedItems = (itemsByCategory[storageKey] || []).filter(
      (item) => item.id !== itemId
    );
    localStorage.setItem(storageKey, JSON.stringify(updatedItems));
    setItemsByCategory((prev) => ({
      ...prev,
      [storageKey]: updatedItems,
    }));
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="FoodAndGrocery">Food and Grocery</option>
          <option value="Electronics">Electronics</option>
          <option value="HomeAndLiving">Home and Living</option>
          <option value="HealthAndBeauty">Health and Beauty</option>
          <option value="FashionAndClothing">Fashion and Clothing</option>
          <option value="BabiesAndGames">Babies and Games</option>
          <option value="SportAndOutdoors">Sport and Outdoors</option>
          <option value="marketRuns">Market Runs</option> {/* Market Runs added here */}
        </select>

        {category !== "marketRuns" && (
          <>
            <label>Subcategory</label>
            <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} required>
              <option value="">Select Subcategory</option>
              {subCategoriesMap[category]?.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </>
        )}

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
