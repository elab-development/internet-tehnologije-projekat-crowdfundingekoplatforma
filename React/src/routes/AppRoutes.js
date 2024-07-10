import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Welcome from '../components/Welcome';

const AppRoutes = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={
                        <PublicRoute>
                            <Welcome />
                        </PublicRoute>
                    } />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default AppRoutes;