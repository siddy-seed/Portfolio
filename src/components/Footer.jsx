import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo gradient-text">SG</div>
        <p className="footer-text">
          Designed & Built by <span className="gradient-text">Siddhant Giri</span>
        </p>
        <p className="footer-copy">© {new Date().getFullYear()} · Turning Data into Decisions</p>
      </div>
      <div className="footer-glow" />
    </footer>
  );
}
