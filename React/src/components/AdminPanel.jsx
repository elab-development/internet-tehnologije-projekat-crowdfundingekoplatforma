import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Admin.css';
import NavBar from './NavBar';
import Footer from './Footer';
import { CiEdit } from "react-icons/ci";
import { MdCancel, MdDeleteForever } from "react-icons/md";
import { FaSave } from 'react-icons/fa';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [cities, setCities] = useState([]);
    const [projects, setProjects] = useState([]);
    const [activeSection, setActiveSection] = useState(null);
    const [editMode, setEditMode] = useState({ users: {}, cities: {}, projects: {} });
    const [newProject, setNewProject] = useState(null);
    const [newCity, setNewCity] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const userResponse = await axios.get('http://127.0.0.1:8000/api/users');
                const cityResponse = await axios.get('http://127.0.0.1:8000/api/cities');
                const projectResponse = await axios.get('http://127.0.0.1:8000/api/projects');
                setUsers(userResponse.data);
                setCities(cityResponse.data);
                setProjects(projectResponse.data);
            } catch (error) {
                console.error('Failed to fetch stats', error);
            }
        };

        fetchStats();
    }, []);

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    const handleDelete = async (type, id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/${type}/${id}`);
            if (type === 'users') {
                setUsers(users.filter(user => user.id !== id));
            } else if (type === 'projects') {
                setProjects(projects.filter(project => project.id !== id));
            } else if (type === 'cities') {
                setCities(cities.filter(city => city.id !== id));
            }
        } catch (error) {
            console.error(`Failed to delete ${type} with ID: ${id}`, error);
        }
    };

    const handleEditToggle = (type, id) => {
        setEditMode(prevState => ({
            ...prevState,
            [type]: {
                ...prevState[type],
                [id]: !prevState[type][id]
            }
        }));
    };

    const handleInputChange = (e, type, id) => {
        const { name, value } = e.target;
        if (type === 'users') {
            setUsers(users.map(user => user.id === id ? { ...user, [name]: value } : user));
        } else if (type === 'projects') {
            setProjects(projects.map(project => project.id === id ? { ...project, [name]: value } : project));
        } else if (type === 'cities') {
            setCities(cities.map(city => city.id === id ? { ...city, [name]: value } : city));
        }
    };

    const handleCityChange = (e, id) => {
        const { value } = e.target;
        setProjects(projects.map(project => project.id === id ? { ...project, city_id: value, city: { ...project.city, name: e.target.options[e.target.selectedIndex].innerText } } : project));
    };

    const handleSave = async (type, item) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/${type}/${item.id}`, item);
            handleEditToggle(type, item.id);
        } catch (error) {
            console.error(`Failed to update ${type}`, error);
        }
    };

    const handleAddNewProject = () => {
        setNewProject({
            name: '',
            description: '',
            city_id: cities.length > 0 ? cities[0].id : '',
        });
    };

    const handleSaveNewProject = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/projects', newProject);
            setProjects([...projects, response.data]);
            setNewProject(null);
        } catch (error) {
            console.error('Failed to add new project', error);
        }
    };

    const handleNewProjectInputChange = (e) => {
        const { name, value } = e.target;
        setNewProject(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddNewCity = () => {
        setNewCity({
            name: '',
            region: '',
            country: '',
            latitude: 43,
            longitude: 23,
        });
    };

    const handleSaveNewCity = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/cities', newCity);
            setCities([...cities, response.data]);
            setNewCity(null);
        } catch (error) {
            console.error('Failed to add new city', error);
        }
    };

    const handleNewCityInputChange = (e) => {
        const { name, value } = e.target;
        setNewCity((prevCity) => ({
            ...prevCity,
            [name]: value
        }));
    };

    return (
        <div className='admin-container'>
            <NavBar />
            <div className="admin-content">
                <h1>Admin Panel</h1>
                <div className="stats">
                    <div className="stat" onClick={() => toggleSection('users')}>
                        <h3>Users</h3>
                        <p>{users.length}</p>
                    </div>
                    <div className="stat" onClick={() => toggleSection('projects')}>
                        <h3>Projects</h3>
                        <p>{projects.length}</p>
                    </div>
                    <div className="stat" onClick={() => toggleSection('cities')}>
                        <h3>Cities</h3>
                        <p>{cities.length}</p>
                    </div>
                </div>

                {activeSection === 'users' && (
                    <div className="manage-section">
                        <h2>Manage Users</h2>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>
                                            {editMode.users[user.id] ? (
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={user.name}
                                                    onChange={(e) => handleInputChange(e, 'users', user.id)}
                                                />
                                            ) : (
                                                user.name
                                            )}
                                        </td>
                                        <td>
                                            {editMode.users[user.id] ? (
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={user.email}
                                                    onChange={(e) => handleInputChange(e, 'users', user.id)}
                                                />
                                            ) : (
                                                user.email
                                            )}
                                        </td>
                                        <td>
                                            {editMode.users[user.id] ? (
                                                <>
                                                    <button type='button' className='save-btn' onClick={() => handleSave('users', user)}><FaSave /></button>
                                                    <button type='button' className='cancel-btn' onClick={() => handleEditToggle('users', user.id)}><MdCancel /></button>
                                                </>
                                            ) : (
                                                <>
                                                    <button type='button' className='edit-btn' onClick={() => handleEditToggle('users', user.id)}><CiEdit /></button>
                                                    <button type='button' className='delete-btn' onClick={() => handleDelete('users', user.id)}><MdDeleteForever /></button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeSection === 'projects' && (
                    <div className="manage-section">
                        <h2>Manage Projects</h2>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>City</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map(project => (
                                    <tr key={project.id}>
                                        <td>{project.id}</td>
                                        <td>
                                            {editMode.projects[project.id] ? (
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={project.name}
                                                    onChange={(e) => handleInputChange(e, 'projects', project.id)}
                                                />
                                            ) : (
                                                project.name
                                            )}
                                        </td>
                                        <td>
                                            {editMode.projects[project.id] ? (
                                                <input
                                                    type="text"
                                                    name="description"
                                                    value={project.description}
                                                    onChange={(e) => handleInputChange(e, 'projects', project.id)}
                                                />
                                            ) : (
                                                project.description
                                            )}
                                        </td>
                                        <td>
                                            {editMode.projects[project.id] ? (
                                                <select
                                                    name="city_id"
                                                    value={project.city_id}
                                                    onChange={(e) => handleCityChange(e, project.id)}
                                                >
                                                    {cities.map(city => (
                                                        <option key={city.id} value={city.id}>
                                                            {city.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                project.city.name
                                            )}
                                        </td>
                                        <td>
                                            {editMode.projects[project.id] ? (
                                                <>
                                                    <button type='button' className='save-btn' onClick={() => handleSave('projects', project)}><FaSave /></button>
                                                    <button type='button' className='cancel-btn' onClick={() => handleEditToggle('projects', project.id)}><MdCancel /></button>
                                                </>
                                            ) : (
                                                <>
                                                    <button type='button' className='edit-btn' onClick={() => handleEditToggle('projects', project.id)}><CiEdit /></button>
                                                    <button type='button' className='delete-btn' onClick={() => handleDelete('projects', project.id)}><MdDeleteForever /></button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {newProject && (
                                    <tr>
                                        <td>New</td>
                                        <td>
                                            <input
                                                type="text"
                                                name="name"
                                                value={newProject.name}
                                                onChange={handleNewProjectInputChange}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="description"
                                                value={newProject.description}
                                                onChange={handleNewProjectInputChange}
                                            />
                                        </td>
                                        <td>
                                            <select
                                                name="city_id"
                                                value={newProject.city_id}
                                                onChange={handleNewProjectInputChange}
                                            >
                                                {cities.map(city => (
                                                    <option key={city.id} value={city.id}>
                                                        {city.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <button type='button' className='save-btn' onClick={handleSaveNewProject}><FaSave /></button>
                                            <button type='button' className='cancel-btn' onClick={() => setNewProject(null)}><MdCancel /></button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <button type='button' className='add-new-btn' onClick={handleAddNewProject}>Add New Project</button>
                    </div>
                )}

                {activeSection === 'cities' && (
                    <div className="manage-section">
                        <h2>Manage Cities</h2>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Region</th>
                                    <th>Country</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cities.map(city => (
                                    <tr key={city.id}>
                                        <td>{city.id}</td>
                                        <td>
                                            {editMode.cities[city.id] ? (
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={city.name}
                                                    onChange={(e) => handleInputChange(e, 'cities', city.id)}
                                                />
                                            ) : (
                                                city.name
                                            )}
                                        </td>
                                        <td>
                                            {editMode.cities[city.id] ? (
                                                <input
                                                    type="text"
                                                    name="region"
                                                    value={city.region}
                                                    onChange={(e) => handleInputChange(e, 'cities', city.id)}
                                                />
                                            ) : (
                                                city.region
                                            )}
                                        </td>
                                        <td>
                                            {editMode.cities[city.id] ? (
                                                <input
                                                    type="text"
                                                    name="country"
                                                    value={city.country}
                                                    onChange={(e) => handleInputChange(e, 'cities', city.id)}
                                                />
                                            ) : (
                                                city.country
                                            )}
                                        </td>
                                        <td>
                                            {editMode.cities[city.id] ? (
                                                <>
                                                    <button type='button' className='save-btn' onClick={() => handleSave('cities', city)}><FaSave /></button>
                                                    <button type='button' className='cancel-btn' onClick={() => handleEditToggle('cities', city.id)}><MdCancel /></button>
                                                </>
                                            ) : (
                                                <>
                                                    <button type='button' className='edit-btn' onClick={() => handleEditToggle('cities', city.id)}><CiEdit /></button>
                                                    <button type='button' className='delete-btn' onClick={() => handleDelete('cities', city.id)}><MdDeleteForever /></button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {newCity && (
                                    <tr>
                                        <td>New</td>
                                        <td>
                                            <input
                                                type="text"
                                                name="name"
                                                value={newCity.name}
                                                onChange={handleNewCityInputChange}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="region"
                                                value={newCity.region}
                                                onChange={handleNewCityInputChange}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                name="country"
                                                value={newCity.country}
                                                onChange={handleNewCityInputChange}
                                            />
                                        </td>
                                        <td>
                                            <button type='button' className='save-btn' onClick={handleSaveNewCity}><FaSave /></button>
                                            <button type='button' className='cancel-btn' onClick={() => setNewCity(null)}><MdCancel /></button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <button type='button' className='add-new-btn' onClick={handleAddNewCity}>Add New City</button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default AdminPanel;