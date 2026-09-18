import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-4 shadow-[0px_-1px_10px_#1A1D24] text-center bg-[#0b0d10] text-brand-text text-[0.95rem]">
      <div className="container">
        <div className="footer-bottom flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <p>&copy; {new Date().getFullYear()} Jitesh Trading Company. All Rights Reserved.</p>
          <span className="hidden sm:inline text-brand-border">|</span>
          <span className="md:hidden text-brand-border h-0 relative -top-3">----------------</span>
          <Link to="/privacy-policy" className="text-brand-muted hover:text-primary transition-colors duration-200 text-sm font-heading tracking-wide">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
