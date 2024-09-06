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
                pointRadius: 0, // Désactive l'affichage des points
            },
        ],
    });

    const [dateDebut, setDateDebut] = useState(null);
    const [dateFin, setDateFin] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [patrimoineValeur, setPatrimoineValeur] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null); // Ajout de la sélection du jour

    const apiUrl = import.meta.env.VITE_APP_API_URL || 'https://patrimoine-economique-backend.onrender.com';

    const handleValidateRange = async () => {
        if (!dateDebut || !dateFin || !selectedDay) {
            alert('Veuillez remplir toutes les informations pour la période.');
            return;
        }
        try {
            const response = await axios.post(`${apiUrl}/api/patrimoine/range`, {
                type: 'month',
                dateDebut: dateDebut.toISOString(),
                dateFin: dateFin.toISOString(),
                jour: selectedDay,
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
                        pointRadius: 0, // Désactive les points pour le graphe
                    },
                ],
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error.response ? error.response.data : error.message);
        }
    };

    const handleValidateDate = async () => {
        if (!selectedDate) {
            alert('Veuillez sélectionner une date.');
            return;
        }
        try {
            const response = await axios.get(`${apiUrl}/api/patrimoine/${selectedDate.toISOString().split('T')[0]}`);

            setPatrimoineValeur(response.data.valeur);
            setChartData({
                labels: ['Date Sélectionnée'],
                datasets: [
                    {
                        label: 'Valeur du Patrimoine',
                        data: [response.data.valeur],
                        fill: false,
                        borderColor: 'rgba(75,192,192,1)',
                        tension: 0.1,
                        pointRadius: 0, // Pas de point sur la date sélectionnée
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
            <Row className="mb-4 align-items-end">
                <Col xs={6} md={3}>
                    <Form.Group>
                        <Form.Label>Date Début</Form.Label>
                        <DatePicker
                            selected={dateDebut}
                            onChange={(date) => setDateDebut(date)}
                            className="form-control"
                            placeholderText="Sélectionner une date"
                            dateFormat="dd/MM/yyyy"
                        />
                    </Form.Group>
                </Col>
                <Col xs={6} md={3}>
                    <Form.Group>
                        <Form.Label>Date Fin</Form.Label>
                        <DatePicker
                            selected={dateFin}
                            onChange={(date) => setDateFin(date)}
                            className="form-control"
                            placeholderText="Sélectionner une date"
                            dateFormat="dd/MM/yyyy"
                        />
                    </Form.Group>
                </Col>
                <Col xs={6} md={3}>
                    <Form.Group>
                        <Form.Label>Jour de la semaine</Form.Label>
                        <Form.Control as="select" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                            <option value="">Sélectionner un jour</option>
                            <option value="Lundi">Lundi</option>
                            <option value="Mardi">Mardi</option>
                            <option value="Mercredi">Mercredi</option>
                            <option value="Jeudi">Jeudi</option>
                            <option value="Vendredi">Vendredi</option>
                            <option value="Samedi">Samedi</option>
                            <option value="Dimanche">Dimanche</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col xs={6} md={3} className="d-flex justify-content-center align-items-end">
                    <Button variant="primary" onClick={handleValidateRange} className="btn-sm">
                        Valider la période
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
            <Row className="mt-4 align-items-end justify-content-center">
                <Col xs={6} md={4}>
                    <Form.Group>
                        <Form.Label>Date Sélectionnée</Form.Label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            className="form-control"
                            placeholderText="Sélectionner une date"
                            dateFormat="dd/MM/yyyy"
                        />
                    </Form.Group>
                </Col>
                <Col xs={6} md={4} className="d-flex justify-content-center align-items-end">
                    <Button variant="success" onClick={handleValidateDate} className="btn-sm">
                        Valider la date
                    </Button>
                </Col>
            </Row>
            {patrimoineValeur !== null && (
                <Row className="mt-4">
                    <Col className="text-center">
                        <p style={{ fontSize: '1.2rem' }}>
                            La valeur du patrimoine à la date sélectionnée est : <strong>{patrimoineValeur} Ar</strong>
                        </p>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default PatrimoineChart;
