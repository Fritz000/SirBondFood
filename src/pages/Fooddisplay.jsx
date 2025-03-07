import React from 'react'
import "../pages/Fooddisplay.css";

const Fooddisplay = () => {

    const {Food_list} = useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
      
    </div>
  )
}

export default Fooddisplay
