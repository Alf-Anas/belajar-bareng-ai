import React from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    Typography,
} from '@mui/material';
import { styled } from '@mui/system';

const colors = [
    '#FFD700', // Emas cerah
    '#00CFFF', // Biru langit terang
    '#FF66CC', // Pink terang
    '#FF6B6B', // Merah cerah
    '#00D084', // Hijau terang
    '#FFA500', // Oranye cerah
];
const KelasCard = styled(Card)(({}) => ({
    textAlign: 'center',
    borderRadius: 16,
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
    height: 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const KelasSelector = ({ onSelect }: { onSelect: (kelas: number) => void }) => {
    const kelasList = [1, 2, 3, 4, 5, 6];

    return (
        <Grid container spacing={2}>
            {kelasList.map((kelas, index) => (
                <Grid item xs={12} sm={6} md={4} key={kelas}>
                    <KelasCard
                        style={{
                            backgroundColor: colors[index % colors.length],
                            color: '#1f2937',
                        }}
                        onClick={() => onSelect(kelas)}
                    >
                        <CardActionArea>
                            <CardContent>
                                <Typography
                                    variant='h3'
                                    fontWeight='bold'
                                    color='#ffffffdd'
                                >
                                    {kelas}
                                </Typography>
                                <Typography variant='body2'>
                                    Kelas {kelas}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </KelasCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default KelasSelector;
