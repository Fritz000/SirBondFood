import React, { useState, useEffect, useContext, lazy, Suspense } from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const About = lazy(() => import('./pages/About'));
const Contacts = lazy(() => import('./pages/Contacts'));
const Signup = lazy(() => import('./pages/Signup'));
const Verify = lazy(() => import('./pages/Verify'));
const Password = lazy(() => import('./pages/Password'));
const Signin = lazy(() => import('./pages/Signin'));
const Resetpassword = lazy(() => import('./pages/Resetpassword'));
const Securitycode = lazy(() => import('./pages/Securitycode'));
const Reset = lazy(() => import('./pages/Reset'));
const Passwordresetsuccesfully = lazy(() => import('./pages/Passwordresetsuccesfully'));
const Logout = lazy(() => import('./pages/Logout'));
const NotificationList = lazy(() => import('./pages/NotificationList'));
const Populatedcart = lazy(() => import('./pages/Populatedcart'));
const EmptyCart = lazy(() => import('./pages/Emptycart'));
const Order = lazy(() => import('./pages/Order'));
const OrderDetails = lazy(() => import('./pages/OrderDetails'));
const HelpCenter = lazy(() => import('./pages/HelpCenter'));
const Wallet = lazy(() => import('./pages/Wallet'));
const EmptyWallet = lazy(() => import('./pages/EmptyWallet'));
const Settings = lazy(() => import('./pages/Settings'));
const Orders = lazy(() => import('./pages/Orders'));
const Message = lazy(() => import('./pages/Message'));
const MessagePopup = lazy(() => import('./pages/MessagePopup'));
const MarketRuns = lazy(() => import('./pages/MarketRuns'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const SuperAdminDashboard = lazy(() => import('./pages/SuperAdminDashboard'));

const BabiesAndGames = lazy(() => import('./pages/BabiesAndGames'));
const BakeryItems = lazy(() => import('./pages/BakeryItems'));
const Beverages = lazy(() => import('./pages/Beverages'));
const ComputerAccessories = lazy(() => import('./pages/ComputerAccessories'));
const AudioandMusical = lazy(() => import('./pages/AudioandMusical'));
const CamerasPhotograph = lazy(() => import('./pages/CamerasPhotograph'));
const FoodAndGrocery = lazy(() => import('./pages/FoodAndGrocery'));
const Electronics = lazy(() => import('./pages/Electronics'));
const DairyEggs = lazy(() => import('./pages/DairyEggs'));
const ComputersTv = lazy(() => import('./pages/ComputersTv'));
const FashionAndClothing = lazy(() => import('./pages/FashionAndClothing'));
const FeedAndSeeds = lazy(() => import('./pages/FeedAndSeeds'));
const HealthAndBeauty = lazy(() => import('./pages/HealthAndBeauty'));
const Gaming = lazy(() => import('./pages/Gaming'));
const HomeAppliances = lazy(() => import('./pages/HomeAppliances'));
const PantryStable = lazy(() => import('./pages/PantryStable'));
const MeatSeafood = lazy(() => import('./pages/MeatSeafood'));
const SportAndOutdoors = lazy(() => import('./pages/SportAndOutdoors'));
const PhoneAccessories = lazy(() => import('./pages/PhoneAccessories'));
const HomeAndLiving = lazy(() => import('./pages/HomeAndLiving'));
const Wearable = lazy(() => import('./pages/Wearable'));
const Furniture = lazy(() => import('./pages/Furniture'));
const Homedecor = lazy(() => import('./pages/Homedecor'));
const BeddingLinen = lazy(() => import('./pages/BeddingLinen'));
const KitchenLinen = lazy(() => import('./pages/KitchenLinen'));
const HouseEssentials = lazy(() => import('./pages/HouseEssentials'));
const SkinCare = lazy(() => import('./pages/SkinCare'));
const HairCare = lazy(() => import('./pages/HairCare'));
const Makeup = lazy(() => import('./pages/Makeup'));
const Personalcare = lazy(() => import('./pages/Personalcare'));
const Healthwellness = lazy(() => import('./pages/Healthwellness'));
const Men = lazy(() => import('./pages/Men'));
const Women = lazy(() => import('./pages/Women'));
const Kids = lazy(() => import('./pages/Kids'));
const Footwear = lazy(() => import('./pages/Footwear'));
const Jewelries = lazy(() => import('./pages/Jewelries'));
const Bags = lazy(() => import('./pages/Bags'));
const Clothingaccessories = lazy(() => import('./pages/Clothingaccessories'));
const Babyessentials = lazy(() => import('./pages/Babyessentials'));
const ChildrenFurniture = lazy(() => import('./pages/ChildrenFurniture'));
const Kidsaccessories = lazy(() => import('./pages/Kidsaccessories'));
const BikesAccessories = lazy(() => import('./pages/BikesAccessories'));
const OutdoorCamping = lazy(() => import('./pages/OutdoorCamping'));
const FitnessEquipment = lazy(() => import('./pages/FitnessEquipment'));

import categoriesData from './data/categoriesData.json';



const App = () => {
  const [user, setUser] = useState(null);


  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   if (token) {
  //     axios.get("https://bondfood.vercel.app/api/profile/", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }).then((res) => {
  //       setUser(res.data);
  //     }).catch((err) => {
  //       console.error("Profile fetch failed", err);
  //       setUser(null);
  //     });
  //   }
  // }, []);
  
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
   const categoryComponentMap = {
    BabiesAndGames,
    BakeryItems,
    Beverages,
    // ...add all other category components here
  };
  
  const categoryRoutes = categoriesData.map((category, index) => (
    <Route 
      key={index}
      path={category.path}
      element={React.createElement(categoryComponentMap[category.component])} 
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
        <Route path="Furniture" element={<Furniture />} />
        <Route path="Homedecor" element={<Homedecor />} />
        <Route path="BeddingLinen" element={<BeddingLinen />} />
        <Route path="KitchenLinen" element={<KitchenLinen />} />
        <Route path="HouseEssentials" element={<HouseEssentials />} />
        <Route path="SkinCare" element={<SkinCare />} />
        <Route path="HairCare" element={<HairCare />} />
        <Route path="Makeup" element={<Makeup />} />
        <Route path="Personalcare" element={<Personalcare />} />
        <Route path="Healthwellness" element={<Healthwellness />} />
        <Route path="Men" element={<Men />} />
        <Route path="Women" element={<Women />} />
        <Route path="Kids" element={<Kids />} />
        <Route path="Footwear" element={<Footwear />} />
        <Route path="Jewelries" element={<Jewelries />} />
        <Route path="Bags" element={<Bags />} />
        <Route path="Clothingaccessories" element={<Clothingaccessories />} />
        <Route path="Babyessentials" element={<Babyessentials />} />
        <Route path="Toys" element={<Toys />} />
        <Route path="ChildrenFurniture" element={<ChildrenFurniture />} />
        <Route path="Kidsaccessories" element={<Kidsaccessories />} />
        <Route path="FitnessEquipment" element={<FitnessEquipment />} />
        <Route path="OutdoorCamping" element={<OutdoorCamping />} />
        <Route path="BikesAccessories" element={<BikesAccessories />} />
        {/* Add more category routes here */}
        <Route path="SuperAdminDashboard" element={<SuperAdminDashboard />} />
        {categoryRoutes}
      </Route>
    )
  );
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
  
};

export default App;
