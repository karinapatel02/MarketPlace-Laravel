import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/homestyle.css';
import '../../css/loginstyle.css';
import Footer from './footer';
import { axiosconn, userCon } from '../util/usercontext';

function AddProduct() {
    const { logout } = useContext(userCon);
    const navigate = useNavigate();
    const onlogout = (e) => {
        logout();
    };
    const uid = localStorage.getItem('uid');
    const role = localStorage.getItem('role');
    const [addProductForm, setFormData] = useState({
        uid: uid,
        name: '',
        category: '',
        description: '',
        price: '',
        stock: 0,
        image: ''
    });

    const onChange = (e) => {
        setFormData({
            ...addProductForm,
            [e.target.name]: e.target.value
        })
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
        setFormData({ ...addProductForm, image: base64 });
    };

    const addProduct = async (e) => {
        e.preventDefault();
        try {
            const ipdata = JSON.stringify(addProductForm);
            const loginToken = localStorage.getItem('token');
            if (loginToken) {
                const { data } = await axiosconn.post('addProduct', ipdata, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + loginToken
                    }
                });
                if (data.success) {
                    e.target.reset();
                    alert('You have successfully added the product!');
                    navigate("/products");
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
            <div className="content">
                <form className="add-product" onSubmit={addProduct}>
                    <div className="form-row">
                        <div className="form-labels">
                            Name:
                        </div>
                        <div className="form-inputs">
                            <input type="text" id="pname" name="name" placeholder="Name of Product" onChange={onChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-labels">
                            Category:
                        </div>
                        <div className="form-inputs">
                            <select id="category" name="category" onChange={onChange}>
                                <option defaultValue="0">Select Category</option>
                                <option defaultValue="food">Food</option>
                                <option defaultValue="clothes">Clothes</option>
                                <option defaultValue="furniture">Furtniture</option>
                                <option defaultValue="stationary">Stationary</option>
                                <option defaultValue="Electronics">Electronics</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-labels">
                            Description:
                        </div>
                        <div className="form-inputs">
                            <textarea name="description" placeholder="Description of Product" onChange={onChange} ></textarea>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-labels">
                            Price:
                        </div>
                        <div className="form-inputs">
                            <input type="number" id="price" name="price" min="0" defaultValue="0" step="0.01" placeholder="Price" onChange={onChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-labels">
                            Product Image:
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
                        <div className="form-labels">
                            Quantity:
                        </div>
                        <div className="form-inputs">
                            <input type="number" id="price" name="stock" defaultValue="0" placeholder="Quantity" onChange={onChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <button type="submit" className='submit'>Add Product</button>
                    </div>
                </form>
            </div>
            <Footer style={{ position: 'absolute' }} />
        </div >
    )
}
export default AddProduct;