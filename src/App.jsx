import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'

// Pages
import Home from './pages/Home.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Products from './pages/Products.jsx'

// Components
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Loader from './components/Loader.jsx'

// Scroll restoration and hash scroll component
function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      if (window.lenis) {
        window.lenis.scrollTo(0, {
          immediate: true,
          force: true,
        });
      } else {
        window.scrollTo(0, 0);
      }
    } else {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);

        if (element) {
          if (window.lenis) {
            window.lenis.scrollTo(element, {
              offset: -100,
            });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    }
  }, [pathname, hash]);

  return null;
}

function Layout() {
  return (
    <>
      <ScrollHandler />
      {/* Loader */}
      <Loader />

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="lg:pt-[87px] md:pt-[80px] pt-[55px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

function App() {
  useEffect(() => {
    // Initialize Lenis for buttery smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    window.lenis = lenis;

    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return (
    <Router>
      <Layout />
    </Router>
  )
}

export default App