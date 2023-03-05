import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosconn, userCon, UserProvider } from "../util/usercontext";
import '../../css/homestyle.css';
import '../../css/pagestyle.css';
import Footer from './footer';

function Business() {
    
    const userId = localStorage.getItem('uid');
    const { logout } = useContext(userCon);
    const username = localStorage.getItem('username');
    const navigate = useNavigate();
    const [uID, setuID] = useState({
        uid: userId
    });

    const getDetails = async () => {
        const loginToken = localStorage.getItem('token');
        const uid = JSON.stringify(uID);
        let profile = [];
        if (loginToken) {
            await axiosconn.post('getBusinessProfile', uid, {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json',
                }
            }).then(function (response) {
                const res = response.data;
                if (res.success && res.data) {
                    profile = res.data[0];
                    setProfile(res.data[0]);
                    console.log(Profile);
                }
            }).catch(function (error) {
                console.log(error);
            });
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

    const [Profile, setProfile] = useState([]);
    const [productData, setProductData] = useState([]);
    const [adData, setAdData] = useState([]);
    useEffect(() => {
        getDetails();
    }, []);

    const deleteAd= async (adid) => {
        // e.preventDefault();
        const loginToken = localStorage.getItem('token');
        if (loginToken) {
            const ipdata = JSON.stringify({ ad_id: adid});
            console.log(ipdata);
            const { data } = await axiosconn.post('deleteAd', ipdata, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + loginToken,
                }
            });
            if (data.success) {
                // e.target.reset();
                alert('Ad Deleted.');
                window.location.href = window.location.href;
            }
            else if (!data.success && data.message) {
                alert(data.message);
            }
        }

    }

    const onlogout = (e) => {
        logout();
    };

    return (
        <div>
            <nav className="header">
                <Link to="/" className="site-title" style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>Mav Market</Link>
                <div className="dropdown" >
                    <i className="ggprofile"></i>
                    <div className="dropdownContent">
                        <a href="/business">DashBoard</a>
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
            <div className="profile-row row">
                <div className="profile-left-column">
                    <div className="card">
                        <img src="/images/usericon.webp" className="avicon" alt="business" />
                        <h1>{Profile ? Profile['fname'] + ' ' + Profile['lname'] : 'Edit Profile to add Name'}</h1>
                        <h2>{Profile ? Profile['city'] : 'Edit Profile to add City'}</h2>
                        <button type="button" className="formboldbtn" onClick={() => navigate("/editBusiness")}>Edit Profile</button>
                    </div>
                </div>
                <div className="profile-right-column">
                    <div className="card">
                        <h1>Products by Business</h1>
                        <div className="product-row">
                            {productData ? (
                                productData.map((item, index) => (
                                    <div className="product-column">
                                        <div className="product">
                                            <Link to="/Product" state={{ pid: item.pid }} >
                                                <img src={item.image} alt="" style={{ width: "100%" }} />
                                                <h3>{item.name}</h3></Link>
                                            <p className="price">{item.price}</p>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                ))) : 'Nothing to Show'}
                        </div>
                    </div>
                    <div className="card">
                        <h1>Ads</h1>
                        <div className="posts">
                            {adData ? (
                                adData.map((item, index) => (
                                    <div className="ad-container">
                                        <a href="/ad">
                                            <img src={item.image} alt="" style={{ width: "100%" }} />
                                            <div className="ad-overlay"> {item.content}</div></a>
                                            <button className='submit' align="center" onClick={() => deleteAd(item.ad_id)}>Delete</button>
                                    </div>
                                ))) : 'Nothing to Show'}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Business;