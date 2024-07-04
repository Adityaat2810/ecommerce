import { FaPlus } from "react-icons/fa";

interface ProductProps{
  productId:string ,
  photo:string,
  name:string,
  price:number,
  stock:number,
  handler:()=>void;
}
const server ='https://m.media-amazon.com/images/I'

const ProductCard = ({
  productId, photo, name, price,
  stock,handler}:ProductProps) => {
  return (
    <div className="productcard">
      <img src={`${server}/${photo}`} alt={name} />
      <p>{name}</p>
      <span>₹{price}</span>

      <div>
        <button onClick={()=>handler()}>
          <FaPlus/>
        </button>
      </div>
    </div>
  )
}

export default ProductCard
