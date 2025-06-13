import React from 'react';
import { Button, Typography, Divider, Chip, IconButton } from '@mui/material';
import { SoalDBType } from '@/types/soal.interface';
import { generateDefaultJawaban } from '@/types/jawaban.interface';
import { useRouter } from 'next/navigation';
import { ROUTE } from '@/utils/constant';
import {
    formatDateTime,
    formatDuration,
    generateRandomCode,
} from '@/utils/helper';
import { db } from '@/utils/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { sortByKey } from '@/utils';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SimpleDialog from '@/components/dialog/SimpleDialog';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

type Props = {
    soal: SoalDBType;
};

export default function DetailSoal({ soal }: Props) {
    const router = useRouter();

    const daftarJawaban = useLiveQuery(() =>
        db.jawaban.where('soal_id').equals(soal.id).toArray()
    );

    const sortDaftarJawaban = sortByKey(
        daftarJawaban || [],
        'waktu_mulai',
        'desc'
    );

    async function onClickMulai() {
        const newId = generateRandomCode(5);
        const newJawaban = generateDefaultJawaban(
            newId,
            soal.id,
            soal.jumlah_soal
        );
        await db.jawaban.add(newJawaban, newId);
        router.push(ROUTE.TASK.START.setURL(soal.id, newId));
    }

    function onClickBack() {
        router.push(ROUTE.TASK.URL);
    }

    async function onClickDelete() {
        await db.soal.delete(soal.id);
        await db.jawaban.bulkDelete(sortDaftarJawaban.map((it) => it.id));
        router.push(ROUTE.TASK.URL);
    }
    return (
        <>
            <Button
                variant='text'
                sx={{ textTransform: 'none', marginBottom: 1, marginTop: -2 }}
                startIcon={<ArrowBackRoundedIcon />}
                onClick={onClickBack}
            >
                Kembali Ke Daftar Soal
            </Button>
            <div className='space-y-6 bg-yellow-50 p-4 pb-8 rounded-2xl shadow-md relative'>
                <div className='space-y-2 text-blue-900'>
                    <Typography className='text-lg font-bold flex items-center gap-2'>
                        <SchoolIcon className='text-yellow-600' />{' '}
                        {soal.mata_pelajaran}
                    </Typography>
                    <Typography className='text-base'>
                        🎓 <strong>Kelas:</strong> {soal.kelas}
                    </Typography>
                    <Typography className='text-base'>
                        📘 <strong>Topik:</strong> {soal.topik}
                    </Typography>
                    <Typography className='text-base'>
                        📝 <strong>Jumlah Soal:</strong> {soal.jumlah_soal}
                    </Typography>
                </div>

                <Button
                    variant='contained'
                    color='primary'
                    onClick={onClickMulai}
                    size='large'
                    className='!rounded-full !bg-green-500 hover:!bg-green-600 text-white font-bold tracking-wide'
                    startIcon={<QuizIcon />}
                >
                    🎯 Mulai Kerjakan Yuk!
                </Button>

                <Divider className='!my-4 !border-blue-300' />

                <div>
                    <Typography className='text-base font-semibold text-purple-800 mb-2'>
                        🕓 Riwayat Pengerjaan:
                    </Typography>
                    {Number(sortDaftarJawaban?.length) > 0 ? (
                        <div className='space-y-2'>
                            {sortDaftarJawaban.map((item) => {
                                const nilai =
                                    (item.skor / soal.jumlah_soal) * 100;

                                return (
                                    <div
                                        key={item.id}
                                        className='bg-white border border-purple-200 rounded-lg p-4 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-3'
                                    >
                                        <div className='flex flex-col'>
                                            <span className='text-sm text-gray-700'>
                                                🗓️{' '}
                                                {formatDateTime(
                                                    item.waktu_selesai ||
                                                        item.waktu_mulai
                                                )}
                                            </span>
                                            <span className='text-sm text-blue-800'>
                                                ⏱️ Durasi:{' '}
                                                {formatDuration(item.durasi)}
                                            </span>
                                        </div>

                                        <div className='flex items-center gap-2'>
                                            <Chip
                                                label={`🏆 Nilai: ${nilai.toFixed(
                                                    0
                                                )}`}
                                                color='secondary'
                                                icon={<EmojiEventsIcon />}
                                                className='text-sm'
                                            />
                                            <Button
                                                variant='outlined'
                                                color='primary'
                                                size='small'
                                                startIcon={<VisibilityIcon />}
                                                onClick={() => {
                                                    router.push(
                                                        ROUTE.TASK.START.setURL(
                                                            soal.id,
                                                            item.id
                                                        )
                                                    );
                                                }}
                                            >
                                                {item.waktu_selesai
                                                    ? 'Lihat Jawaban'
                                                    : 'Lanjut Kerjakan'}
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className='text-sm text-gray-500 italic'>
                            Belum ada histori pengerjaan 💤
                        </p>
                    )}
                </div>
                <SimpleDialog
                    title='⚠️ Yakin Mau Hapus Soal Ini?'
                    triggerButton={
                        <IconButton
                            sx={{
                                position: 'absolute',
                                right: '-0.5rem',
                                bottom: '-0.5rem',
                            }}
                        >
                            <DeleteForeverRoundedIcon color='error' />
                        </IconButton>
                    }
                    okColor='primary'
                    okLabel='Ya, Hapus Sekarang!'
                    maxWidth='lg'
                    onOk={onClickDelete}
                >
                    <Typography variant='body1'>
                        Kalau kamu hapus soal ini, semua jawaban yang pernah
                        dikerjakan juga akan ikut hilang 😢
                        <br />
                        <br />
                        Pastikan kamu sudah yakin, ya!
                    </Typography>
                </SimpleDialog>
            </div>
        </>
    );
}
