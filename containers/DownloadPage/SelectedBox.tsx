'use client';

import { Box } from '@mui/material';
import { ReactNode } from 'react';

export default function SelectedBox({ children }: { children: ReactNode }) {
    return (
        <Box
            sx={{
                position: 'sticky',
                bottom: '58px',
                backgroundColor: '#FFD700',
                color: '#1F2937',
                fontSize: '1.1rem',
                px: 3,
                py: 1.5,
                borderRadius: '999px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                textAlign: 'center',
                width: 'max-content',
            }}
            className='mx-auto mt-4'
        >
            {children}
        </Box>
    );
}
