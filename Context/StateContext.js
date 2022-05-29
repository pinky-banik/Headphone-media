import React from 'react';
import { createContext, useState ,useContext} from 'react';
import toast from 'react-hot-toast';


const Context = createContext();
const StateContext = ({children}) => {
    const [showCart,setShowCart] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0);
    const [totalQuantities,setTotalQuantities] = useState(0);
    const[qnty,setQnty] = useState(1);
    const onAdd = (product,quantity) =>{
        const checkProductInCart = cartItems.find((item)=> item._id === product._id);
        
        if(checkProductInCart){
            setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

            const updatedCartItems = cartItems.map((cartProduct)=>{
                if(cartProduct._id === product._id)return {
                    ...cartProduct,
                    quantity : cartProduct.quantity + quantity
                }
            })
            setCartItems(updatedCartItems);
            
        }else{
            product.quantity = quantity;
            setCartItems([...cartItems,{...product}]);
        }
        toast.success(`${qnty} ${product.name} added to the cart`); 
    }


    
    const incrsQnty = () => {
        setQnty((prevQnty)=> prevQnty+1)
    }
    const dcrsQnty = () => {
        setQnty((prevQnty)=> {
            if(prevQnty-1 < 1) return 1;
            return prevQnty-1;
        })
    }
    return (
       <Context.Provider value={{
           showCart,
           setShowCart,
           cartItems,
           totalPrice,
           totalQuantities,
           qnty,
           incrsQnty,
           dcrsQnty,
           onAdd
       }}>
           {children}
       </Context.Provider>
    );
};

export default StateContext;

export const useStateContext = () => useContext(Context);