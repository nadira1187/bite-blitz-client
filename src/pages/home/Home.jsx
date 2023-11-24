import Footer from "../shared/footer/Footer";
import NavBar from "../shared/navbar/NavBar";
import Banner from "./Banner";


const Home = () => {
    return (
        <div className="overflow-hidden">
            <NavBar></NavBar>
            <Banner></Banner>
            <Footer></Footer>
        </div>
    );
};

export default Home;