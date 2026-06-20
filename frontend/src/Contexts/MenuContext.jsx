import { createContext, useState } from "react";
import {product} from "../assets/assets";

export const MenuContext = createContext()

const MenuContextProvider = ({children}) => {
    const [products, setProducts] = useState(product) 
<<<<<<< Updated upstream
=======
    
    const getProductData = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/getAll`)
            if(response.data.success){
                setProducts(response.data.products)
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error('Failed to load menu:', error)
            toast.error('Could not load menu. Please try again later.')
        }
    }

    useEffect(() =>{
        getProductData()
    },[])

>>>>>>> Stashed changes
    return(
        <MenuContext.Provider value={{products}}> {children} </MenuContext.Provider>
    )
}

export default MenuContextProvider