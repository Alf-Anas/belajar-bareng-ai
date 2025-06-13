import { SemuaTopikPelajaran } from '@/types/rules-setting.interface';
import { Card, CardActionArea, Grid, Typography } from '@mui/material';
import { useState } from 'react';

type Subkategori = {
    label: string;
    deskripsi: string;
};

type Props = {
    subkategoriList: Subkategori[];
    onChange?: (value: string) => void;
};

export default function SubkategoriSelector({
    subkategoriList,
    onChange,
}: Props) {
    const [selected, setSelected] = useState(SemuaTopikPelajaran);

    const handleSelect = (value: string) => {
        setSelected(value);
        if (onChange) onChange(value);
    };

    const cardStyle = (isActive: boolean, bgColor: string) =>
        `rounded-2xl p-4 shadow-md transition-all duration-200 cursor-pointer border-4 ${
            isActive
                ? 'border-blue-500 bg-yellow-100'
                : 'border-transparent hover:border-yellow-300'
        } ${bgColor}`;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Card
                    className={cardStyle(
                        selected === SemuaTopikPelajaran,
                        'bg-blue-100'
                    )}
                    onClick={() => handleSelect(SemuaTopikPelajaran)}
                >
                    <CardActionArea className='p-4'>
                        <Typography
                            variant='h6'
                            className='text-blue-800 font-bold'
                        >
                            {SemuaTopikPelajaran}
                        </Typography>
                    </CardActionArea>
                </Card>
            </Grid>

            {subkategoriList.map((item, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                    <Card
                        key={idx}
                        className={cardStyle(
                            selected === item.label,
                            'bg-blue-100'
                        )}
                        onClick={() => handleSelect(item.label)}
                    >
                        <CardActionArea className='p-4'>
                            <Typography
                                variant='h6'
                                className='text-blue-800 font-semibold'
                            >
                                {item.label}
                            </Typography>
                            <Typography
                                variant='body2'
                                className='text-gray-700 mt-1'
                            >
                                {item.deskripsi}
                            </Typography>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}
