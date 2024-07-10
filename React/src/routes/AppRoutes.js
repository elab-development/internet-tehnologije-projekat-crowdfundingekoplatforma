import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Welcome from '../components/Welcome';
import Home from '../components/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import ForgotPassword from '../components/ForgotPassword';
import ResetPassword from '../components/ResetPassword';
import Projects from '../components/Projects';
import Cities from '../components/Cities';
import About from '../components/About';
import Profile from '../components/Profile';
import AdminPanel from '../components/AdminPanel';
import Subscribe from '../components/Subscribe';

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
                    <Route path="/login" element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    } />
                    <Route path="/register" element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    } />
                    <Route path="/forgot-password" element={
                        <PublicRoute>
                            <ForgotPassword />
                        </PublicRoute>
                    } />
                    <Route path="/reset-password/:token" element={
                        <PublicRoute>
                            <ResetPassword />
                        </PublicRoute>
                    } />
                    <Route path="/home" element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    } />
                    <Route path="/projects" element={
                        <PrivateRoute>
                            <Projects />
                        </PrivateRoute>
                    } />
                    <Route path="/cities" element={
                        <PrivateRoute>
                            <Cities />
                        </PrivateRoute>
                    } />
                    <Route path="/profile" element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    } />
                    <Route path="/admin" element={
                        <PrivateRoute>
                            <AdminPanel />
                        </PrivateRoute>
                    } />
                    <Route path="/subscribe" element={
                        <PrivateRoute>
                            <Subscribe />
                        </PrivateRoute>
                    } />
                    <Route path="/about" element={<About />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default AppRoutes;