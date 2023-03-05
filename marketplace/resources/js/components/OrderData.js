import React, { useState, useEffect, useContext } from 'react';
import { Link, useMatch, useResolvedPath, useNavigate, useLocation } from "react-router-dom";
import { axiosconn, userCon } from "../util/usercontext";

function OrderData() {
    const { user, logout } = useContext(userCon);
    const uid = localStorage.getItem('uid');
    const role = localStorage.getItem('role');
    const navigate = useNavigate();
    const location = useLocation();
    const oid = location.state.oid;
    const total = location.state.total;
    const onlogout = (e) => {
        logout();
    };
    const [orderhistoryData, setOrderData] = useState([]);
    const getOrderhistory = async () => {
        const loginToken = localStorage.getItem('token');
        let allData = [];
        if (loginToken) {
            const ipdata = JSON.stringify({ uid: uid, oid: oid });
            const { data } = await axiosconn.post('getOrderhistorydetail', ipdata, {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json',
                }
            }).then(function (response) {
                const res = response.data;
                if (res.success && res.data) {
                    allData = res.data;
                    console.log(res.data)
                    setOrderData(allData)
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
    const returnProduct = async (prodId, oid) => {
        const loginToken = localStorage.getItem('token');
        if (loginToken) {
            const ipdata = JSON.stringify({ pid: prodId, oid: oid });
            const { data } = await axiosconn.post('returnProduct', ipdata, {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json',
                }
            });
            if (data.success) {
                alert(data.message);
                navigate('/order');
            } else {
                alert(data.message);
            }
        }
    }

    useEffect((i) => {
        getOrderhistory()
    }, []);
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
            <div className="content row" style={{ overflowX: 'auto' }}>
                <table>
                    <caption><h1> Order Details </h1></caption>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                    <tbody>
                        {orderhistoryData.map((item, index) => (
                            <tr className="trb">
                                <td>{index + 1}</td>
                                <td>{item.productname}</td>
                                <td>${item.productprice * item.quantity}</td>
                                <td><img src={item.image} alt="" height="150" width="150" /></td>
                                <td>{item.quantity}</td>
                                <td>{item.category}</td>
                                <td><button onClick={() => returnProduct(item.pid, item.oid)} className='submit'>Return Product</button></td>
                            </tr>
                        ))}
                        <tr>
                            <td colspan="5"> Grand Total: </td>
                            <td>{total}</td>
                            <td></td>
                        </tr>
                    </tbody>
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

export default OrderData