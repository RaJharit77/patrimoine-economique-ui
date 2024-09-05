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

            navigate('/possession?updated=true');
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
                <Col md={6} lg={4}>
                    <h2 className="text-center mb-4">Créer une nouvelle possession</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
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
