import React, { useState, useContext, useEffect } from 'react';
import { BarChart, Tooltip, Bar, XAxis, YAxis } from "recharts";
import { Link } from 'react-router-dom';
import '../../css/homestyle.css';
import '../../css/pagestyle.css';
import '../../css/chartstyle.css';
import Footer from './footer';
import { userCon, axiosconn } from '../util/usercontext';
import user from '../util/user';

function SuperAdmin() {
    const { logout } = useContext(userCon);
    const onlogout = (e) => {
        logout();
    };

    const colors = ["#04AA6D", "#2196F3", "#f44336", "#dd4ca8", "#808080"];
    const [bussData, setBussData] = useState([]);
    const [countData, setCountData] = useState({
        student: 0,
        business: 0,
        club: 0,
        school: 0,
        chart1: [],
        pie: []
    });
    useEffect(() => {
        async function asyncCall() {
            await getAllData();
        }
        asyncCall();
    }, []);
    const getAllData = async () => {
        const loginToken = localStorage.getItem('token');
        if (loginToken) {
            await axiosconn.get('getBussUsers', {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json',
                }
            }).then(function (response) {
                const res = response.data;
                if (res.success && res.data) {
                    setBussData(res.data);
                }
            }).catch(function (error) {
                console.log(error);
            });

            await axiosconn.get('getAdminCounts', {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json',
                }
            }).then(function (response) {
                const res2 = response.data;
                if (res2.success && res2.data) {
                    const count = {};
                    res2.data.res.forEach(item => {
                        if (item.role == 'student') {
                            count['student'] = item.count;
                        } else {
                            count['business'] = item.count;
                        }
                    });
                    count['club'] = res2.data.club[0].count;
                    count['school'] = res2.data.school[0].count;
                    count['chart1'] = res2.data.cchart;
                    count['pie'] = res2.data.pie;
                    setCountData(count);
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
    const [style, setStyle] = useState("close-chat-popup");

    const openStyle = () => {
        setStyle("open-chat-popup");
    };

    const closeStyle = () => {
        setStyle("close-chat-popup");
    };

    return (
        <div>
            <nav className="header">
                <Link to="/" className="site-title" style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>Mav Market</Link>
                <div className="dropdown" >
                    <i className="ggprofile"></i>
                    <div className="dropdownContent">
                        <a href="/managebusiness">Manage Business</a>
                        <a href="/managestudent">Manage Student</a>
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
            {<div className="content" style={{ height: "auto" }}>
                <div className="content-header">
                    <h2>Welcome, {user.uname}!</h2>
                </div>
                <div className="row1">
                    <div className="card">
                        <div className="club-row">
                            <div className="club-column">
                                <div className="club" style={{ background: "linear-gradient(to right, #deb7d4 , #edd1b4)" }}>
                                    <h3>Students</h3>
                                    <p>{countData.student}</p>
                                </div>
                            </div>
                            <div className="club-column">
                                <div className="club" style={{ background: "linear-gradient(to right, #deb7d4 , #edd1b4)" }}>
                                    <h3>Business Owners</h3>
                                    <p>{countData.business}</p>
                                </div>
                            </div>
                            <div className="club-column">
                                <div className="club" style={{ background: "linear-gradient(to right, #deb7d4 , #edd1b4)" }}>
                                    <h3>Clubs</h3>
                                    <p>{countData.club}</p>
                                </div>
                            </div>
                            <div className="club-column">
                                <div className="club" style={{ background: "linear-gradient(to right, #deb7d4 , #edd1b4)" }}>
                                    <h3>Schools</h3>
                                    <p>{countData.school}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row1">
                    <div className="column-left">
                        <h1>Population in Student Clubs</h1>
                        <BarChart width={500}
                            height={400}
                            barSize={30} data={countData.chart1}
                            layout="vertical"
                            margin={{
                                top: 5,
                                right: 5,
                                left: 5,
                                bottom: 5,
                            }}>
                            <Bar dataKey="value" fill="#dc4f31d4" label />
                            <XAxis type="number" hide />
                            <YAxis type="category" width={100} padding={{ left: 20 }} dataKey="name" />
                            <Tooltip />
                        </BarChart>
                        {/* {countData.chart1.map((item, index) => (
                            <div>
                                <p>{item.name}</p>
                                <div className="bargraph">
                                    <div className="bars" style={{ width: item.pct+'%', backgroundColor: colors[index % colors.length] }}>{item.pct}</div>
                                </div>
                            </div>
                        ))} */}
                    </div>
                    <div className="column-right">
                        <h1>Number of Students Per State</h1>
                        <BarChart width={600}
                            height={400}
                            barSize={30} data={countData.pie}
                            margin={{
                                top: 5,
                                right: 5,
                                left: 5,
                                bottom: 5,
                            }}>
                            <Bar dataKey="value" fill="#312bd1a8" label />
                            <XAxis dataKey="name" scale="point" />
                            <YAxis />
                            <Tooltip />
                        </BarChart>
                    </div>
                </div>
                <div className="row1">
                    <table>
                        <caption><h1>Business Details</h1></caption>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>City</th>
                                <th>State</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bussData.map((item, index) => (
                                <tr className="trb">
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone_number}</td>
                                    <td>{item.city}</td>
                                    <td>{item.state}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>}

            <button class="open-button" onclick={openStyle}>Chat</button>

            <div class={style} id="myForm">
                <form action="/action_page.php" class="form-container">
                    <h1>Chat</h1>

                    <label for="msg"><b>Message</b></label>
                    <textarea placeholder="Type message.." name="msg" required></textarea>

                    <button type="submit" class="btn">Send</button>
                    <button type="button" class="btn cancel" onclick={closeStyle}>Close</button>
                </form>
            </div>

            <Footer />
        </div >
    )
}
export default SuperAdmin;