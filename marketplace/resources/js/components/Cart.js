import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Route, Routes, useNavigate, Link } from "react-router-dom";
import Footer from "./footer";
import { axiosconn, userCon } from "../util/usercontext";

function Cart() {
    const div = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const { user, logout } = useContext(userCon);
    const uid = localStorage.getItem('uid');
    const role = localStorage.getItem('role');
    const navigate = useNavigate();
    let tot = 0
    const onlogout = (e) => {
        logout();
    };
    const [orderData, setOrderData] = useState([]);

    const cantidad = useMemo(() => {
        return new Array(orderData.length).fill(1);
    }, [orderData]);

    const total = useMemo(() => {
        return orderData.reduce((sum, orderData, index) => {
            return sum + parseFloat(orderData.total) * cantidad[index];
        }, 0);
    }, [cantidad, orderData]);

    const orderTotal = async (e) => {
        e.preventDefault();
        const loginToken = localStorage.getItem('token');
        if (loginToken) {
            const ipdata = JSON.stringify({ uid: uid, total: tot })
            const { data } = await axiosconn.post('orderTotal', ipdata, {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json',
                }
            });
            if (data.success) {
                // e.target.reset();
                alert("Order is successfully Placed!");
                navigate('/order');
            } else {
                alert(data.message)
            }
        }
    }

    const deleteProductCart = async (pid) => {
        const loginToken = localStorage.getItem('token');
        if (loginToken) {
            const ipdata = JSON.stringify({ pid: pid, uid: uid })
            const { data } = await axiosconn.post('deleteProductCart', ipdata, {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json',
                }
            });
            if (data.success) {
                // e.target.reset();
                alert("Product is Deleted Successfully!");
                window.location.href = window.location.href;
            } else {
                alert(data.message)
            }
        }
    }

    useEffect((i) => {
        getOrder()
    }, []);
    const getOrder = async () => {
        const loginToken = localStorage.getItem('token');
        let allData = [];
        if (loginToken) {
            const ipdata = JSON.stringify({ uid: uid })
            const { data } = await axiosconn.post('getOrder', ipdata, {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json',
                }
            }).then(function (response) {
                const res = response.data;
                if (res.success && res.data) {
                    allData = res.data;
                    setOrderData(allData)
                }
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
            <div className="content row" style={{ overflowX: 'auto' }}>
                {/* <form className="cart"> */}
                <table>
                    <caption><h1>Cart</h1></caption>
                    <tr>
                        <th>No.</th>
                        <th colSpan="2">Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                    {orderData.map((item, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td><img src={item.image} alt="cartoreo" height="150" width="150" /></td>
                            <td>{item.productname}</td>
                            <td>${item.productprice}</td>
                            <td>{item.quantity}</td>
                            <td>${item.productprice * item.quantity}</td>
                            <td><button onClick={() => deleteProductCart(item.pid)} className='submit'>Remove</button></td>
                        </tr>
                    ))}
                    {orderData.map((item) => (
                        <div style={{ opacity: '0' }}>
                            <>
                                {tot = tot + item.productprice * item.quantity}
                            </>
                        </div>
                    ))}
                    <tr>
                        <td colspan="5"> Grand Total: </td>
                        <td>${tot.toFixed(2)}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td colSpan="7"><button onClick={orderTotal} className='submit'>Buy Now</button></td>
                    </tr>
                </table>
                {/* </form> */}
            </div>
            <Footer />
        </div>
    )
}

export default Cart