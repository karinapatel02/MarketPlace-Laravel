import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import Footer from './footer';
import '../../css/homestyle.css';
import '../../css/loginstyle.css';
import { axiosconn, userCon } from "../util/usercontext";

function Club() {
    const { logout } = useContext(userCon);
    const location = useLocation();
    const uid = localStorage.getItem('uid');
    const role = localStorage.getItem('role');
    const clubid = location.state.cid;
    const navigate = useNavigate();
    const onlogout = (e) => {
        logout();
    };
    const [clubData, setClubData] = useState({
        clubName: location.state.cname,
        clubs: []
    });
    useEffect(() => {
        async function asyncCall() {
            await getClub();
        }
        asyncCall();
    }, []);
    const getClub = async () => {
        const loginToken = localStorage.getItem('token');
        if (loginToken) {
            const ipdata = JSON.stringify({ clubId: clubid, uid: uid })
            console.log(clubid);
            await axiosconn.post('getClub', ipdata, {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json',
                }
            }).then(function (response) {
                const res = response.data;
                if (res.success && res.data) {
                    if (res.data.length > 0) {
                        const cData = {};
                        cData.clubName = res.data[0]["name"];
                        cData.clubs = res.data;
                        setClubData(cData);
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
    const joinClub = async (e) => {
        const loginToken = localStorage.getItem('token');
        try {
            if (loginToken) {
                const ipdata = JSON.stringify({ clubId: clubid, uid: uid })
                const { data } = await axiosconn.post('joinClub', ipdata, {
                    headers: {
                        'Authorization': 'Bearer ' + loginToken,
                        'Content-Type': 'application/json'
                    }
                });
                if (data.success) {
                    // e.target.reset();
                    alert("Joined Club Successfully");
                    navigate("/student");
                } else {
                    alert("You are already a member of the club!")
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const leaveClub = async (e) => {
        const loginToken = localStorage.getItem('token');
        try {
            if (loginToken) {
                const ipdata = JSON.stringify({ clubId: clubid, uid: uid })
                const { data } = await axiosconn.post('leaveClub', ipdata, {
                    headers: {
                        'Authorization': 'Bearer ' + loginToken,
                        'Content-Type': 'application/json'
                    }
                });
                if (data.success) {
                    // e.target.reset();
                    alert("Club Left!");
                    navigate("/student");
                } else {
                    alert("You are not a member of the club!");
                    // alert(data.message)
                    window.location.href = window.location.href;
                }
            }
        } catch (err) {
            console.log(err);
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
                <div className="product-info">
                    <img src="/images/club.png" className="avicon" alt="" style={{ width: '50%' }} />
                    <div>{clubData && <h2>{clubData.clubName}</h2>}</div>
                    <p>Members:</p>
                    <table>
                        {clubData && clubData.clubs.map((item, index) => (
                            <tbody>
                                <tr className="trb">
                                    <td>{index + 1}</td>
                                    <td>{item.fname + ' ' + item.lname}</td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
                <div align="center">
                    <br />
                    <button style={{ marginRight: "5em" }} className='submit' onClick={() => joinClub(clubData.club_id)}>JOIN CLUB</button>
                    <button style={{ marginRight: "0em" }} className='delete' onClick={() => leaveClub(clubData.club_id)}>LEAVE CLUB</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Club;