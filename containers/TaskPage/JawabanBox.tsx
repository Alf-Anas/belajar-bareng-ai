'use client';

import { Box } from '@mui/material';
import SoalPilihanGanda from './SoalPilihanGanda';
import { useLiveQuery } from 'dexie-react-hooks';
import { SoalDBType } from '@/types/soal.interface';
import { db } from '@/utils/db';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ROUTE } from '@/utils/constant';

export default function JawabanBox({
    jawabanId,
    soal,
}: {
    soal: SoalDBType;
    jawabanId: string;
}) {
    const router = useRouter();
    const jawaban = useLiveQuery(() => db.jawaban.get(jawabanId));

    async function updateJawaban(nomor: number, jawab: string) {
        const current = await db.jawaban.get(jawabanId);
        if (!current) return;

        const updatedJawabanPengguna = current.jawaban_pengguna.map((item) =>
            item.nomor === nomor ? { ...item, jawaban: jawab } : item
        );

        await db.jawaban.update(jawabanId, {
            jawaban_pengguna: updatedJawabanPengguna,
        });
    }

    async function onClickSelesai() {
        if (!jawaban || !soal) return;

        const waktuSelesai = new Date().toISOString();

        // Update jawaban_pengguna: cek kebenaran
        const updatedJawabanPengguna = jawaban.jawaban_pengguna.map((j) => {
            const soalAsli = soal.daftar_soal[j.nomor - 1];
            const benar = j.jawaban === soalAsli.kunci_jawaban;
            return { ...j, benar };
        });

        // Hitung skor
        const totalBenar = updatedJawabanPengguna.filter((j) => j.benar).length;

        // Hitung durasi
        const durasi = Math.floor(
            (new Date(waktuSelesai).getTime() -
                new Date(jawaban.waktu_mulai).getTime()) /
                1000
        );

        // Update ke IndexedDB
        await db.jawaban.update(jawaban.id, {
            waktu_selesai: waktuSelesai,
            durasi,
            jawaban_pengguna: updatedJawabanPengguna,
            skor: totalBenar,
        });

        toast.success('Jawaban kamu berhasil disimpan! Terus semangat ya! 💪');
        setTimeout(() => {
            router.push(ROUTE.TASK.VIEW.setURL(soal.id));
        }, 2500);
    }

    const isSelesai = Boolean(jawaban?.waktu_selesai);

    return (
        <Box>
            {jawaban && (
                <SoalPilihanGanda
                    soalData={soal}
                    jawaban={jawaban.jawaban_pengguna}
                    waktuMulai={jawaban.waktu_mulai}
                    onJawab={updateJawaban}
                    onSelesai={onClickSelesai}
                    isSelesai={isSelesai}
                />
            )}
        </Box>
    );
}
