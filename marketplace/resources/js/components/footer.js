import React from 'react';
import '../../css/homestyle.css';
import '../../css/pagestyle.css';

function Footer() {
    return (
        <div id="footer" className="footer">
            <div className="footer-left">
                <h2>Office Address</h2>
                <p>701 S. Nedderman Drive <br />
                    Arlington, TX 76019 <br />
                    817-272-2090</p>
                <address>
                    Email: <a target="popup" href="mailto:mavmarket@uta.edu">mavmarketplace@uta.edu</a><br />
                </address>
            </div>
            <div className="footer-right">
                <p>Copyright &copy; 2022 <a href="/">
                    Mav Market</a><br />
                    Part of CSE 5335 002 Web Data Management</p>
            </div>
        </div>
    )
}
export default Footer;