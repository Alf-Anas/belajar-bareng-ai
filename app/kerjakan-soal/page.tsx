import TaskPage from '@/containers/TaskPage';
import { Suspense } from 'react';

export default function Home() {
    return (
        <Suspense>
            <TaskPage />
        </Suspense>
    );
}
