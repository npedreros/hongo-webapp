/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <div className="copyright">
          © {new Date().getFullYear()} made with{" "}
          <i className="tim-icons icon-heart-2" /> by{" "}
          <a
            href="#"
            target="_blank"
          >
            Natica
          </a>{" "}
          
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
