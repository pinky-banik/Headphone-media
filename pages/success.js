import React ,{ useState ,useEffect}from 'react';
import Link from 'next/link';
import {BsBagCheckFill} from 'react-icons/bs';
import { useRouter } from 'next/router';
import { useStateContext } from '../Context/StateContext';
import { runFireworks } from './../lib/utils';
const Success = () => {
    const {setCartItems,setTotalPrice,setTotalQuantities} = useStateContext();
    const [order,setOrder] = useState(null);

    useEffect(()=>{
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runFireworks();
    },[])
  return (
    <div className='success-wrapper'>
        <div className="success">
            <p className="icon">
                <BsBagCheckFill/>
            </p>
            <h2>Thank you for your order!</h2>
            <p className="email-msg">check your email inbox for the recipt</p>
            <p className="description">
                If you have any questions,please email
                <a href="mailto:pinky.rani.banik@gmail.com" className="email">pinky.rani.banik@gmail.com</a>
            </p>
            <Link href="/">
                <button type='button'
                width="300ox"
                className='btn'>Continue Shopping</button>
            </Link>
        </div>
    </div>
  )
}

export default Success