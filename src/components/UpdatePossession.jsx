import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePossession = () => {
    const { libelle } = useParams();
    const libelleEncoded = encodeURIComponent(libelle);
    const navigate = useNavigate();

    const [libelleUpdated, setLibelleUpdated] = useState('');
    const [valeur, setValeur] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [taux, setTaux] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiUrl = import.meta.env.VITE_APP_API_URL || 'https://patrimoine-economique-backend.onrender.com';

    useEffect(() => {
        const fetchPossession = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/possession/${libelleEncoded}`);
                if (response.data) {
                    setLibelleUpdated(response.data.libelle);
                    setValeur(response.data.valeur);
                    setDateDebut(response.data.dateDebut);
                    if (response.data.dateFin) {
                        setDateFin(response.data.dateFin);
                    }
                    setTaux(response.data.taux);
                }
            } catch (error) {
                setError('Erreur lors de la récupération des données de la possession.');
            }
        };

        fetchPossession();
    }, [libelleEncoded]);

    const updatePossession = async () => {
        setLoading(true);
        try {
            await axios.put(`${apiUrl}/api/possession/${libelleEncoded}`, {
                libelle: libelleUpdated,
                valeur,
                dateDebut,
                dateFin,
                taux
            });
            navigate('/possession');
        } catch (error) {
            setError('Erreur lors de la mise à jour de la possession.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/possession');
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <h2 className="text-center mb-4">Mettre à jour la Possession</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form>
                        <Form.Group controlId="formLibelle" className="mb-3">
                            <Form.Label>Libellé</Form.Label>
                            <Form.Control
                                type="text"
                                value={libelleUpdated}
                                onChange={(e) => setLibelleUpdated(e.target.value)}
                                placeholder="Entrez le libellé"
                            />
                        </Form.Group>

                        <Form.Group controlId="formValeur" className="mb-3">
                            <Form.Label>Valeur</Form.Label>
                            <Form.Control
                                type="number"
                                value={valeur}
                                onChange={(e) => setValeur(e.target.value)}
                                placeholder="Entrez la valeur"
                            />
                        </Form.Group>

                        <Form.Group controlId="formDateDebut" className="mb-3">
                            <Form.Label>Date Début</Form.Label>
                            <Form.Control
                                type="date"
                                value={dateDebut}
                                onChange={(e) => setDateDebut(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDateFin" className="mb-3">
                            <Form.Label>Date Fin</Form.Label>
                            <Form.Control
                                type="date"
                                value={dateFin}
                                onChange={(e) => setDateFin(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formTaux" className="mb-4">
                            <Form.Label>Taux d'Amortissement</Form.Label>
                            <Form.Control
                                type="number"
                                value={taux}
                                onChange={(e) => setTaux(e.target.value)}
                                placeholder="Entrez le taux d'amortissement"
                            />
                        </Form.Group>

                        <Button variant="primary" onClick={updatePossession} disabled={loading} className="w-100 mb-2">
                            {loading ? 'Mise à jour en cours...' : 'Mettre à jour'}
                        </Button>
                        <Button variant="secondary" onClick={handleCancel} className="w-100">
                            Annuler
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default UpdatePossession;
