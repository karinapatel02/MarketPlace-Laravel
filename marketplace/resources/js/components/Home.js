import React from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
    const navigate = useNavigate();
    const foncol = {
        fontSize: 30,
        color: '#14487e',
    };
    return (
        <div style={{ width: '100%' }}>
            <Navbar />
            <div className="row">
                <div className="home-left">
                    <p style={{ fontSize: 30, fontWeight: 'bold' }}>Immerse in the Campus Experience!</p>
                    <ul>
                        <li><p style={foncol}>Buy & Sell Products</p></li>
                        <li><p style={{ fontSize: 30 }}>Join Clubs and Engage with Posts</p></li>
                        <li><p style={foncol}>Interact with Businesses on Campus</p></li>
                    </ul>
                    <button type="button" className="formboldbtn" onClick={() => navigate("/service")}>Let's Begin</button>
                </div>
                <div className="home-right">
                    <img src="/images/mainicon2.png" className="home-icon" alt="home" />
                </div>
            </div>
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
        </div>

    )
}
export default Home