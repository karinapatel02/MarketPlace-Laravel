import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/chartstyle.css';
import '../../css/homestyle.css';
import '../../css/pagestyle.css';
import Footer from './footer';
import { axiosconn, userCon } from '../util/usercontext';

function ManageBusiness() {
    const { user, logout } = useContext(userCon);
    const onlogout = (e) => {
        logout();
    };
    const [bussData, setBussData] = useState([]);
    useEffect(() => {
        getBussData()
    }, []);
    const getBussData = async () => {
        const loginToken = localStorage.getItem('token');
        if (loginToken) {
            const { data } = await axiosconn.get('getBussUsers', {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json',
                }
            });
            if (data.success && data.data) {
                setBussData(data.data);
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
                getBussData();
            } else {
                alert(data.message);
                getBussData();
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
                    <caption><h1>Manage Business</h1></caption>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Action</th>
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
export default ManageBusiness;