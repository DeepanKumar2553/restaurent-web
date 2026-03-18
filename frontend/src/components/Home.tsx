import HeroSketch from './Hero';
import BentoGrid from './BentoGrid';
import SignatureDishes from './SignatureDishes';
import Footer from './Footer';

const Home = () => {
    return (
        <>
            <main>
                <HeroSketch />
                <BentoGrid />
                <SignatureDishes />
                <Footer />
            </main>
        </>
    );
};

export default Home;