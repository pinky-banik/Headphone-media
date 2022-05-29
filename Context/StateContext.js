import React from 'react';
import { createContext, useState ,useContext} from 'react';
import toast from 'react-hot-toast';
import Product from './../components/Product';


const Context = createContext();
const StateContext = ({children}) => {
    const [showCart,setShowCart] = useState(false);
    const [cartItems,setCartItems] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0);
    const [totalQuantities,setTotalQuantities] = useState(0);
    const[qnty,setQnty] = useState(1);

    let foundProduct;
    let index;

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
    const onRemove =(product) =>{
        foundProduct = cartItems.find((item) => item._id ===product._id);
        const newCartItems = cartItems.filter((item) => item._id!==product._id);
        setTotalPrice((prevTotalPrice)=>prevTotalPrice-foundProduct.price*foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities=>prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemQuantity = (id,value)=>{
        foundProduct = cartItems.find((item) => item._id ===id);
        index = cartItems.findIndex((product)=> product._id ===id);
        const newCartItems = cartItems.filter((item) => item._id!==id);

        if(value === 'incrs'){
            
            setCartItems([...newCartItems,{...foundProduct,quantity: foundProduct.quantity +1}]);
            setTotalPrice((prevTotalPrice)=>prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities+1);
        }else if (value ==='decrs'){
            if(foundProduct.quantity>1){
                setCartItems([...newCartItems,{...foundProduct,quantity: foundProduct.quantity -1}]);
            setTotalPrice((prevTotalPrice)=>prevTotalPrice - foundProduct.price);
            setTotalQuantities((prevTotalQuantities)=> prevTotalQuantities - 1);
            }

        }
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
           onAdd,
           toggleCartItemQuantity,
           onRemove
       }}>
           {children}
       </Context.Provider>
    );
};

export default StateContext;

export const useStateContext = () => useContext(Context);