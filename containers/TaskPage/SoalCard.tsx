import { Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { SoalDBType } from '@/types/soal.interface';
import { ROUTE } from '@/utils/constant';
import { formatDateTime } from '@/utils/helper';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/utils/db';
import { sortByKey } from '@/utils';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import { JawabanDBType } from '@/types/jawaban.interface';

type SoalCardProps = {
    soal: SoalDBType;
};

function NilaiChip({
    jawaban,
    soal,
}: {
    soal: SoalDBType;
    jawaban: JawabanDBType;
}) {
    const nilai = (jawaban.skor / soal.jumlah_soal) * 100;
    const lulus = nilai >= 60;
    return (
        <Chip
            label={`${lulus ? '✅' : '❌'} Nilai: ${nilai.toFixed(0)}`}
            color={lulus ? 'success' : 'error'}
            size='small'
        />
    );
}

export default function SoalCard({ soal }: SoalCardProps) {
    const router = useRouter();

    const daftarJawaban = useLiveQuery(() =>
        db.jawaban.where('soal_id').equals(soal.id).toArray()
    );

    const sortDaftarJawaban = sortByKey(
        daftarJawaban || [],
        'waktu_mulai',
        'desc'
    );

    const handleClick = () => {
        router.push(ROUTE.TASK.VIEW.setURL(soal.id));
    };

    const latestJawaban =
        sortDaftarJawaban.length > 0 ? sortDaftarJawaban[0] : null;

    return (
        <Grid item xs={12} sm={6} md={6}>
            <Card
                onClick={handleClick}
                className={clsx(
                    'cursor-pointer transition duration-300 hover:shadow-lg hover:scale-[1.03]',
                    'rounded-2xl border border-blue-300 bg-blue-50'
                )}
            >
                <CardContent className='p-5'>
                    <div className='flex flex-col space-y-2'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <SchoolIcon className='text-yellow-600' />
                                <Typography className='font-bold text-lg text-blue-800'>
                                    {soal.mata_pelajaran} - Kelas {soal.kelas}
                                </Typography>
                            </div>
                        </div>

                        <Typography className='text-sm text-gray-700'>
                            📚 Topik:{' '}
                            <span className='font-medium'>{soal.topik}</span>
                        </Typography>

                        <Typography className='text-xs text-gray-500'>
                            🗓️ Diunduh: {formatDateTime(soal.tanggal)}
                        </Typography>

                        {latestJawaban && (
                            <div className='justify-between flex'>
                                <div className='flex items-center gap-1 text-green-600 text-sm'>
                                    <EmojiEventsIcon fontSize='small' />
                                    <span>Sudah dikerjakan</span>
                                </div>

                                <NilaiChip
                                    jawaban={latestJawaban}
                                    soal={soal}
                                />
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
}
