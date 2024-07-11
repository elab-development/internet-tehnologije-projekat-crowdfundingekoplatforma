import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../styles/Projects.css';
import AuthContext from '../contexts/AuthContext';
import NavBar from './NavBar';
import OneProject from './OneProject';
import Pagination from './Pagination';
import Footer from './Footer';

const Projects = () => {
    const { user } = useContext(AuthContext);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc');
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [savedInitialProjects, setSavedInitialProjects] = useState([]);
    const projectsPerPage = 5;

    useEffect(() => {
        
        if (savedInitialProjects.length === 0) {
            fetchProjects();
        }
        if (cities.length === 0) {
            fetchCities();
        }
        
        currentProjects.forEach(pelement => {
            document.getElementById(`join-btn-${pelement.id}`).style.display = "flex";
            document.getElementById(`leave-btn-${pelement.id}`).style.display = "none";
            (pelement.users).forEach(uelement => {
                if (uelement.id === user.id) {
                    document.getElementById(`join-btn-${pelement.id}`).style.display = "none";
                    document.getElementById(`leave-btn-${pelement.id}`).style.display = "flex";
                }
            })
        })
        
    }, );

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/projects');
            setProjects(response.data);
            setLoading(false);
            setSavedInitialProjects(response.data);
        } catch (error) {
            console.error('Failed to fetch projects', error);
            setLoading(false);
        }
    };

    const fetchCities = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/cities');
            setCities(response.data);
        } catch (error) {
            console.error('Failed to fetch cities', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSort = (order) => {
        setSortOrder(order);
        const sortedProjects = [...projects].sort((a, b) => {
            if (order === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
        setProjects(sortedProjects);
    };

    const handleSortChange = (e) => {
        handleSort(e.target.value);
    };

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
        if (e.target.value !== "") {
            setProjects(savedInitialProjects.filter(project => project.city.name === e.target.value));
        } else {
            setProjects(savedInitialProjects);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        const filteredProjects = savedInitialProjects.filter(project => project.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setProjects(filteredProjects);
    };

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    if (loading) {
        return (
            <div className='projects-container'>
                <NavBar />
                <div className="projects-content">
                    <h1>Available Projects</h1>
                    <div className="projects-list">
                        Loading...
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className='projects-container'>
            <NavBar />
            <div className="projects-content">
                <h1>Available Projects</h1>
                <div className="filter-sort-controls">
                    <div className="sort-controls">
                        <label htmlFor="sortOrder">Sort by:</label>
                        <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
                            <option value="asc">A-Z</option>
                            <option value="desc">Z-A</option>
                        </select>
                    </div>
                    <div className="city-controls">
                        <label htmlFor="cityFilter">Filter by city:</label>
                        <select id="cityFilter" value={selectedCity} onChange={handleCityChange}>
                            <option value="">All</option>
                            {cities.map(city => (
                                <option key={city.id} value={city.name}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='search-controls'>
                        <input
                                id="search-box"
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Search projects"
                            />
                    </div>
                </div>
                <div className="projects-list">
                    {currentProjects.map(project => (
                        <OneProject key={project.id} project={project} />
                    ))}
                </div>
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                />
            </div>
            <Footer />
        </div>
    );
};

export default Projects;