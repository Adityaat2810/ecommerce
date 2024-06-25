import  express  from "express";
import { adminOnly } from "../middlewares/auth.js";
import { deleteProduct, getAdminProducts, getAllCategories, getLatestProduct, getSingleProduct, newProduct, updateProduct } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

//Todo admin only can use this route 
app.post("/new",adminOnly,singleUpload,newProduct);
app.get("/latest",getLatestProduct)
app.get('/categories',getAllCategories);
app.get('/admin-product',adminOnly,getAdminProducts)
app.route("/:id")
    .get(getSingleProduct)
    .put(adminOnly,singleUpload,updateProduct)
    .delete(adminOnly,deleteProduct)

export default app ;
