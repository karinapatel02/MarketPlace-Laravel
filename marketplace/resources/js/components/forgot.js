import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/homestyle.css'
import Footer from './footer';
import Navbar from './Navbar';
import { userCon } from '../util/usercontext';

function Forgot() {
    const navigate = useNavigate();
    const { updatePassword } = useContext(userCon);
    const [updateForm, setFormData] = useState({
        email: '',
        password: ''
    });

    const onChange = (e) => {
        setFormData({
            ...updateForm,
            [e.target.name]: e.target.value
        })
    }

    const update = async (e) => {
        e.preventDefault();
        console.log(updateForm);
        const data = await updatePassword(updateForm);
        if (data.success) {
            e.target.reset();
            alert('You have successfully updated.');
            navigate("/login");
        }
        else if (!data.success && data.message) {
            alert(data.message);
        }

    }
    return (
        <div>
            <Navbar />
            <div className="row" align="center">
                <div className="login">
                    <p className="title" align="center">RESET PASSWORD</p>
                    <form onSubmit={update}>
                        <input className="name" type="email" align="center" required placeholder="Email"
                            onChange={onChange} style={{ marginLeft: "0em" }} name="email" />
                        <input className="newpassword" type="password" align="center" required placeholder="Password"
                            onChange={onChange} style={{ marginLeft: "0em" }} name="password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"/>
                        <input type="submit" align="center" value="RESET" className="submit" style={{ marginLeft: "0em" }} />
                    </form>
                </div>
            </div>
            <Footer style={{ position: 'absolute' }} />
        </div>
    )
}
export default Forgot;