import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../styles/Home.css';
import AuthContext from '../contexts/AuthContext';
import NavBar from './NavBar';
import OneProject from './OneProject';
import Footer from './Footer';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/my-projects');
                setProjects(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch projects', error);
                setLoading(false);
            }
        };

        if (user) {
            fetchProjects();
        }
    }, [user]);

    if (loading) {
        return (
            <div className='home-container'>
                <NavBar />
                <div className="home-content">
                    <h1>Welcome to the Eco Platform</h1>
                    <p>Find and join projects to help the environment.</p>
                    <h2>Your Joined Projects</h2>
                    <div className="joined-projects projects-list">
                        Loading...
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className='home-container'>
                <NavBar />
                <div className="home-content">
                    <h1>Welcome to the Eco Platform</h1>
                    <p>Find and join projects to help the environment.</p>
                    <h2>Your Joined Projects</h2>
                    <div className="joined-projects projects-list">
                        You haven't joined any projects yet.
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className='home-container'>
            <NavBar />
            <div className="home-content">
                <h1>Welcome to the Eco Platform</h1>
                <p>Find and join projects to help the environment.</p>
                <h2>Your Joined Projects</h2>
                <div className="joined-projects projects-list">
                    {projects.map(project => (
                        <OneProject key={project.id} project={project} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home