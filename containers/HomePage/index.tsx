'use client';

import { Button, Paper, Stack, Typography } from '@mui/material';
import MainLayout from '@/components/layout/MainLayout';
import { METADATA } from '@/app/metadata';
import Img from '@/components/preview/Img';
import { useRouter } from 'next/navigation';
import { ROUTE } from '@/utils/constant';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';

export default function HomePage() {
    const router = useRouter();

    return (
        <MainLayout>
            <Paper className='p-4 bg-transparent-50 mx-auto max-w-4xl'>
                <Stack spacing={2}>
                    <Typography variant='h6' gutterBottom>
                        Selamat Datang di {METADATA.SHORT_NAME}
                    </Typography>
                    <Typography
                        variant='body1'
                        gutterBottom
                        className='text-justify'
                    >
                        <b>{METADATA.LONG_NAME}</b>
                        <br />
                        {METADATA.LONG_DESCRIPTION}
                    </Typography>

                    <div className='flex items-center'>
                        <Img
                            src='/img/logo.png'
                            height={120}
                            alt='logo'
                            className='rounded-sm'
                        />
                        <Stack spacing={2} className='w-full max-w-xs'>
                            <Button
                                size='large'
                                variant='contained'
                                color='primary'
                                onClick={() => {
                                    router.push(ROUTE.DOWNLOAD.URL);
                                }}
                                startIcon={<CloudDownloadRoundedIcon />}
                            >
                                Unduh Soal
                            </Button>
                            <Button
                                size='large'
                                variant='outlined'
                                color='primary'
                                onClick={() => router.push(ROUTE.TASK.URL)}
                                startIcon={<AssignmentTurnedInRoundedIcon />}
                            >
                                Kerjakan Soal
                            </Button>
                        </Stack>
                    </div>
                </Stack>
            </Paper>
        </MainLayout>
    );
}
