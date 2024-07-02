import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from '../components/cartItem';
import { Link } from "react-router-dom";

const cartItems =[
  {
    productId:'dhbckdc',
    name:"mac-book",
    photo:"https://m.media-amazon.com/images/I/710TJuHTMhL._SX466_.jpg",
    price:100000,
    quantity:4,
    stock:10,
  }
];
const subtotal =4000 ;
const discount =400
const tax =Math.round(subtotal*0.18)
const shippingChargess = 200 ;
const total = subtotal+tax+shippingChargess-discount;


const Cart = () => {

  const [couponCode ,setCouponCode] = useState<string>("")
  const [isValidCouponCode ,setIsValidCouponCode] = useState<boolean>(false)

  useEffect(()=>{

    const timeOutId = setTimeout(()=>{
      let x:number=Math.random()
      console.log(x)
      if(x>0.5){
        setIsValidCouponCode(true)

      }else{
        setIsValidCouponCode(false);
      }

     },1000)

    return ()=>{
      clearTimeout(timeOutId)
     
    }

  },[couponCode])

  return (
    <div className="cart">
      <main>
        {cartItems.length>0 ? 
          cartItems.map((i,idx)=>
          <CartItem key={idx} cartItem={i}/>
        ):  <h1>No Items added</h1>
        }
      </main>

      <aside>
        <p>Subtotal:₹{subtotal}</p>
        <p>Shipping Charges:₹{shippingChargess}</p>
        <p>Tax:₹{tax}</p>
        <p>
          Discount:<em>
            -₹{discount}
          </em> 
        </p>
        <p><b> Total:₹{total}</b></p>

        <input type="text"  placeholder="Coupon Code"
          value={couponCode} onChange={(e=>{
          setCouponCode(e.target.value) 
        })}/>

        {
          couponCode &&
         ( isValidCouponCode?( <span className="green">
            ₹{discount} of using the <code> {couponCode}</code>
          </span>):( <span className="red">
            Invalid <VscError/>
          </span>))
        }
      

      {
        cartItems.length>0 && 
        <Link to='/shipping'>Checkout</Link>
      }

      </aside>
    </div>
  )
}

export default Cart