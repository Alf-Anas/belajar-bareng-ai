'use client';
import React, { useEffect, useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Typography } from '@mui/material';

type TimerSDProps = {
    waktuMulai: string; // format ISO string
    stop?: boolean; // opsional untuk menghentikan timer
};

function formatDurasi(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m} menit ${s < 10 ? '0' : ''}${s} detik`;
}

export default function TimerSD({ waktuMulai, stop = false }: TimerSDProps) {
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        const start = new Date(waktuMulai).getTime();

        const interval = setInterval(() => {
            if (!stop) {
                const now = Date.now();
                const selisihDetik = Math.floor((now - start) / 1000);
                setElapsed(selisihDetik);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [waktuMulai, stop]);

    return (
        <div className='bg-yellow-100 border border-yellow-300 rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm w-full'>
            <AccessTimeIcon className='text-orange-600' />
            <Typography
                variant='body1'
                className='text-orange-700 font-bold text-sm sm:text-base'
            >
                ⏱️ Waktu berjalan: {formatDurasi(elapsed)}
            </Typography>
        </div>
    );
}
