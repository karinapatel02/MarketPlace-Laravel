import React, { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/homestyle.css';
import '../../css/loginstyle.css';
import Footer from './footer';
import { axiosconn, userCon } from '../util/usercontext';


function AddAd() {
    const { user, logout } = useContext(userCon);
    const navigate = useNavigate();
    const uid = localStorage.getItem('uid');
    const role = localStorage.getItem('role');
    const onlogout = (e) => {
        logout();
    };

    const [adForm, setFormData] = useState({
        uid: uid,
        name: '',
        content: '',
        image: ''
    });

    const onChange = (e) => {
        setFormData({
            ...adForm,
            [e.target.name]: e.target.value
        })
    }

    const createadd = async (e) => {
        e.preventDefault();
        console.log(adForm);
        try {
            const ipdata = JSON.stringify(adForm);
            const loginToken = localStorage.getItem('token');
            if (loginToken) {
                const { data } = await axiosconn.post('createadd', ipdata, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + loginToken
                    }
                });
                if (data.success) {
                    e.target.reset();
                    alert('You have successfully created Ad!');
                    navigate("/Ad");
                }
                else if (!data.success && data.message) {
                    alert(data.message);
                }
            }
        }
        catch (err) {
            alert('Server Error!');
        }

    }
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const addImg = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setFormData({ ...adForm, image: base64 });
    };

    return (
        <div>
            <nav className="header">
                <Link to="/" className="site-title" style={{ fontWeight: 'bold', color: 'white', fontSize: 30 }}>Mav Market</Link>
                <div className="dropdown" >
                    <i className="ggprofile"></i>
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
                <form className="add-product" onSubmit={createadd}>
                    <div className="form-row">
                        <div className="form-labels">
                            Advertisement Name:
                        </div>
                        <div className="form-inputs">
                            <input name="name" placeholder="Name of Ad" onChange={onChange} required></input>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-labels">
                            Description:
                        </div>
                        <div className="form-inputs">
                            <textarea name="content" placeholder="Description of Ad" onChange={onChange} required></textarea>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-labels">
                            Advertisement Image:
                        </div>
                        <div className="form-inputs">
                            <input
                                type="file"
                                label="Image"
                                name="image"
                                accept=".jpeg, .png, .jpg"
                                required
                                onChange={(e) => addImg(e)}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <button className='submit'>Upload Advertisement</button>
                    </div>
                </form>
            </div>
            <Footer style={{ position: 'absolute' }} />
        </div >
    )
}
export default AddAd;