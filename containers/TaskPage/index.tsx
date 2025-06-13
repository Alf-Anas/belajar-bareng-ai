'use client';

import { Chip, Grid, Paper } from '@mui/material';
import MainLayout from '@/components/layout/MainLayout';
import { ROUTE } from '@/utils/constant';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/utils/db';
import SoalCard from './SoalCard';
import { useSearchParams } from 'next/navigation';
import DetailSoal from './DetailSoal';
import JawabanBox from './JawabanBox';
import { useEffect, useState } from 'react';

export default function TaskPage() {
    const searchParams = useSearchParams();
    const soalId = searchParams.get('soal_id') || '';
    const jawabanId = searchParams.get('jawaban_id') || '';

    const [isSWActive, setIsSWActive] = useState(false);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.ready
                .then((registration) => {
                    setIsSWActive(true);
                    console.log('Service Worker is active:', registration);
                })
                .catch((error) => {
                    setIsSWActive(false);
                    console.error('Service Worker not active:', error);
                });
        } else {
            setIsSWActive(false);
            console.log('Service Worker not supported');
        }
    }, []);

    const daftarSoal = useLiveQuery(() =>
        db.soal.orderBy('tanggal').reverse().toArray()
    );

    const selectedSoal = daftarSoal?.find((item) => item.id === soalId);

    return (
        <MainLayout title={ROUTE.TASK.TITLE}>
            <div className='w-full text-end pt-2 pr-2 -mb-4'>
                <Chip
                    label={isSWActive ? 'SW : Aktif' : 'SW : Error'}
                    size='small'
                    variant='outlined'
                    color={isSWActive ? 'success' : 'error'}
                />
            </div>
            <Paper className='px-4 py-6 mb-16 bg-transparent-50 mx-auto max-w-4xl'>
                {soalId && selectedSoal && jawabanId ? (
                    <JawabanBox jawabanId={jawabanId} soal={selectedSoal} />
                ) : soalId && selectedSoal ? (
                    <DetailSoal soal={selectedSoal} />
                ) : (
                    <Grid container spacing={2}>
                        {daftarSoal?.map((item) => {
                            return <SoalCard key={item.id} soal={item} />;
                        })}
                    </Grid>
                )}
            </Paper>
        </MainLayout>
    );
}
