import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CreatePossession from './pages/CreatePossessionPage';
import HomePage from './pages/HomePage';
import NavBar from './pages/Navbar';
import NotFound from './pages/NotFound';
import PatrimoinePage from './pages/Patrimoine';
import PossessionList from './pages/Possessions';
import UpdatePossession from './pages/UpdatePossessionPage';

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/possession" element={<PossessionList />} />
                <Route path="/possession/create" element={<CreatePossession />} />
                <Route path="/patrimoine" element={<PatrimoinePage />} />
                <Route path="/possession/:libelle/update" element={<UpdatePossession />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
