import { useNavigate, Link } from "react-router-dom";
import Bar from "../components/Bar";

function Home() {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        navigate("/logout");
    };
    
    return (
        <Bar />
    );
}

export default Home;
