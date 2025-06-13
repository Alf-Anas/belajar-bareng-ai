import { Button, MobileStepper } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useDrawerContext } from '@/components/layout/MainDrawer';

export default function CustomMobileSepper({
    activeStep,
    handleBack,
    handleNext,
    maxSteps,
    disabledNext,
}: {
    handleNext: () => void;
    handleBack: () => void;
    activeStep: number;
    maxSteps: number;
    disabledNext?: boolean;
}) {
    const drawerContext = useDrawerContext();
    return (
        <MobileStepper
            variant='text'
            steps={maxSteps}
            position='bottom'
            activeStep={activeStep}
            sx={{
                marginLeft: drawerContext?.open
                    ? `${drawerContext.drawerWidth}px`
                    : 0,
            }}
            nextButton={
                <Button
                    size='large'
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1 || disabledNext}
                    variant='contained'
                    sx={{ textTransform: 'none' }}
                >
                    Selanjutnya <KeyboardArrowRight />
                </Button>
            }
            backButton={
                <Button
                    size='large'
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    variant='contained'
                    sx={{ textTransform: 'none' }}
                >
                    <KeyboardArrowLeft /> Sebelumnya
                </Button>
            }
        />
    );
}
