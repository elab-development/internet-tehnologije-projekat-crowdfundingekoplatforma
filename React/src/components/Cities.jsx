import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Cities.css';
import NavBar from './NavBar';
import Footer from './Footer';
import City1 from '../assets/city1.jpg';
import City2 from '../assets/city2.jpg';
import City3 from '../assets/city3.jpg';
import City4 from '../assets/city4.jpg';
import City5 from '../assets/city5.jpg';

const Cities = () => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCityImage = (city) => {
        switch (city.name) {
            case "Beograd":
                return City1;
            case "Paraćin":
                return City2;
            case "Niš":
                return City3;
            case "Novi Sad":
                return City4;

            default:
                return City5;
        }
    }

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/cities');
                setCities(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch cities', error);
                setLoading(false);
            }
        };

        fetchCities();
    }, []);

    if (loading) {
        return (
            <div className='cities-container'>
                <NavBar />
                <div className="cities-content">
                    <h1>Our Cities</h1>
                    <div className="cities-list">
                        Loading...
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (cities.length === 0) {
        return (
            <div className='cities-container'>
                <NavBar />
                <div className="cities-content">
                    <h1>Our Cities</h1>
                    <div className="cities-list">
                        No cities available.
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className='cities-container'>
            <NavBar />
            <div className="cities-content">
                <h1>Our Cities</h1>
                <div className="cities-list">
                    {cities.map(city => (
                        <div key={city.id} className="city-card">
                            <img className="city-image" src={getCityImage(city)} alt={city.name} />
                            <div className="city-details">
                                <h3>{city.name}</h3>
                                <p>{city.region}</p>
                                <p>{city.country}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cities;