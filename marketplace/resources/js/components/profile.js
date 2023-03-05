import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/homestyle.css';
import '../../css/pagestyle.css';
import '../../css/loginstyle.css';
import Footer from './footer';
import { axiosconn, userCon } from "../util/usercontext";


function Profile() {
    const userId = localStorage.getItem('uid');
    const { logout } = useContext(userCon);
    const username = localStorage.getItem('username');
    const navigate = useNavigate();
    const [uID, setuID] = useState({
        uid: userId
    });
    const [school, setschool] = useState({
        school_id: '',
        name: ''
    });

    const getDetails = async () => {
        const loginToken = localStorage.getItem('token');
        const uid = JSON.stringify(uID);
        let profile = [];
        let products = [];
        if (loginToken) {
            await axiosconn.post('getStudentProfile', uid, {
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
            if (profile.school_id) {
                console.log(profile.school_id);
                setschool({
                    ...school,
                    school_id : profile.school_id
                })
                school['school_id'] = profile.school_id;
                const schoolID = JSON.stringify(school);
                await axiosconn.post('getSchoolById', schoolID, {
                    headers: {
                        'Authorization': 'Bearer ' + loginToken,
                        'Content-Type': 'application/json',
                    }
                }).then(function (response) {
                    const res = response.data;
                    if (res.success && res.data) {
                        setschool(res.data[0]);
                        console.log(school);
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            }
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
            await axiosconn.post('getClubById', uid, {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json',
                }
            }).then(function (response) {
                const res = response.data;
                if (res.success && res.data) {
                    setClubData(res.data);
                    console.log(clubData);
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    const [Profile, setProfile] = useState([]);
    const [productData, setProductData] = useState([]);
    const [clubData, setClubData] = useState([]);
    useEffect(() => {
        getDetails();
    }, []);

    const deleteClub = async (clubid) => {
        // e.preventDefault();
        const loginToken = localStorage.getItem('token');
        if (loginToken) {
            const ipdata = JSON.stringify({ club_id: clubid});
            console.log(ipdata);
            const { data } = await axiosconn.post('deleteClub', ipdata, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + loginToken,
                }
            });
            if (data.success) {
                // e.target.reset();
                alert('Club Deleted.');
                window.location.href = window.location.href;
            }
            else if (!data.success && data.message) {
                alert(data.message);
            }
        }

    }

    // const [details, setDetails] = useState([]);
    // useEffect(() => {
    //     getDetails();
    // }, []);

    const onlogout = (e) => {
        logout();
    };

    return (
        // <div>
        //     {Profile}
        //     {productData}
        // </div>
        <div>

            <nav className="header">
                <Link to="/" className="site-title" style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>Mav Market</Link>
                <div className="dropdown" >
                    <i className="ggprofile"></i>
                    <div className="dropdownContent">
                        <a href="/student">DashBoard</a>
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
                    <a href="http://dmp4205.uta.cloud/mavmarket/blog/" style={{ color: 'white' }} >Blog</a>
                    <a href="/contact" style={{ color: 'white' }} >Contact</a>
                    <a href="/login" style={{ color: 'white' }} >Login/Register</a>
                </div>
            </nav>
            <div className="profile-row">
                <div className="profile-left-column">
                    <div className="card">
                        <img src="/images/usericon.webp" className="avicon" alt="profile" />
                        <h1>{Profile ? Profile['fname'] + ' ' + Profile['lname'] : ''}</h1>
                        <h2>{school ? school['name'] : 'Edit Profile to add School'}</h2>
                        <h3>{Profile ? Profile['major'] : 'Edit Profile to add Major'}</h3>
                        <button type="button" className="formboldbtn" onClick={() => navigate("/editProfile")}>Edit Profile</button>
                    </div>
                </div>
                <div className="profile-right-column">
                    <div className="card">
                        <h1>Products by Student</h1>
                        <div className="product-row">
                            {productData ? (
                                productData.map((item, index) => (
                                    <div className="product-column">
                                        <div className="product">
                                            <Link to="/Product" state={{ pid: item.pid }}><img src={item.image} alt="" style={{ width: "100%" }} />
                                                <h3>{item.name}</h3></Link>
                                            <p className="price">{item.price}</p>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                ))) : 'Nothing to Show'}
                        </div>
                    </div>
                    {/* <div className="card">
                        <h1>Posts by Student</h1>
                        <div className="post-row">
                            <div className="post-column">
                                <a href="/"> <img src={post2} className="post-img" alt="pancake" style={{ width: "100%" }} /></a>
                                <div className="overlay">Pancakes Around the World</div>
                            </div>
                        </div>
                    </div> */}
                    <div className="card">
                        <h1>Clubs</h1>
                        <div className="club-row">
                            {clubData ? (
                                clubData.map((item, index) => (
                                    <div className="club-column">
                                        <div className="club">

                                            <Link to="/Club" state={{ cid: item.club_id, cname: item.name }}>

                                                <h3>{item.name}</h3>

                                            </Link>

                                            <button className='submit' align="center" onClick={() => deleteClub(item.club_id)}>Delete</button>

                                        </div>
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
export default Profile;

