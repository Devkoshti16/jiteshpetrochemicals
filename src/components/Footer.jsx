const Footer = () => {
  return (
    <footer className="py-4 text-center bg-[#0b0d10] text-brand-text text-[0.95rem]">
      <div className="container">
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Jitesh Trading Company. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
