import React from 'react';
import Footer from "./footer"
import Navbar from "./Navbar"

function About() {
    return (

        <div>
            <Navbar />
            <title>About Us | Mav Market</title>
            <div className="row">
                <div className="content" style={{ margin: "10em" }}>
                    <p style={{ fontSize: 30 }}>About Us</p> <br />
                    <p style={{ fontSize: 20 }}>
                        Mav Market is an online Marketplace created by students, for students. It is an avenue for students to be updated about the campus. It combines features like being able to buy and sell products, post contents, be updated about student clubs, and interact with businesses on campus. <br />
                    </p>
                    <p style={{ fontSize: 20 }}>
                        Consider the example of UTA: Students resort to Facebook Marketplace or Facebook groups buy or sell things. The businesses on campus like Starbucks, Chick-Fil-A, Markets etc. do not have a direct way to advertise their products. Joining clubs on campus is possible only via MavOrgs. The Mav Market is a one-stop solution. The plan is to provide all these services in one place.
                    </p>
                    <p style={{ fontSize: 20 }}>
                    The Arlington Eatery, located in The Commons on West Campus, is the newest addition to your campus dining experience. Whether our signature menu is produced in-house or produced by a local neighbor, the Eatery is full of flavor and action. Check back here for further updates and features throughout out the upcoming fall semester!
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About