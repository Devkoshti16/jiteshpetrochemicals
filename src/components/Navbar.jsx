import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileActive, setMobileActive] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileActive(false);
  }, [location]);

  useEffect(() => {
    if (mobileActive) {
      document.body.classList.add('no-scroll');
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.classList.remove('no-scroll');
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.classList.remove('no-scroll');
      if (window.lenis) window.lenis.start();
    };
  }, [mobileActive]);

  const toggleMobile = () => {
    setMobileActive(!mobileActive);
  };

  const closeMobile = () => {
    setMobileActive(false);
    setActiveDropdown(null);
  };

  const handleDropdownClick = (e, menuName) => {
    if (window.innerWidth < 1024) {
      e.preventDefault();
      setActiveDropdown(activeDropdown === menuName ? null : menuName);
    }
  };

  return (
    <nav className="fixed top-0 w-full py-1.5 z-[1000] transition-all duration-300 border-b border-brand-border bg-brand-main">
      {/* Backdrop overlay for mobile sidebar */}
      {mobileActive && (
        <div className="fixed inset-0 top-[49px] bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={closeMobile} />
      )}

      <div className="container flex justify-between items-center">
        <Link to="/" className="font-heading text-3xl font-bold tracking-[3px] text-white" onClick={closeMobile}>
          {/* JITESH<span className="text-primary">.</span> */}
          <img src="/assets/images/logo1.png" alt="logo" className='md:w-[130px] w-[80px]' />
        </Link>

        <ul data-lenis-prevent className={`flex lg:items-center gap-6 lg:gap-8 transition-all duration-300 max-lg:fixed max-lg:top-[52px] max-lg:w-[80%] max-lg:h-[calc(100vh-52px)] max-lg:bg-brand-panel max-lg:flex-col max-lg:items-start max-lg:p-6 sm:max-lg:p-10 max-lg:border-t max-lg:border-l max-lg:border-brand-border max-lg:overflow-y-auto max-lg:z-50 ${mobileActive ? 'max-lg:right-0' : 'max-lg:-right-full'}`}>
          <li><Link to="/" className="nav-link lg:py-6" onClick={closeMobile}>Home</Link></li>
          <li><Link to="/#about" className="nav-link lg:py-6" onClick={closeMobile}>About</Link></li>

          <li className={`relative group ${activeDropdown === 'lubricants' ? 'active' : ''}`}>
            <a href="javascript:void(0)" className="nav-link lg:py-6" onClick={(e) => handleDropdownClick(e, 'lubricants')}>
              Lubricants <span className="ml-1.5 inline-block transition-transform duration-300 group-hover:rotate-180">&#9662;</span>
            </a>
            <ul className="nav-dropdown">
              {[
                { id: 'all', name: 'lubricen and Specialties' },
                { id: 'auto', name: 'Auto' },
                { id: 'industrial', name: 'Industrial' },
                { id: 'textile', name: 'Textile' },
                { id: 'metalwork', name: 'Metalwork' }
              ].map((cat) => (
                <li key={cat.id} className="border-b border-white/10 last:border-none">
                  <Link to={`/products${cat.id === 'all' ? '' : `?category=OZONE ${cat.id.toUpperCase()}`}`} className="nav-dropdown-item w-full" onClick={closeMobile} >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li className={`relative group ${activeDropdown === 'chemicals' ? 'active' : ''}`}>
            <a href="/specialty-chemicals" className="nav-link lg:py-6">
              Specialties
            </a>
            {/* <ul className="nav-dropdown">
              <li><a href="/#chemicals" className="nav-dropdown-item w-full">Coming soon...</a></li>
            </ul> */}
            {/* <ul className="nav-dropdown">
              {[
                { id: "coming-soon", name: "Coming Soon...", to: "/#chemicals" },
              ].map((cat) => (
                <li key={cat.id} className="border-b border-white/10 last:border-none">
                  <Link to={cat.to} className="nav-dropdown-item w-full" onClick={closeMobile} >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul> */}
          </li>

          <li className="lg:hidden"><Link to="/#contact" className="nav-link" onClick={closeMobile}>Get Quote</Link></li>
        </ul>

        <Link to="/#contact" className="btn-primary-sm bg-primary text-white hidden lg:inline-flex">Get Quote</Link>

        <div className="lg:hidden cursor-pointer flex flex-col gap-[5px]" onClick={toggleMobile}>
          <span className={`w-7 h-[3px] bg-white rounded-sm transition-all duration-300 ${mobileActive ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
          <span className={`w-7 h-[3px] bg-white rounded-sm transition-all duration-300 ${mobileActive ? 'opacity-0' : '1'}`}></span>
          <span className={`w-7 h-[3px] bg-white rounded-sm transition-all duration-300 ${mobileActive ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
