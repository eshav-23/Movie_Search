import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} MovieSpace. All rights reserved.
        </p>
        <p className="footer-text">
          Powered by <a href="http://www.omdbapi.com/" target="_blank" rel="noopener noreferrer">OMDb API</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

