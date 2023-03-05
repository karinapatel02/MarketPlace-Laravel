import React, { useState, useEffect, useContext } from 'react';
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import { axiosconn, userCon } from "../util/usercontext";

function Order() {
    const { user, logout } = useContext(userCon);
    const uid = localStorage.getItem('uid');
    const role = localStorage.getItem('role');
    const navigate = useNavigate();
    const onlogout = (e) => {
        logout();
    };
    const [orderhistoryData, setOrderData] = useState([]);
    useEffect((i) => {
        getOrderhistory()
    }, []);
    const getOrderhistory = async () => {
        const loginToken = localStorage.getItem('token');
        let allData = [];
        if (loginToken) {
            const ipdata = JSON.stringify({ uid: uid })
            const { data } = await axiosconn.post('getOrderhistory', ipdata, {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json',
                }
            }).then(function (response) {
                const res = response.data;
                if (res.success && res.data) {
                    allData = res.data;
                    console.log("hiiiii")
                    setOrderData(allData)
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }


    return (
        <div>
            <nav className="header">
                <Link to="/" className="site-title" style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>Mav Market</Link>
                <div className="dropdown" >
                    <i className="ggprofile"></i>
                    {role == 'student' && <div className="dropdownContent">
                        <a href="/profile">Profile</a>
                        <a href="/cart">Cart</a>
                        <a href="/order">Orders</a>
                        <a href="/products">Products</a>
                        <a href="/addproduct">Add Product</a>
                        <a href="/login" onClick={onlogout}>Logout</a>
                    </div>}
                    {(role == 'super_admin' || role == 'school_admin') && <div className="dropdownContent">
                        <a href="/managebusiness">Manage Business</a>
                        <a href="/managestudent">Manage Student</a>
                        <a href="/products">Products</a>
                        <a href="/addproduct">Add Product</a>
                        <a href="/addad">Add Ad</a>
                        <a href="/login" onClick={onlogout}>Logout</a>
                    </div>}
                </div>
                <div className="header-right">
                    <a href="/home" style={{ color: 'white' }} >Home</a>
                    <a href="/about" style={{ color: 'white' }} >About</a>
                    <a href="/service" style={{ color: 'white' }} >Service</a>
                    <a href="/" style={{ color: 'white' }} >Blog</a>
                    <a href="/contact" style={{ color: 'white' }} >Contact</a>
                    <a href="/login" style={{ color: 'white' }} >Login/Register</a>
                </div>
            </nav>
            <div className="content row">
                <table>
                    <caption><h1>Previous Orders</h1></caption>
                    <tr>
                        <th>No.</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Details</th>
                    </tr>
                    {orderhistoryData.map((item, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.date}</td>
                            <td>${item.total}</td>
                            <td><Link to="/orderData" state={{oid: item.oid, total: item.total}}>Details</Link></td>
                        </tr>
                    ))}
                </table>
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

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return (
        <ul className={isActive === to ? "active" : ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </ul>
    )
}

export default Order