import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/homestyle.css';
import '../../css/loginstyle.css';
import Footer from './footer';
import Navbar from './Navbar';
import { userCon } from '../util/usercontext';

function Login() {
    const { login, waitPeriod, logout } = useContext(userCon);
    // if (localStorage.getItem('uid')) {
    //     logout();
    // }
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const OnChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const loginUser = async (e) => {
        e.preventDefault();
        console.log(formData);
        const data = await login(formData);
        if (data.success) {
            e.target.reset();
            const role  = localStorage.getItem('role');
            if (role === 'student') {
                navigate("/student");
            } else if (role === 'business_owner') {
                navigate("/business");
            } else if (role === 'school_admin') {
                navigate("/school");
            } else {
                navigate("/admin");
            }
        }
        else if(!data.success && data.message){
            alert(data.message);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="row" align="center">
                <div className="login">
                    <p className="title" align="center">USER LOGIN</p>
                    <form onSubmit={loginUser}>
                        <input className="name" type="email" align="center" required placeholder="Email"
                            onChange={OnChange} style={{ marginLeft: "0em" }} name="email" />
                        <input className="password" type="password" align="center" required placeholder="Password"
                            onChange={OnChange} style={{ marginLeft: "0em" }} name="password" />
                        <input type="submit" disabled={waitPeriod} align="center" value="LOGIN" className="submit" style={{ marginLeft: "0em" }} />
                    </form>
                </div>
                <br></br>
                <br></br>
                <div align="center">
                    <Link className="submit forpass" align="center" to="/forgot">FORGOT PASSWORD</Link>
                    <Link className="submit reg" align="center" to="/register">REGISTER</Link>
                </div>
            </div>
            <Footer style={{ position: 'absolute' }} />
        </div >
    )
}
export default Login;