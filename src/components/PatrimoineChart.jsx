import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

function PatrimoineChart() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Valeur du Patrimoine',
                data: [],
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
            },
        ],
    });

    const [dateDebut, setDateDebut] = useState(null);
    const [dateFin, setDateFin] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [jour, setJour] = useState('');

    const apiUrl = import.meta.env.VITE_APP_API_URL || 'https://patrimoine-economique-backend.onrender.com';

    // Fonction pour valider la plage de dates
    const handleValidateRange = async () => {
        if (!dateDebut || !dateFin || !jour) {
            alert('Veuillez remplir toutes les informations pour la période.');
            return;
        }
        try {
            const response = await axios.post(`${apiUrl}/api/patrimoine/range`, {
                type: 'month',
                dateDebut: dateDebut.toISOString(),
                dateFin: dateFin.toISOString(),
                jour
            });

            const months = response.data.map(entry => new Date(entry.date).toLocaleString('default', { month: 'short' }));
            const values = response.data.map(entry => entry.valeur);

            setChartData({
                labels: months,
                datasets: [
                    {
                        label: 'Valeur du Patrimoine',
                        data: values,
                        fill: false,
                        borderColor: 'rgba(75,192,192,1)',
                        tension: 0.1,
                    },
                ],
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error.response ? error.response.data : error.message);
        }
    };

    // Fonction pour valider une date spécifique
    const handleValidateDate = async () => {
        if (!selectedDate) {
            alert('Veuillez sélectionner une date.');
            return;
        }
        try {
            // Envoi de la requête pour récupérer la valeur du patrimoine à la date sélectionnée
            const response = await axios.get(`${apiUrl}/api/patrimoine/${selectedDate.toISOString().split('T')[0]}`);

            // Mise à jour des données du graphique pour afficher la valeur à cette date
            setChartData({
                labels: ['Date Sélectionnée'],
                datasets: [
                    {
                        label: 'Valeur du Patrimoine',
                        data: [response.data.valeur],  // Affiche la valeur à la date sélectionnée
                        fill: false,
                        borderColor: 'rgba(75,192,192,1)',
                        tension: 0.1,
                    },
                ],
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '80px' }}>
            <h2>Patrimoine</h2>
            
            {/* Section pour la sélection de la période */}
            <Row className="mb-4">
                <Col>
                    <Form.Group>
                        <Form.Label>Date Début</Form.Label>
                        <DatePicker
                            selected={dateDebut}
                            onChange={(date) => setDateDebut(date)}
                            className="form-control"
                            placeholderText="Sélectionner une date"
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Date Fin</Form.Label>
                        <DatePicker
                            selected={dateFin}
                            onChange={(date) => setDateFin(date)}
                            className="form-control"
                            placeholderText="Sélectionner une date"
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Jour</Form.Label>
                        <Form.Select value={jour} onChange={(e) => setJour(e.target.value)}>
                            <option value="">Sélectionner un jour</option>
                            <option value="1">Lundi</option>
                            <option value="2">Mardi</option>
                            <option value="3">Mercredi</option>
                            <option value="4">Jeudi</option>
                            <option value="5">Vendredi</option>
                            <option value="6">Samedi</option>
                            <option value="7">Dimanche</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col className="d-flex align-items-end">
                    <Button variant="primary" onClick={handleValidateRange}>
                        Valider la période
                    </Button>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            className="form-control"
                            placeholderText="Sélectionner une date"
                        />
                    </Form.Group>
                </Col>
                <Col className="d-flex align-items-end">
                    <Button variant="success" onClick={handleValidateDate}>
                        Valider la date
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="chart-container" style={{ height: '300px', position: 'relative' }}>
                        <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default PatrimoineChart;
