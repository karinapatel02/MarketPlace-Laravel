import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Footer from "./footer";
import { axiosconn, userCon } from "../util/usercontext";
import NotFound from './NotFound';

function ListProducts() {
    const { logout } = useContext(userCon);
    const navigate = useNavigate();
    const userId = localStorage.getItem('uid');
    const role = localStorage.getItem('role');
    const onlogout = (e) => {
        logout();
    };
    const [formData, setFormData] = useState({
        uid: userId
    });
    const [productData, setProuctData] = useState([]);
    useEffect(() => {
        getProduct()
    }, []);

    const deleteProduct = async (prodId) => {
        const loginToken = localStorage.getItem('token');
        if (loginToken) {
            const ipdata = JSON.stringify({ pid: prodId });
            const { data } = await axiosconn.post('deleteProduct', ipdata, {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json',
                }
            });
            if (data.success) {
                alert(data.message);
                window.location.href = window.location.href;
            } else {
                alert(data.message);
            }
        }
    }
    const getProduct = async () => {
        const loginToken = localStorage.getItem('token');
        let allData = [];
        if (loginToken) {
            await axiosconn.get('getAllProducts', {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                }
            }).then(function (response) {
                const res = response.data;
                if (res.success && res.data) {
                    allData = res.data;
                }
            }).catch(function (error) {
                console.log(error);
            });
            const ipdata = JSON.stringify(formData);
            await axiosconn.post('getProdById', ipdata, {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json',
                }
            }).then(function (response) {
                const res = response.data;
                let result = [];
                if (res.success && res.data) {
                    result = res.data.map((item) => item.uid);
                }
                let final = [];
                allData.forEach(item => {
                    let d = {};
                    Object.assign(d, item);
                    d['currUser'] = false;

                    if (result.includes(d.uid) > 0 || role == 'super_admin' || role == 'school_admin') {
                        d['currUser'] = true;
                    }
                    final.push(d);
                });
                setProuctData(final);
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
                    {role == 'business_owner' && <div className="dropdownContent">
                        <a href="/businessprofile">Profile</a>
                        <a href="/products">Products</a>
                        <a href="/addproduct">Add Product</a>
                        <a href="/addad">Add Ad</a>
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
                    <caption><h1>Product Details</h1></caption>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Quantity</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productData.length < 1 && <NotFound />}
                        {productData.map((item, index) => (
                            <tr className="trb">
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td><img src={item.image} alt="" height="150" width="150" /></td>
                                <td>{item.stock}</td>
                                <td>{item.description}</td>
                                <td><button onClick={() => deleteProduct(item.pid)} disabled={!item.currUser} className='submit'>Delete Product</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    )
}

export default ListProducts;