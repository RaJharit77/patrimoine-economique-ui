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

    const [selectedDate, setSelectedDate] = useState(null);

    const apiUrl = import.meta.env.VITE_APP_API_URL || 'https://patrimoine-economique-backend.onrender.com';

    const handleValidateDate = async () => {
        if (!selectedDate) {
            alert('Veuillez sélectionner une date.');
            return;
        }
        try {
            const response = await axios.get(`${apiUrl}/api/patrimoine/${selectedDate.toISOString().split('T')[0]}`);

            setChartData({
                labels: ['Date Sélectionnée'],
                datasets: [
                    {
                        label: 'Valeur du Patrimoine',
                        data: [response.data.valeur],
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
                        Calculer la valeur à la date
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
