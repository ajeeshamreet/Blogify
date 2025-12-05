import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">
                    BlogifyX
                </Link>
                <div className="links">
                    <Link to="/?cat=Technology">Technology</Link>
                    <Link to="/?cat=Lifestyle">Lifestyle</Link>
                    <Link to="/?cat=Travel">Travel</Link>
                    <Link to="/?cat=Food">Food</Link>
                    <Link to="/?cat=Art">Art</Link>

                    {currentUser ? (
                        <>
                            <span className="username">{currentUser.username}</span>
                            <Link to="/write" className="write-btn">Write</Link>
                            <span onClick={handleLogout} className="logout-btn">Logout</span>
                        </>
                    ) : (
                        <Link to="/login" className="write-btn">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
