import { Button, Container, Grid, Typography } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import data from '../../../data/data.json';

const HomePage = () => {
    const [userName, setUserName] = useState('');
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        const fetchUserName = () => {
            try {
                const personneData = data.filter(item => item.model === 'Personne');

                if (personneData.length > 0 && personneData[0].data && personneData[0].data.nom) {
                    setUserName(personneData[0].data.nom);
                } else {
                    console.error('Données de personne ou nom introuvables.');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération du nom de l\'utilisateur', error);
            }
        };

        fetchUserName();
    }, []);

    const handleButtonClick = () => {
        setShowButtons(!showButtons);
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                overflowX: 'hidden',
                textAlign: 'center'
            }}
        >
            <Typography variant="h4" sx={{ mb: 2 }}>
                Bienvenue sur le site de gestion de la patrimoine M. {userName}
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={handleButtonClick}
                sx={{ mb: 2 }}
            >
                Cliquez ici
            </Button>

            {showButtons && (
                <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                    <Grid item>
                        <Button
                            component={Link}
                            to="/possession"
                            variant="contained"
                            color="info"
                            data-aos="fade-up"
                            data-aos-delay="250"
                        >
                            Possession
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            component={Link}
                            to="/patrimoine"
                            variant="contained"
                            color="info"
                            data-aos="fade-up"
                            data-aos-delay="750"
                        >
                            Patrimoine
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default HomePage;
