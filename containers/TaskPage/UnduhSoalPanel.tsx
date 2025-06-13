import { fetchAI } from '@/utils/fetch-ai';
import {
    Button,
    MenuItem,
    Select,
    Typography,
    CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import toast from 'react-hot-toast';
import { errorResponse } from '@/utils';
import { db } from '@/utils/db';
import { generateRandomCode } from '@/utils/helper';

type Props = {
    mata_pelajaran: string;
    kelas: number;
    topik: string;
};

export default function UnduhSoalPanel({
    kelas,
    mata_pelajaran,
    topik,
}: Props) {
    const [jumlah, setJumlah] = useState(25);
    const [loading, setLoading] = useState(false);

    const handleUnduh = async () => {
        setLoading(true);

        try {
            const theOutput = await fetchAI({
                mata_pelajaran,
                jumlah_soal: jumlah,
                kelas,
                topik,
            });
            if (theOutput.ok && theOutput.results) {
                const daftar_soal = theOutput.results.daftar_soal;
                const newID = generateRandomCode(10);

                await db.soal.add(
                    {
                        kelas,
                        mata_pelajaran,
                        topik,
                        jumlah_soal: jumlah,
                        daftar_soal,
                        tanggal: new Date().toISOString(),
                        id: newID,
                    },
                    newID
                );
                toast.success('Soal berhasil dibuat dan tersimpan!');
            } else {
                throw new Error(theOutput.message);
            }
        } catch (err) {
            toast.error(errorResponse(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='bg-white shadow-lg rounded-2xl p-6 mt-6 border-4 border-dashed border-blue-200'>
            <div className='block items-center justify-center gap-4 mb-4 text-center'>
                <div className='flex items-center gap-2 mx-auto w-fit'>
                    <span className='text-sm text-gray-700 text-lg'>
                        Jumlah Soal:
                    </span>
                    <Select
                        value={jumlah}
                        onChange={(e) => setJumlah(e.target.value as number)}
                        className='bg-blue-100 rounded-lg'
                        size='small'
                    >
                        {[10, 15, 25, 50, 100].map((val) => (
                            <MenuItem key={val} value={val}>
                                {val}
                            </MenuItem>
                        ))}
                    </Select>
                </div>

                <Button
                    size='large'
                    onClick={handleUnduh}
                    variant='contained'
                    color='success'
                    className='mt-6'
                    disabled={loading}
                    startIcon={<CloudDownloadRoundedIcon />}
                >
                    Unduh Soal
                </Button>
            </div>

            {loading && (
                <div className='flex flex-col items-center justify-center gap-2 mt-2'>
                    <CircularProgress color='warning' />
                    <Typography className='text-orange-500 font-medium animate-pulse'>
                        ✨ Soal sedang dibuat oleh AI...
                    </Typography>
                </div>
            )}
        </div>
    );
}
