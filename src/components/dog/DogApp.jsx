import './DogApp.css'
import ErrorComponent from './ErrorComponent';
import ListDogsComponent from './ListDogsComponent';
import LoginComponent from "./LoginComponent";
import WelcomeComponent from "./WelcomeComponent";
import HeaderComponent from './HeaderComponent';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider, { useAuth } from './security/AuthContext';
import LogoutComponent from './LogoutComponent';
import DogComponent from './DogComponent';

function AuthenticatedRoute({ children }) {

    const authContext = useAuth()

    if (authContext.isAuthenticated)
        return children

    return <Navigate to="/" />
}

export default function DogApp() {

    return (
        <div className="DogApp">

            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />

                    <Routes>
                        <Route path='/' element={<LoginComponent />} />
                        <Route path='/login' element={<LoginComponent />} />

                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/dogs' element={
                            <AuthenticatedRoute>
                                <ListDogsComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/dog/:id' element={
                            <AuthenticatedRoute>
                                <DogComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent />
                            </AuthenticatedRoute>
                        } />

                        <Route path='*' element={<ErrorComponent />} />
                    </Routes>

                </BrowserRouter>
            </AuthProvider>
        </div >
    )
}