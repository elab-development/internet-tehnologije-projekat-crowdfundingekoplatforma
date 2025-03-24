import '../styles/About.css';
import NavBar from './NavBar';
import Footer from './Footer';
import ImgMJ from '../assets/mj.png';
import ImgMV from '../assets/mv.jpg';

const About = () => {
    return (
        <div className="about-container">
            <NavBar />
            <div className="about-content">
                <h1>About Us</h1>
                <p>
                    Welcome to our platform! We wish to empower individuals to make a positive impact on the environment by joining and supporting various eco-projects in the cities where we operate. Through our subscription-based model, we channel a portion of the funds we receive from our users directly to these ecological initiatives.
                </p>
                <h2>Our Mission</h2>
                <p>
                    Our mission is to create a sustainable future by funding and supporting environmental projects through a community-driven approach. We believe that collective action and crowdfunding can drive significant positive change for our planet.
                </p>
                <h2>How It Works</h2>
                <p>
                    Users subscribe to our platform, and a portion of their subscription fee is allocated to various ecological projects. These projects are carefully selected to ensure they have a meaningful impact on the environment. By joining our platform, users can track their contributions and see the tangible results of their support.
                </p>
                <h2>Our Team</h2>
                <p>
                    We are a passionate team dedicated to making the world a better place.
                </p>
                <div className="team">
                    <div className="team-member">
                        <img src={ImgMJ} alt="Team Member" />
                        <h3>Mario Jović</h3>
                        <p>Founder & CEO</p>
                    </div>
                    <div className="team-member">
                        <img src={ImgMV} alt="Team Member" />
                        <h3>Matija Vukićević</h3>
                        <p>Chief Technology Officer</p>
                    </div>
                </div>
                <h2>Contact Us</h2>
                <p>
                    We would love to hear from you! If you have any questions, feedback, or suggestions, please feel free to reach out to us.
                </p>
                <p>Email: <a href="mailto:contact@ecoprojects.com">contact@ecoprojects.com</a></p>
            </div>
            <Footer />
        </div>
    );
};

export default About;