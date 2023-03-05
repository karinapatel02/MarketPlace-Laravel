import React, { useEffect, useState, useContext } from 'react';
import { axiosconn, userCon } from "../util/usercontext";
import { Link, useNavigate } from 'react-router-dom';
import '../../css/homestyle.css';
import '../../css/pagestyle.css';
import Footer from './footer';

function BusinessDash() {
    const { logout } = useContext(userCon);
    const navigate = useNavigate();
    const userId = localStorage.getItem('uid');
    const fname = localStorage.getItem('fname');
    const role = localStorage.getItem('role');
    const [uID, setuID] = useState({
        uid: userId
    });
    const onlogout = (e) => {
        logout();
    };

    const getDetails = async () => {
        const loginToken = localStorage.getItem('token');
        const uid = JSON.stringify(uID);
        if (loginToken) {
            await axiosconn.post('getProdById', uid, {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json',
                }
            }).then(function (response) {
                const res = response.data;
                if (res.success && res.data) {
                    setProductData(res.data);
                    console.log(productData);
                }
            }).catch(function (error) {
                console.log(error);
            });
            await axiosconn.post('getAdById', uid, {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json',
                }
            }).then(function (response) {
                const res = response.data;
                if (res.success && res.data) {
                    setAdData(res.data);
                    console.log(adData);
                }
            }).catch(function (error) {
                console.log(error);
            });

        }
    }

    const [productData, setProductData] = useState([]);
    const [adData, setAdData] = useState([]);
    useEffect(() => {
        getDetails();
    }, []);

    return (
        <div>
            <nav className="header">
                <Link to="/" className="site-title" style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>Mav Market</Link>
                <div className="dropdown" >
                    <i className="ggprofile"></i>
                    <div className="dropdownContent">
                        <a href="/businessprofile">Profile</a>
                        <a href="/products">Products</a>
                        <a href="/addproduct">Add Product</a>
                        <a href="/addad">Add Ad</a>
                        <a href="/login" onClick={onlogout}>Logout</a>
                    </div>
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
                <div className="content-header">
                    <h2>Welcome, {fname}!</h2>
                </div>
                <div className="row">
                    <div className="left-column">
                        <div className="card">
                            <h1>Your Products</h1>
                            <div className="product-row">
                                {productData ? (
                                    productData.map((item, index) => (
                                        <div className="product-column">
                                            <div className="product">
                                                <Link to="/Product" state={{ pid: item.pid }}>
                                                    <img src={item.image} alt="" style={{ width: "100%" }} />
                                                    <h3>{item.name}</h3></Link>
                                                <p className="price">{item.price}</p>
                                                <p>{item.description}</p>
                                            </div>
                                        </div>
                                    ))) : 'Nothing to Show'}
                            </div>
                            <div className="add">
                                <Link to="/addProduct"><i className="gg-add"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="right-column">
                        <div className="card">
                            <h1>Ads</h1>
                            <div className="posts">
                                {adData ? (
                                    adData.map((item, index) => (
                                        <div className="ad-container">
                                            <a href="/ad">
                                                <img src={item.image} alt="" style={{ width: "100%" }} />
                                                <div className="ad-overlay"> {item.content}</div></a>
                                        </div>
                                    ))) : 'Nothing to Show'}
                                <div className="add">
                                    <Link to="/addAd"><i className="gg-add"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default BusinessDash;