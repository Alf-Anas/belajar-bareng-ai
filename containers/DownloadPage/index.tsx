'use client';

import { Paper, Typography } from '@mui/material';
import MainLayout from '@/components/layout/MainLayout';
import { useState } from 'react';
import { ROUTE } from '@/utils/constant';
import KelasSelector from './KelasSelector';
import CustomMobileSepper from '@/components/stepper/CustomMobileStepper';
import KategoriSelector from './KategoriSelector';
import SelectedBox from './SelectedBox';
import { getTopic } from './constant';
import SubkategoriSelector from './SubKategoriSelector';
import UnduhSoalPanel from './UnduhSoalPanel';
import { SemuaTopikPelajaran } from '@/types/rules-setting.interface';

const steps = [
    'Kelas Berapa Kamu?',
    'Mau Belajar Apa?',
    'Mau Belajar Topik Apa?',
    'Unduh Soalnya Yuk!',
];
const maxSteps = steps.length;

export default function DownloadPage() {
    const [selectedKelas, setSelectedKelas] = useState<number>(0);
    const [selectedPelajaran, setSelectedPelajaran] = useState<string>('');
    const [selectedTopik, setSelectedTopik] =
        useState<string>(SemuaTopikPelajaran);

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const ePelajaran = getTopic(selectedPelajaran);

    function isNextDisabled() {
        if (activeStep === 0 && !selectedKelas) {
            return true;
        } else if (activeStep === 1 && !selectedPelajaran) {
            return true;
        } else if (activeStep === 2 && !selectedTopik) {
            return true;
        }

        return false;
    }

    return (
        <MainLayout title={ROUTE.DOWNLOAD.TITLE}>
            <Paper className='px-4 py-6 mb-16 bg-transparent-50 mx-auto max-w-4xl'>
                <Typography
                    variant='h4'
                    component='h1'
                    sx={{ width: '100%', textAlign: 'center' }}
                    className='mb-4'
                >
                    {steps[activeStep]}
                </Typography>

                {activeStep === 0 && (
                    <>
                        <KelasSelector
                            onSelect={(kelas) => {
                                setSelectedKelas(kelas);
                            }}
                        />
                        {Boolean(selectedKelas) && (
                            <SelectedBox>
                                <span className='font-bold'>
                                    🎒 Kelas Terpilih 🎒
                                </span>
                                <br />
                                Kelas {selectedKelas}
                            </SelectedBox>
                        )}
                    </>
                )}
                {activeStep === 1 && (
                    <>
                        <KategoriSelector
                            onSelect={(kategori) => {
                                setSelectedPelajaran(kategori);
                            }}
                        />
                        {selectedPelajaran && (
                            <SelectedBox>
                                <span className='font-bold'>
                                    🎒 Pelajaran Terpilih 🎒
                                </span>
                                <br />
                                {ePelajaran?.title}
                            </SelectedBox>
                        )}
                    </>
                )}
                {activeStep === 2 && (
                    <>
                        <SubkategoriSelector
                            subkategoriList={ePelajaran?.subkategori || []}
                            onChange={(val) => setSelectedTopik(val)}
                        />
                        {selectedTopik && (
                            <SelectedBox>
                                <span className='font-bold'>
                                    🎒 Topik Terpilih 🎒
                                </span>
                                <br />
                                {selectedTopik}
                            </SelectedBox>
                        )}
                    </>
                )}
                {activeStep === 3 && (
                    <>
                        <UnduhSoalPanel
                            kelas={selectedKelas}
                            mata_pelajaran={ePelajaran?.title || ''}
                            topik={selectedTopik}
                        />
                    </>
                )}

                <CustomMobileSepper
                    activeStep={activeStep}
                    maxSteps={maxSteps}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    disabledNext={isNextDisabled()}
                />
            </Paper>
        </MainLayout>
    );
}
