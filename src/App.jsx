import React, { useState, useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/store';  // import store and persistor
import { Provider } from 'react-redux';
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
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import categoriesData from './data/categoriesData.json';
import BabiesAndGames from './pages/BabiesAndGames';
import BakeryItems from './pages/BakeryItems';
import Beverages from './pages/Beverages';
import ComputerAccessories from './pages/ComputerAccessories'
import AudioandMusical from './pages/AudioandMusical'
import CamerasPhotograph from './pages/CamerasPhotograph'
import FoodAndGrocery from './pages/FoodAndGrocery';
import Electronics from './pages/Electronics';
import DairyEggs from './pages/DairyEggs';
import ComputersTv from './pages/ComputersTv';
import FashionAndClothing from './pages/FashionAndClothing';
import FeedAndSeeds from './pages/FeedAndSeeds';
import HealthAndBeauty from './pages/HealthAndBeauty';
import Gaming from './pages/Gaming'
import HomeAppliances from './pages/HomeAppliances'
import FoodGrocery from './pages/FoodGrocery'
import PantryStable from './pages/PantryStable';
import MeatSeafood from './pages/MeatSeafood';
import SportAndOutdoors from './pages/SportAndOutdoors';
import PhoneAccessories from './pages/PhoneAccessories'
import HomeAndLiving from './pages/HomeAndLiving'
import Wearable from './pages/Wearable'
import FitnessEquipment from './pages/FitnessEquipment'
import OutdoorCamping from './pages/OutdoorCamping'
import BikesAccessories from './pages/BikesAccessories'
import Babyessentials from './pages/Babyessentials'
import Toys from './pages/Toys'
import ChildrenFurniture from './pages/ChildrenFurniture'
import Women from './pages/Women'
import Men from './pages/Men'
import Kids from './pages/Kids'
import Footwear from './pages/Footwear'
import Clothingaccessories from './pages/Clothingaccessories'
import Bags from './pages/Bags'
import Jewelries from './pages/Jewelries'
import Kidsaccessories from './pages/Kidsaccessories'
import SkinCare from './pages/SkinCare'
import HairCare from './pages/HairCare'
import Makeup from './pages/Makeup'
import Personalcare from './pages/Personalcare'
import Healthwellness from './pages/Healthwellness'
import Furniture from './pages/Furniture'
import Homedecor from './pages/Homedecor'
import BeddingLinen from './pages/BeddingLinen'
import KitchenLinen from './pages/KitchenLinen'
import HouseEssentials from './pages/HouseEssentials'
import FlashSales from './pages/FlashSales'
import Checkout from './pages/Checkout'

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
      element={React.createElement(category.component)}  // ✅ This works
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
        <Route path="BabiesAndGames" element={<BabiesAndGames />} />
        <Route path="BakeryItems" element={<BakeryItems />} />
        <Route path="Beverages" element={<Beverages />} />
        <Route path="ComputerAccessories" element={<ComputerAccessories />} />
        <Route path="AudioandMusical" element={<AudioandMusical />} />
        <Route path="CamerasPhotograph" element={<CamerasPhotograph />} />
        <Route path="FoodAndGrocery" element={<FoodAndGrocery />} />
        <Route path="Electronics" element={<Electronics />} />
        <Route path="DairyEggs" element={<DairyEggs />} />
        <Route path="ComputersTv" element={<ComputersTv />} />
        <Route path="FashionAndClothing" element={<FashionAndClothing />} />
        <Route path="FeedAndSeeds" element={<FeedAndSeeds />} />
        <Route path="HealthAndBeauty" element={<HealthAndBeauty />} />
        <Route path="Gaming" element={<Gaming />} />
        <Route path="HomeAppliances" element={<HomeAppliances />} />
        <Route path="PantryStable" element={<PantryStable />} />
        <Route path="MeatSeafood" element={<MeatSeafood />} />
        <Route path="SportAndOutdoors" element={<SportAndOutdoors />} />
        <Route path="PhoneAccessories" element={<PhoneAccessories />} />
        <Route path="Wearable" element={<Wearable />} />
        <Route path="HomeAndLiving" element={<HomeAndLiving />} />
        <Route path="FoodGrocery" element={<FoodGrocery />} />
        {/* Add more category routes here */}
        <Route path="SuperAdminDashboard" element={<SuperAdminDashboard />} />
        {categoryRoutes}
        <Route path="FitnessEquipment" element={<FitnessEquipment />} />
        <Route path="OutdoorCamping" element={<OutdoorCamping />} />
        <Route path="BikesAccessories" element={<BikesAccessories />} />
        <Route path="Babyessentials" element={<Babyessentials />} />
        <Route path="Toys" element={<Toys />} />
        <Route path="ChildrenFurniture" element={<ChildrenFurniture />} />
        <Route path="Kidsaccessories" element={<Kidsaccessories />} />
        <Route path="Women" element={<Women />} />
        <Route path="Men" element={<Men />} />
        <Route path="Kids" element={<Kids />} />
        <Route path="Footwear" element={<Footwear />} />
        <Route path="Jewelries" element={<Jewelries />} />
        <Route path="Bags" element={<Bags />} />
        <Route path="Clothingaccessories" element={<Clothingaccessories />} />
        <Route path="HairCare" element={<HairCare />} />
        <Route path="SkinCare" element={<SkinCare />} />
        <Route path="Makeup" element={<Makeup />} />
        <Route path="Personalcare" element={<Personalcare />} />
        <Route path="Healthwellness" element={<Healthwellness />} />
        <Route path="Furniture" element={<Furniture />} />
        <Route path="Homedecor" element={<Homedecor />} />
        <Route path="BeddingLinen" element={<BeddingLinen />} />
        <Route path="KitchenLinen" element={<KitchenLinen />} />
        <Route path="HouseEssentials" element={<HouseEssentials />} />
        <Route path="FlashSales" element={<FlashSales />} />
        <Route path="Checkout" element={<Checkout />} />
      </Route>
    )
  );

  return (
    <Provider store={store}> {/* Provide the Redux store */}
      <PersistGate loading={<p>Loading...</p>} persistor={persistor}> {/* Wait for rehydration */}
        <RouterProvider router={router} /> {/* Your app's router */}
      </PersistGate>
    </Provider>
  );
};

export default App;