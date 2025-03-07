import { createStoreContext } from 'react'
import { Food_list} from "../assets/Food_list"

export const StoreContext = createStoreContext(null)

const StoreContextProvider = ( props ) => {
    const contextValue = {
        Food_list
    }
        return (
            <StoreContext.Provider value={contextValue}>
                {props.children}
            </StoreContext.Provider>
        )
}

export default StoreContextProvider;