import React, { useState, useEffect } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contacts from './pages/Contacts';
import Signup from './pages/Signup';
import Verify from './pages/Verify';
import Password from './pages/Password';
import Signin from './pages/Signin';
import Resetpassword from './pages/Resetpassword';
import Securitycode from './pages/Securitycode';
import Reset from './pages/Reset';
import Passwordresetsuccesfully from './pages/Passwordresetsuccesfully';
import Logout from './pages/Logout';
import NotificationList from './pages/NotificationList';
import Populatedcart from './pages/Populatedcart';
import EmptyCart from './pages/Emptycart';
import Order from './pages/Order';
import OrderDetails from './pages/OrderDetails';
import HelpCenter from './pages/HelpCenter';
import Wallet from './pages/Wallet';
import EmptyWallet from './pages/EmptyWallet';
import Settings from './pages/Settings';
import Orders from './pages/Orders';
import Message from './pages/Message';
import MessagePopup from './pages/MessagePopup';
import MarketRuns from './pages/MarketRuns';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import FoodAndGrocery from './pages/FoodAndGrocery';
import Electronics from './pages/Electronics';
import HomeAndLiving from './pages/HomeAndLiving';
import HealthAndBeauty from './pages/HealthAndBeauty';
import FashionAndClothing from './pages/FashionAndClothing';
import BabiesAndGames from './pages/BabiesAndGames';
import FeedAndSeeds from './pages/FeedAndSeeds';
import SportAndOutdoors from './pages/SportAndOutdoors';
import FoodGrocery from './pages/FoodGrocery';
import PantryStable from './pages/PantryStable';
import MeatSeafood from './pages/MeatSeafood';
import DairyEggs from './pages/DairyEggs';
import BakeryItems from './pages/BakeryItems';
import Beverages from './pages/Beverages';
import ComputersTv from './pages/ComputersTv';
import PhoneAccessories from './pages/PhoneAccessories'
import ComputerAccessories from './pages/ComputerAccessories'
import HomeAppliances from './pages/HomeAppliances'
import AudioandMusical from './pages/AudioandMusical'
import CamerasPhotograph from './pages/CamerasPhotograph'
import Gaming from './pages/Gaming'
import Wearable from './pages/Wearable'
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import categoriesData from './data/categoriesData.json';

const App = () => {
  // State for user authentication
  const [user, setUser] = useState(null);
  
  // 🛒 Cart state
  const [cart, setCart] = useState([]);

  // Load user and cart data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (storedUser) setUser(storedUser);
    setCart(storedCart);
  }, []);

   // Dynamic Category Routes
   const categoryRoutes = categoriesData.map((category, index) => (
    <Route 
      key={index}
      path={category.path}
      element={<category.component />}  // You can dynamically choose components here
    />
  ));

  // Add item to cart and update localStorage
  const addToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Router setup
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout cartCount={cart.length} />}> {/* Pass cart count */}
        <Route index element={<Home user={user} />} />
        <Route path="Products" element={<Products />} />
        <Route path="About" element={<About />} />
        <Route path="Contacts" element={<Contacts />} />
        <Route path="Signup" element={<Signup />} />
        <Route path="Verify" element={<Verify />} />
        <Route path="Password" element={<Password />} />
        <Route path="Signin" element={<Signin setUser={setUser} />} />
        <Route path="Resetpassword" element={<Resetpassword />} />
        <Route path="Securitycode" element={<Securitycode />} />
        <Route path="Reset" element={<Reset />} />
        <Route path="Passwordresetsuccesfully" element={<Passwordresetsuccesfully />} />
        <Route path="Logout" element={<Logout />} />
        <Route path="NotificationList" element={<NotificationList />} />
        <Route path="Emptycart" element={<EmptyCart />} />
        <Route path="Populatedcart" element={<Populatedcart />} />
        <Route path="Order" element={<Order />} />
        <Route path="OrderDetails" element={<OrderDetails />} />
        <Route path="HelpCenter" element={<HelpCenter />} />
        <Route path="Wallet" element={<Wallet />} />
        <Route path="EmptyWallet" element={<EmptyWallet />} />
        <Route path="Settings" element={<Settings />} />
        <Route path="Orders" element={<Orders />} />
        <Route path="Message" element={<Message />} />
        <Route path="MessagePopup" element={<MessagePopup />} />
        <Route path="MarketRuns" element={<MarketRuns addToCart={addToCart} />} />
        <Route path="AdminDashboard" element={<AdminDashboard />} />
        <Route path="AdminLogin" element={<AdminLogin />} />
        <Route path="FoodAndGrocery" element={<FoodAndGrocery />} />
        <Route path="Electronics" element={<Electronics />} />
        <Route path="HomeAndLiving" element={<HomeAndLiving/>} />
        <Route path="HealthAndBeauty" element={<HealthAndBeauty/>} />
        <Route path="FashionAndClothing" element={<FashionAndClothing />} />
        <Route path="BabiesAndGames" element={<BabiesAndGames />} />
        <Route path="FeedAndSeeds" element={<FeedAndSeeds />} />
        <Route path="SportAndOutdoors" element={<SportAndOutdoors />} />
        <Route path="FoodGrocery" element={<FoodGrocery />} />
        <Route path="PantryStable" element={<PantryStable />} />
        <Route path="MeatSeafood" element={<MeatSeafood />} />
        <Route path="DairyEggs" element={<DairyEggs />} />
        <Route path="BakeryItems" element={<BakeryItems />} />
        <Route path="Beverages" element={<Beverages />} />
        <Route path="ComputersTv" element={<ComputersTv />} />
        <Route path="PhoneAccessories" element={<PhoneAccessories />} />
        <Route path="ComputerAccessories" element={<ComputerAccessories />} />
        <Route path="HomeAppliances" element={<HomeAppliances />} />
        <Route path="AudioandMusical" element={<AudioandMusical />} />
        <Route path="CamerasPhotograph" element={<CamerasPhotograph />} />
        <Route path="Gaming" element={<Gaming />} />
        <Route path="Wearable" element={<Wearable />} />
        <Route path="SuperAdminDashboard" element={<SuperAdminDashboard />} />
        {categoryRoutes}
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
