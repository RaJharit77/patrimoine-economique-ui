import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CreatePossession() {
    const [nomComplet, setNomComplet] = useState('');
    const [libelle, setLibelle] = useState('');
    const [valeur, setValeur] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [taux, setTaux] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_APP_API_URL || 'https://patrimoine-economique-backend.onrender.com';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!libelle || !valeur || !dateDebut || !taux || !nomComplet) {
            setError('Tous les champs sont obligatoires.');
            return;
        }

        try {
            await axios.post(`${apiUrl}/api/possession/create`, {
                possesseur: { nom: nomComplet },
                libelle,
                valeur,
                dateDebut,
                taux
            });

            navigate('/possession');
        } catch (error) {
            setError('Une erreur est survenue lors de la création de la possession.');
        }
    };

    const handleCancel = () => {
        navigate('/possession');
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <h2 className="text-center mb-4">Créer une nouvelle possession</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nom Complet</Form.Label>
                            <Form.Control
                                type="text"
                                value={nomComplet}
                                onChange={(e) => setNomComplet(e.target.value)}
                                placeholder="Entrez le nom complet du possesseur"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Libelle</Form.Label>
                            <Form.Control
                                type="text"
                                value={libelle}
                                onChange={(e) => setLibelle(e.target.value)}
                                placeholder="Entrez le libelle"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Valeur</Form.Label>
                            <Form.Control
                                type="number"
                                value={valeur}
                                onChange={(e) => setValeur(e.target.value)}
                                placeholder="Entrez la valeur"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date de début</Form.Label>
                            <Form.Control
                                type="date"
                                value={dateDebut}
                                onChange={(e) => setDateDebut(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Taux d'Amortissement</Form.Label>
                            <Form.Control
                                type="number"
                                value={taux}
                                onChange={(e) => setTaux(e.target.value)}
                                placeholder="Entrez le taux d'Amortissement"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mb-2">
                            Créer
                        </Button>
                        <Button variant="secondary" onClick={handleCancel} className="w-100">
                            Annuler
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default CreatePossession;
