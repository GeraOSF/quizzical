import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <p className="madeBy">Made by Gerardo Gómez</p>
      <div className="footer__links">
        <a href="http://github.com/GeraOSF" target="_blank"> <i className="fa-brands fa-github fa-2x" /></a>
        <a href="http://www.linkedin.com/in/geraosf/" target="_blank"> <i className="fa-brands fa-linkedin fa-2x" /></a>
      </div>
      <p className="madeBy--year">2022</p>
    </footer>
  );
}
