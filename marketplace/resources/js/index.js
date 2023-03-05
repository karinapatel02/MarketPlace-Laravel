import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Navigate, Route, Routes, Outlet } from "react-router-dom";
import About from "./components/About";
import Ad from './components/Ad';
import AddAd from './components/addAd';
import AddProduct from './components/addProduct';
import Business from './components/business';
import BusinessDash from './components/business_dash';
import Cart from './components/Cart';
import Club from './components/Club';
import Contact from "./components/Contact";
import CreateClub from './components/createClub';
import EditBusiness from './components/editBusiness';
import EditProfile from './components/editProfile';
import Forgot from './components/forgot';
import Home from './components/Home';
import ListProducts from './components/ListProducts';
import ManageBusiness from './components/managebusiness';
import ManageStudent from './components/managestudent';
import NotFound from './components/NotFound';
import Order from './components/Order';
import OrderData from './components/OrderData';
import Product from './components/Product';
import Profile from './components/profile';
import Register from "./components/register";
import SchoolAdmin from './components/schooladmin';
import Service from "./components/Service";
import Login from "./components/signin";
import StudentDash from './components/student_dash';
import SuperAdmin from './components/superadmin';
import Unauthorized from './components/Unauthorized';
import user from './util/user';
import { UserProvider } from './util/usercontext';

const Index = () => {
    const PrivateOutlet = () => {

        return user.isLoggedIn() ? (
            <Outlet />
        ) : (
            <Navigate to="/login" replace />
        );
    };
    const StuOutlet = () => {

        return user.role == 'student' ? (
            <Outlet />
        ) : (
            <Navigate to="/Unauthorized" replace />
        );
    };
    const BussOutlet = () => {

        return user.role == 'business_owner' ? (
            <Outlet />
        ) : (
            <Navigate to="/Unauthorized" replace />
        );
    };
    const SchoolOutlet = () => {

        return user.role == 'school_admin' ? (
            <Outlet />
        ) : (
            <Navigate to="/Unauthorized" replace />
        );
    };
    const AdminOutlet = () => {

        return user.role == 'super_admin' || user.role == 'school_admin' ? (
            <Outlet />
        ) : (
            <Navigate to="/Unauthorized" replace />
        );
    };
    const SuperOutlet = () => {

        return user.role == 'super_admin' ? (
            <Outlet />
        ) : (
            <Navigate to="/Unauthorized" replace />
        );
    };
    const AdminBusOutlet = () => {

        return user.role != 'student' ? (
            <Outlet />
        ) : (
            <Navigate to="/Unauthorized" replace />
        );
    };
    return (
        <BrowserRouter>
            <UserProvider>
                <>
                    <div className="App" style={{ overflow: 'auto' }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/Home" element={<Home />} />
                            <Route path="/About" element={<About />} />
                            <Route path="/Service" element={<Service />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/forgot" element={<Forgot />} />
                            <Route path="/Unauthorized" element={<Unauthorized />} />
                            <Route element={<PrivateOutlet />}>
                                <Route path="/Product" element={<Product />} />
                                <Route path="/AddProduct" element={<AddProduct />} />
                                <Route path='/products' element={<ListProducts />} />
                                <Route element={<StuOutlet />}>
                                    <Route path="/Order" element={<Order />} />
                                    <Route path="/Club" element={<Club />} />
                                    <Route path="/createClub" element={<CreateClub />} />
                                    <Route path="/Cart" element={<Cart />} />
                                    <Route path="/student" element={<StudentDash />} />
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/editProfile" element={<EditProfile />} />
                                    <Route path='/orderData' element={<OrderData />} />
                                </Route>
                                <Route element={<BussOutlet />}>
                                    <Route path="/Ad" element={<Ad />} />
                                    <Route path="/business" element={<BusinessDash />} />
                                    <Route path="/businessProfile" element={<Business />} />
                                    <Route path='/editBusiness' element={<EditBusiness />} />
                                </Route>
                                <Route element={<SchoolOutlet />}>
                                    <Route path="/school" element={<SchoolAdmin />} />
                                </Route>
                                <Route element={<SuperOutlet />}>
                                    <Route path="/admin" element={<SuperAdmin />} />
                                </Route>
                                <Route element={<AdminOutlet />}>
                                    <Route path="/manageStudent" element={<ManageStudent />} />
                                    <Route path="/manageBusiness" element={<ManageBusiness />} />
                                </Route>
                                <Route element={<AdminBusOutlet />}>
                                    <Route path="/AddAd" element={<AddAd />} />
                                </Route>
                            </Route>
                        </Routes>
                    </div>
                </>
            </UserProvider>
        </BrowserRouter>
    );
}
export default Index;
ReactDOM.render(<Index />, document.getElementById('root'));
