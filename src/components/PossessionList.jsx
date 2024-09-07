import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { FaEdit, FaTimesCircle, FaTrash } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

const calculateCurrentValue = (possession) => {
    const startDate = new Date(possession.dateDebut);
    const yearsDifference = (new Date() - startDate) / (365 * 24 * 60 * 60 * 1000);
    const amortissement = possession.valeur * (possession.taux / 100) * yearsDifference;
    return possession.valeur - amortissement;
};

const PossessionList = () => {
    const [possessionsData, setPossessionsData] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const apiUrl = import.meta.env.VITE_APP_API_URL || 'https://patrimoine-economique-backend.onrender.com';

    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/possession`);
            setPossessionsData(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [location.search]);

    const handleEditPossession = (libelle) => {
        navigate(`/possession/${libelle}/update`);
    };

    const handleClosePossession = async (libelle) => {
        try {
            await axios.put(`${apiUrl}/api/possession/${libelle}/close`);
            fetchData();
        } catch (error) {
            console.error('Erreur lors de la clôture de la possession :', error);
        }
    };

    const handleDelete = async (libelle) => {
        try {
            await axios.delete(`${apiUrl}/api/possession/${libelle}`);
            fetchData();
        } catch (error) {
            console.error('Erreur lors de la suppression de la possession:', error.message);
        }
    };

    const handleCreatePossession = () => {
        navigate('/possession/create');
    };

    return (
        <Container className="my-5">
            <div className="text-center" style={{ width: '100%' }}>
                <h2 className="mb-5">Les Listes des Patrimoines</h2>
                <Table striped bordered hover responsive className="mx-auto" style={{ maxWidth: '100%' }}>
                    <thead>
                        <tr>
                            <th>Libellé</th>
                            <th>Valeur</th>
                            <th>Date de début</th>
                            <th>Date de fin</th>
                            <th>Taux d'Amortissement</th>
                            <th>Valeur Actuelle</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {possessionsData.map((possession, index) => (
                            <tr key={index}>
                                <td>{possession.libelle}</td>
                                <td>{possession.valeur}</td>
                                <td>{possession.dateDebut}</td>
                                <td>{possession.dateFin || 'N/A'}</td>
                                <td>{possession.taux}%</td>
                                <td>{calculateCurrentValue(possession).toFixed(0)}</td>
                                <td>
                                    <FaEdit
                                        style={{ color: 'orange', cursor: 'pointer', marginRight: '10px' }}
                                        onClick={() => handleEditPossession(possession.libelle)}
                                    />
                                    <FaTimesCircle
                                        style={{ color: 'red', cursor: 'pointer', marginRight: '10px' }}
                                        onClick={() => handleClosePossession(possession.libelle)}
                                    />
                                    <FaTrash
                                        style={{ color: 'grey', cursor: 'pointer' }}
                                        onClick={() => handleDelete(possession.libelle)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-center mt-3">
                    <Button variant="success" onClick={handleCreatePossession}>
                        Créer une nouvelle possession
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default PossessionList;
