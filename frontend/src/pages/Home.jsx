import { useNavigate } from "react-router-dom";


function Home() {
    const navigate = useNavigate();

    const handleLogout =  (e) => {
        navigate("/logout");
    }

    return (
        <div>
            <h1>home page</h1>
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default Home