import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosconn, userCon, UserProvider } from "../util/usercontext";
import Footer from './footer';


function EditBusiness() {

    const userId = localStorage.getItem('uid');
    const { logout } = useContext(userCon);
    const navigate = useNavigate();
    const [updateForm, setFormData] = useState({
        uid: localStorage.getItem('uid'),
        fname: localStorage.getItem('fname'),
        lname: localStorage.getItem('lname'),
        uname: localStorage.getItem('username'),
        email: localStorage.getItem('email'),
        phone: localStorage.getItem('phone_number'),
        city: '',
        state: '',
    });
    const [uID, setuID] = useState({
        uid: userId
    });

    const getDetails = async () => {
        const loginToken = localStorage.getItem('token');
        const uid = JSON.stringify(uID);
        let profile = [];
        if (loginToken) {
            await axiosconn.post('getBusinessProfile', uid, {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json',
                }
            }).then(function (response) {
                const res = response.data;
                if (res.success && res.data) {
                    profile = res.data[0];
                    setProfile(res.data[0]);
                    setFormData({
                        ...updateForm,
                        city: Profile.city,
                        state: Profile.state
                    })
                    console.log(Profile);
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    const [Profile, setProfile] = useState([]);
    useEffect(() => {
        getDetails();
    }, []);

    const onChange = (e) => {
        setFormData({
            ...updateForm,
            [e.target.name]: e.target.value
        })
    }

    const editprofile = async (e) => {
        e.preventDefault();
        console.log(updateForm);
        const loginToken = localStorage.getItem('token');
        if (loginToken) {
            try {
                const ipdata = JSON.stringify(updateForm);
                const loginToken = localStorage.getItem('token');
                if (loginToken) {
                    const { data } = await axiosconn.post('editBusinessProfile', ipdata, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + loginToken
                        }
                    });
                    if (data.success) {
                        // e.target.reset();
                        alert('Details Updated Successfully');
                        navigate("/businessProfile");
                    }
                    else if (!data.success && data.message) {
                        alert(data.message);
                    }
                }
            }
            catch (err) {
                console.log(err);
                alert('Server Error!');
            }
        }
    }

    const deleteprofile = async (e) => {
        e.preventDefault();
        const loginToken = localStorage.getItem('token');
        if (loginToken) {
            const uid = JSON.stringify(uID);
            const { data } = await axiosconn.post('deleteProfile', uid, {
                headers: {
                    'Authorization': 'Bearer ' + loginToken,
                    'Content-Type': 'application/json',
                }
            });
            if (data.success) {
                alert(data.message);
                navigate("/login");
            } else {
                alert(data.message);
            }
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
                    <div className="dropdownContent">
                        <a href="/business">DashBoard</a>
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
            <div className="content row">
                <form className="add-product" onSubmit={editprofile}>
                    <div className="form-row">
                        <div className="form-labels">
                            First Name:
                        </div>
                        <div className="form-inputs">
                            <input type="text" id="fname" name="fname" value={updateForm.fname} onChange={onChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-labels">
                            Last Name:
                        </div>
                        <div className="form-inputs">
                            <input type="text" id="lname" name="lname" value={updateForm.lname} onChange={onChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-labels">
                            Username:
                        </div>
                        <div className="form-inputs">
                            <input type="text" id="uname" name="uname" value={updateForm.uname} onChange={onChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-labels">
                            Email:
                        </div>
                        <div className="form-inputs">
                            <input type="text" id="email" name="email" value={updateForm.email} onChange={onChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-labels">
                            Phone Number:
                        </div>
                        <div className="form-inputs">
                            <input type="text" id="phone" name="phone" value={updateForm.phone} onChange={onChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-labels">
                            City:
                        </div>
                        <div className="form-inputs">
                            <input type="text" id="city" name="city" value={updateForm.city} onChange={onChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-labels">
                            State:
                        </div>
                        <div className="form-inputs">
                            <input type="text" id="state" name="state" value={updateForm.state} onChange={onChange} />
                        </div>
                    </div>
                    <div align="center">
                        <button className='submit' style={{marginRight: "5em"}} onClick={editprofile}>Edit Profile</button>
                        <button className='delete' style={{marginRight: "10em"}} onClick={deleteprofile}>Delete Profile</button>
                    </div>
                </form>
            </div>
            <Footer style={{ position: 'absolute' }} />
        </div>
    )
}

export default EditBusiness;