
import Banner from "./Banner";
import Featured from "./Featured";
import Trending from "./Trending";


const Home = () => {
    return (
        <div className="overflow-hidden">
           
            <Banner></Banner>
            <Featured></Featured>
            <Trending></Trending>
           
        </div>
    );
};

export default Home;