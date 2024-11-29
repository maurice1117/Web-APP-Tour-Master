import { useNavigate, Link } from "react-router-dom";


function Home() {
    const navigate = useNavigate();

    const handleLogout =  (e) => {
        navigate("/logout");
    }
    
    return (
        <div>
            <div>
                <h1>Home page</h1>
                <Link to="/favorite">Favorite</Link>
                <br/>
                <Link to="/profile">Profile</Link>
                <br/>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Home;