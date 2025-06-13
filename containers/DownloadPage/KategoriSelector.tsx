import { Card, CardContent, Typography, Grid } from '@mui/material';
import {
    School,
    Calculate,
    Language,
    Public,
    EmojiObjects,
    WifiProtectedSetup,
} from '@mui/icons-material';
const categories = [
    {
        id: 'matematika',
        icon: <Calculate fontSize='large' className='text-yellow-500' />,
        title: 'Matematika',
        color: 'bg-yellow-300',
    },
    {
        id: 'bahasa-indonesia',
        icon: <Language fontSize='large' className='text-pink-500' />,
        title: 'Bahasa Indonesia',
        color: 'bg-pink-300',
    },
    {
        id: 'ipas',
        icon: <Public fontSize='large' className='text-blue-500' />,
        title: 'IPAS',
        color: 'bg-blue-300',
    },
    {
        id: 'bahasa-inggris',
        icon: <School fontSize='large' className='text-purple-500' />,
        title: 'Bahasa Inggris',
        color: 'bg-purple-300',
    },
    {
        id: 'karakter-pancasila',
        icon: <EmojiObjects fontSize='large' className='text-green-500' />,
        title: 'Karakter & Pancasila',
        color: 'bg-green-300',
    },
    {
        id: 'literasi-digital',
        icon: <WifiProtectedSetup fontSize='large' className='text-red-500' />,
        title: 'Literasi Digital',
        color: 'bg-red-300',
    },
];

export default function KategoriSelector({
    onSelect,
}: {
    onSelect: (val: string) => void;
}) {
    return (
        <Grid container spacing={2}>
            {categories.map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                    <Card
                        className={`${item.color} cursor-pointer hover:shadow-xl transition duration-300`}
                        onClick={() => onSelect(item.id)}
                        elevation={3}
                    >
                        <CardContent className='flex flex-col items-center justify-center text-center p-6'>
                            {item.icon}
                            <Typography
                                variant='subtitle1'
                                className='mt-2 font-bold text-gray-800 text-md'
                            >
                                {item.title}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
