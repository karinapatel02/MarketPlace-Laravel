import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/homestyle.css';
import '../../css/pagestyle.css';
import '../../css/chartstyle.css';
import Footer from './footer';
import { axiosconn, userCon } from '../util/usercontext';

function ManageStudent() {
    const { user, logout } = useContext(userCon);
    const onlogout = (e) => {
        logout();
    };
    const [stuData, setStuData] = useState([]);
    useEffect(() => {
        getStuData()
    }, []);
    const getStuData = async () => {
        const loginToken = localStorage.getItem('token');
        if (loginToken) {
            const { data } = await axiosconn.get('getStuUsers', {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json',
                }
            });
            if (data.success && data.data) {
                setStuData(data.data);
            }
        }
    }
    const deleteRow = async (id) => {
        const loginToken = localStorage.getItem('token');
        if (loginToken) {
            const ipdata = JSON.stringify({ uid: id });
            const { data } = await axiosconn.post('delUser', ipdata, {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json',
                }
            });
            if (data.success) {
                alert("Data Deleted Successfully");
                getStuData();
            } else {
                alert(data.message);
                getStuData();
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
            <div className="row content">
                <table>
                    <caption><h1>Manage Student</h1></caption>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Major</th>
                            <th>School</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stuData.map((item, index) => (
                            <tr className="trb">
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone_number}</td>
                                <td>{item.city}</td>
                                <td>{item.state}</td>
                                <td>{item.major}</td>
                                <td>{item.school}</td>
                                <td><button align="center" onClick={() => deleteRow(item.uid)}>REMOVE</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div >
    )
}
export default ManageStudent;