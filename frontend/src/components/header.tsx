import { useState } from "react";
import { FaSearch, FaShoppingBag, FaSign, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

// creating temporary user 
const user = { _id: "ks", role: "" }

export default function Header() {

    const logoutHandler=()=>{
        setIsOpen(false)
    }
    
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <nav className="header">
            <Link onClick={() => setIsOpen(false)} to={'/'}>Home </Link>
            <Link onClick={() => setIsOpen(false)} to={'/search'}><FaSearch /></Link>
            <Link onClick={() => setIsOpen(false)} to={'/cart'}> <FaShoppingBag /></Link>
            {
                // means user is logged in 
                user?._id ? (
                    <>
                        <button onClick={() => setIsOpen((prev) => !prev)}>
                            <FaUser />
                        </button>

                        <dialog open={isOpen}>
                            <div>
                                {
                                    user.role === "admin" && (
                                        <Link to={"/admin/dashboard"}>Admin</Link>
                                    )
                                }
                                <Link to="/orders">Orders</Link>
                                <button onClick={logoutHandler}>
                                    <FaSignOutAlt />
                                </button>
                            </div>
                        </dialog>
                    </>

                ) : <Link to={"/login"}><FaSignInAlt /></Link>
            }

        </nav>
    )
}
