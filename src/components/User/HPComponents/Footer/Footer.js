import "./Footer.scss";
const Footer = (props) => {
    return (
        <div className="footerContainer">
            <div className="burger_shape"></div>
            <div className="fry_shape"></div>
            <div className="footerContent"></div>
            <div className="footer_bottom">
                <p>
                    © Copyright
                    <span className="theme-color-3">2024</span>
                    <a href="https://modinatheme.com/foodking/">Foodking </a>. All Rights Reserved.
                </p>
            </div>
        </div>
    );
};

export default Footer;
