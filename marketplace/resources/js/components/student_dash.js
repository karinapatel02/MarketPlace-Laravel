import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/homestyle.css'
import '../../css/pagestyle.css'
import Footer from './footer';
import { axiosconn, userCon } from "../util/usercontext";

function StudentDash() {
    const { logout } = useContext(userCon);
    const navigate = useNavigate();
    const userId = localStorage.getItem('uid');
    const fname = localStorage.getItem('fname');
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');
    const onlogout = (e) => {
        logout();
    };

    const getDetails = async () => {
        const loginToken = localStorage.getItem('token');
        // const uid = JSON.stringify(uID);
        if (loginToken) {
            await axiosconn.get('getAllProducts', {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
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
            await axiosconn.get('getAllClubs', {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                }
            }).then(function (response2) {
                const res2 = response2.data;
                if (res2.success && res2.data) {
                    setClubData(res2.data);
                    console.log(clubData);
                }
            }).catch(function (error) {
                console.log(error);
            });
            await axiosconn.get('getAllAds', {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                }
            }).then(function (response3) {
                const res3 = response3.data;
                if (res3.success && res3.data) {
                    setAdData(res3.data);
                    console.log(adData);
                }
            }).catch(function (error) {
                console.log(error);
            });
            
        }
    }

    const [productData, setProductData] = useState([]);
    const [clubData, setClubData] = useState([]);
    const [adData, setAdData] = useState([]);
    useEffect(() => {
        getDetails();
    }, []);

    const addToCart = async (pid) => {
        const loginToken = localStorage.getItem('token');
        if (loginToken) {
            const ipdata = JSON.stringify({ pid: pid, uid: userId, quantity: 1 })
            console.log(ipdata);
            const { data } = await axiosconn.post('addToCart', ipdata, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + loginToken,
                }
            });
            if (data.success) {
                // e.target.reset();
                alert('Added To Cart!');
            }
            else if (!data.success && data.message) {
                alert(data.message);
            }
        }
    }


    return (
        <div>
            <nav className="header">
                <Link to="/" className="site-title" style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>Mav Market</Link>
                <div className="dropdown" >
                    <i className="ggprofile"></i>
                    <div className="dropdownContent">
                        <a href="/profile">Profile</a>
                        <a href="/cart">Cart</a>
                        <a href="/order">Orders</a>
                        <a href="/products">Products</a>
                        <a href="/addproduct">Add Product</a>
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
            <div className="content">
                <div className="content-header">
                    <h2>Welcome, {fname}!</h2>
                </div>
                <div className="row">
                    <div className="left-column">
                        <div className="card">
                            <h1>Browse Products</h1>
                            <div className="product-row">
                                {productData ? (
                                    productData.map((item, index) => (
                                        <div className="product-column">
                                            <div className="product">
                                                <Link to="/Product" state={{ pid: item.pid }}><img src={item.image} alt={item.name} style={{ width: "100%" }} />
                                                    <h3>{item.name}</h3></Link>
                                                <p className="price">{item.price}</p>
                                                <p>{item.description}</p>
                                                <p><button onClick={() => addToCart(item.pid)}>Add to Cart</button></p>
                                            </div>
                                        </div>
                                    ))) : 'Nothing to Show'}
                            </div>

                            <div className="add">
                                <a href="/addproduct"><i className="gg-add"></i></a>
                            </div>
                        </div>
                        <div className="card">
                            <h1>Popular Posts</h1>
                            <div className="post-row">
                                <div className="post-column">
                                    <a href=""><img src="/images/post1.jpeg" className="post-img" alt="ipad" style={{ width: "100%" }} /></a>
                                    <div className="overlay">Unboxing iPad Air</div>
                                </div>
                                <div className="post-column">
                                    <a href=""><img src="/images/post2.jpeg" className="post-img" alt="pancake" style={{ width: "100%" }} /></a>
                                    <div className="overlay">Pancakes Around the World</div>
                                </div>
                                <div className="post-column">
                                    <a href=""><img src="/images/post3.jpeg" className="post-img" alt="halloween" style={{ width: "100%" }} /></a>
                                    <div className="overlay">Halloween 2022 Outfit Ideas</div>
                                </div>
                            </div>
                            <div className="add">
                                <a href=""><i className="gg-file-add"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="right-column">
                        <div className="card">
                            <h1>Join Clubs</h1>
                            <div className="club-row">
                                {clubData ? (
                                    clubData.map((item, index) => (
                                        <div className="club-column">
                                            <Link to="/Club" state={{ cid: item.club_id, cname: item.name }}> <div className="club">
                                                <h3>{item.name}</h3>
                                            </div> </Link>
                                        </div>
                                    ))) : 'Nothing to Show'}
                            </div>
                            <div className="add">
                                <a href="/createclub"><i className="gg-add"></i></a>
                            </div>
                        </div>
                        <div className="card">
                            <h1>Ads</h1>
                            <div className="posts">
                                {adData ? (
                                    adData.map((item, index) => (
                                        <div className="ad-container">
                                            <a href="/ad">
                                                <img src={item.image} alt="Ad1" style={{ width: "100%" }} />
                                                <div className="ad-overlay"> {item.content}</div></a>
                                        </div>
                                    ))) : 'Nothing to Show'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <a href={"chat.php?uname="+ username +"&isLI=b5bea41b6c623f7c09f1bf24dcae58ebab3c0cdd90ad966bc43a45b44867e12b"} class="float" target="_blank">
            <i class="gg-comment myFloat"></i> </a>

            <Footer />
        </div>
    )

}

export default StudentDash;