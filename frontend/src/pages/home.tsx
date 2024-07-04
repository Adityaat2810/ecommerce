import { Link } from "react-router-dom"
import ProductCard from "../components/product-card"

const Home = () => {
  const addToCartHandler=()=>{

  }
  return (
    <div className="home">
      <section>

      </section>

      <h1>Latest Product 
        <Link to="/search" className="findmore">More</Link>
      </h1>

      <main>
        <ProductCard 
          productId="iuhcldcrdc" 
          name="macbook" price={387485} 
          stock={448} photo="710TJuHTMhL._SX466_.jpg"
          handler={addToCartHandler}
        />
      </main>
    </div>
  )
}

export default Home