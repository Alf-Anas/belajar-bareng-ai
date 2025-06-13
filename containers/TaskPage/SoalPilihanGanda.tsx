'use client';
import React, { useState } from 'react';
import TimerSD from './TimerSD';
import {
    Card,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Divider,
} from '@mui/material';
import { JawabanPenggunaType } from '@/types/jawaban.interface';
import { SoalDBType } from '@/types/soal.interface';
import SimpleDialog from '@/components/dialog/SimpleDialog';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useRouter } from 'next/navigation';
import { ROUTE } from '@/utils/constant';

type Props = {
    soalData: SoalDBType;
    jawaban: JawabanPenggunaType[];
    waktuMulai: string;
    onJawab: (nomor: number, jawaban: string) => void;
    onSelesai: () => void;
    isSelesai: boolean;
};

export default function SoalPilihanGanda({
    soalData,
    jawaban,
    waktuMulai,
    onJawab,
    onSelesai,
    isSelesai,
}: Props) {
    const router = useRouter();
    const [nomor, setNomor] = useState(1);
    const soal = soalData.daftar_soal[nomor - 1];
    const jawabanSaatIni =
        jawaban.find((j) => j.nomor === nomor)?.jawaban || '';

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isSelesai) return;
        const nilai = event.target.value;
        onJawab(nomor, nilai);
    };

    const handleNext = () => {
        if (nomor < soalData.jumlah_soal) {
            setNomor((prev) => prev + 1);
        } else {
            onSelesai();
        }
    };

    const handleBack = () => {
        if (nomor > 1) {
            setNomor((prev) => prev - 1);
        }
    };

    function onClickBack() {
        router.push(ROUTE.TASK.VIEW.setURL(soalData.id));
    }

    return (
        <>
            {isSelesai ? (
                <Button
                    variant='text'
                    sx={{
                        textTransform: 'none',
                        marginBottom: 1,
                        marginTop: -2,
                    }}
                    startIcon={<ArrowBackRoundedIcon />}
                    onClick={onClickBack}
                >
                    Kembali Ke Detail Soal
                </Button>
            ) : (
                <TimerSD waktuMulai={waktuMulai} />
            )}

            <div className='space-y-6 max-w-3xl mx-auto px-2 py-6 bg-gradient-to-b from-blue-50 to-white rounded-2xl shadow-md border border-blue-100 mb-24'>
                {/* Judul */}
                <div className='text-center'>
                    <Typography
                        variant='h6'
                        className='font-bold text-blue-800'
                    >
                        ✏️ Soal ke-{nomor} dari {soalData.jumlah_soal}
                    </Typography>
                    <Typography className='text-sm text-gray-600'>
                        {soalData.mata_pelajaran} | Kelas {soalData.kelas} |
                        Topik: {soalData.topik}
                    </Typography>
                </div>
                <Divider />

                <Card className='p-2 !mt-0 border-l-8 border-yellow-400 bg-white rounded-xl shadow-sm'>
                    <Typography
                        variant='body1'
                        className='text-gray-800 font-medium text-justify'
                    >
                        {soal.soal}
                    </Typography>
                </Card>

                <RadioGroup value={jawabanSaatIni} onChange={handleChange}>
                    {(['a', 'b', 'c', 'd'] as const).map((key) => {
                        const warna: Record<typeof key, string> = {
                            a: 'bg-pink-100',
                            b: 'bg-blue-100',
                            c: 'bg-green-100',
                            d: 'bg-yellow-100',
                        };

                        return (
                            <FormControlLabel
                                key={key}
                                value={key.toUpperCase()}
                                control={<Radio color='primary' />}
                                label={`${key.toUpperCase()}. ${
                                    soal[`opsi_${key}`]
                                }`}
                                className={`${warna[key]} mx-1 rounded-xl px-2 py-2 mb-2 border border-gray-200 hover:border-blue-400 hover:shadow transition`}
                            />
                        );
                    })}
                </RadioGroup>

                {isSelesai && (
                    <Card className='mt-4 p-3 border-l-4 border-green-500 bg-green-50 rounded-lg shadow-sm'>
                        {jawabanSaatIni === soal.kunci_jawaban ? (
                            <Typography className='text-sm font-semibold text-green-700 mb-2'>
                                🎉 Yeay! Jawaban kamu benar! Hebat! 🏆
                            </Typography>
                        ) : (
                            <Typography className='text-sm font-semibold text-red-600 mb-2'>
                                ❌ Ups, jawaban kamu kurang tepat. Yuk belajar
                                lagi ya! 😊
                            </Typography>
                        )}

                        <Typography className='text-sm font-semibold text-green-700 mb-1'>
                            ✅ Kunci Jawaban:{' '}
                            <span className='font-bold'>
                                {soal.kunci_jawaban}
                            </span>
                        </Typography>

                        <Typography className='text-sm text-gray-700'>
                            📘 Penjelasan: {soal.penjelasan}
                        </Typography>
                    </Card>
                )}

                <div className='flex justify-between items-center mt-6'>
                    <Button
                        variant='outlined'
                        color='secondary'
                        disabled={nomor === 1}
                        onClick={handleBack}
                        sx={{ textTransform: 'none' }}
                    >
                        ⬅️ Kembali
                    </Button>

                    {nomor < soalData.jumlah_soal || isSelesai ? (
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={handleNext}
                            sx={{ textTransform: 'none' }}
                            disabled={nomor >= soalData.jumlah_soal}
                        >
                            ➡️ Soal Berikutnya
                        </Button>
                    ) : (
                        <SimpleDialog
                            title='🎉 Yakin Sudah Selesai Mengerjakan?'
                            triggerButton={
                                <Button
                                    variant='contained'
                                    color='success'
                                    sx={{ textTransform: 'none' }}
                                >
                                    🎉 Aku Selesai!
                                </Button>
                            }
                            okColor='primary'
                            okLabel='Ya, Aku Sudah Selesai!'
                            maxWidth='md'
                            onOk={handleNext}
                        >
                            <Typography
                                variant='body1'
                                className='text-base text-gray-700'
                            >
                                Wah, kamu sudah sampai akhir! 😍 <br />
                                Yakin semua soal sudah dijawab dengan mantap?
                            </Typography>

                            <Typography
                                variant='body2'
                                className='mt-2 text-sm text-gray-500 italic'
                            >
                                Tenang aja~ kamu hebat kok! 💪✨
                            </Typography>
                        </SimpleDialog>
                    )}
                </div>

                {/* Catatan */}
                <div className='text-center mt-4'>
                    <Typography className='text-xs text-gray-400 italic'>
                        Pilih jawaban dengan tenang ya 😊 Kamu hebat!
                    </Typography>
                </div>
            </div>
        </>
    );
}
