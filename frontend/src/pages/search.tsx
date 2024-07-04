import { useState } from "react"
import ProductCard from "../components/product-card";

const Search = () => {

  const [search, setSearch]= useState("");
  const [sort,setSort]=useState("");
  const [maxPrice,setMaxPrice] = useState(1000000000)
  const [category ,setCategory]= useState("");
  const [page,setPage]=useState(1);

  const addToCartHandler=()=>{}
  const isNextPage = page<4;
  const isPreviousPage = page>1;
  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>

        <div>
          <h4>sort </h4>
          <select 
            value={sort} 
            onChange={e=>setSort(e.target.value)}
          >
            <option value="">None</option>
            <option value="asc">Price (Low to high)</option>
            <option value="dsc">Price (High to low )</option>
          </select>
        </div>

        <div>
          <h4>MaxPrice :{maxPrice || ""} </h4>
          <input 
            type="range"
            min={100}
            max={1000000000}
            value={maxPrice} 
            onChange={e=>setMaxPrice(Number(e.target.value))}>

          </input>
        </div>

        <div>
          <h4>Category </h4>
          <select 
            value={category} 
            onChange={e=>setCategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="">Sample1</option>
            <option value="">Sample2</option>
          </select>
        </div>

        
      </aside>

      <main>
        <h1>Products</h1>
        <input 
          type="text" 
          placeholder="search by name..." 
          value={search} onChange={e=>setSearch(e.target.value)} 
        />

        <div className="search-product-list">
          <ProductCard
               productId="iuhcldcrdc" 
               name="macbook" price={387485} 
               stock={448} photo="710TJuHTMhL._SX466_.jpg"
               handler={addToCartHandler}
          />

          <ProductCard
               productId="iuhcldcrdc" 
               name="macbook" price={387485} 
               stock={448} photo="710TJuHTMhL._SX466_.jpg"
               handler={addToCartHandler}
          />
        </div>

        <article>
          <button 
            disabled={!isPreviousPage}
            onClick={()=>setPage((prev)=>(prev-1))}
          >Previous</button>
          <span>{page} of {4} </span>
          <button 
            disabled={!isNextPage}
            onClick={()=>setPage((prev)=>(prev+1))}
          >Next</button>
        </article>
      </main>
    </div>
  )
}

export default Search