import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/homestyle.css';
import '../../css/loginstyle.css';
import Footer from './footer';
import { axiosconn, userCon } from '../util/usercontext';

function CreateClub() {
    const navigate = useNavigate();
    const uid = localStorage.getItem('uid');
    const role = localStorage.getItem('role');
    const { user, logout } = useContext(userCon);
    const [clubForm, setFormData] = useState({
        uid: uid,
        name: '',
        description: '',
    });

    const onChange = (e) => {
        setFormData({
            ...clubForm,
            [e.target.name]: e.target.value
        })
    }

    const createclub = async (e) => {
        e.preventDefault();
        console.log(clubForm);
        try {
            const loginToken = localStorage.getItem('token');
        if (loginToken) {
            const ipdata = JSON.stringify(clubForm);
            const loginToken = localStorage.getItem('token');
            if (loginToken) {
                const { data } = await axiosconn.post('createClub', ipdata, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + loginToken,
                    }
                });
                if (data.success) {
                    e.target.reset();
                    alert('You have successfully created club.');
                    navigate("/profile");
                }
                else if (!data.success && data.message) {
                    alert(data.message);
                }
            }
        }
        }
        catch (err) {
            alert('Server Error!');
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
                <form className="add-product" onSubmit={createclub}>
                    <div className="form-row">
                        <div className="form-labels">
                            Club Name:
                        </div>
                        <div className="form-inputs">
                            <input type="name" name="name" placeholder="Name of the Club" onChange={onChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-labels">
                            Description:
                        </div>
                        <div className="form-inputs">
                            <textarea name="description" placeholder="Enter A Suitable Description..." onChange={onChange}></textarea>
                        </div>
                    </div>
                    <div className="form-row">
                        <button className='submit'>Create Club</button>
                    </div>
                </form>
            </div>
            <Footer style={{ position: 'absolute' }} />
        </div >
    )
}
export default CreateClub;