import MainDrawer from '@/components/layout/MainDrawer';
import { Avatar, Divider, List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import { ROUTE } from '@/utils/constant';
import HomeIcon from '@mui/icons-material/Home';
import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import InstallMobileIcon from '@mui/icons-material/InstallMobile';
import usePWAInstall from '@/hooks/usePWAInstall';
import DashboardIcon from '@mui/icons-material/Dashboard';

type Props = {
    children: React.ReactNode;
    title?: string;
    customTitle?: React.ReactNode;
    defaultHideDrawer?: boolean;
};

function ItemList({
    item,
    pathname,
}: {
    item: {
        label: string;
        icon: React.JSX.Element;
        url: string;
    };
    pathname: string;
}) {
    const router = useRouter();
    return (
        <ListItem disablePadding>
            <ListItemButton
                onClick={() => router.push(item.url)}
                selected={pathname === item.url}
            >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                    primary={item.label}
                    slotProps={{
                        primary: {
                            className: 'font-primary',
                        },
                    }}
                />
            </ListItemButton>
        </ListItem>
    );
}

export default function MainLayout({
    children,
    title,
    customTitle,
    defaultHideDrawer,
}: Props) {
    const pathname = usePathname();
    const { isInstalled, promptInstall, canInstall } = usePWAInstall();

    return (
        <MainDrawer
            title={title}
            customTitle={customTitle}
            defaultHideDrawer={defaultHideDrawer}
            menus={
                <>
                    <List>
                        <ItemList
                            item={{
                                label: 'Beranda',
                                icon: <HomeIcon />,
                                url: ROUTE.HOME.URL,
                            }}
                            pathname={pathname}
                        />
                        <ItemList
                            item={{
                                label: ROUTE.DOWNLOAD.TITLE,
                                icon: <ScatterPlotIcon />,
                                url: ROUTE.DOWNLOAD.URL,
                            }}
                            pathname={pathname}
                        />
                        <ItemList
                            item={{
                                label: ROUTE.TASK.TITLE,
                                icon: <DashboardIcon />,
                                url: ROUTE.TASK.URL,
                            }}
                            pathname={pathname}
                        />
                    </List>

                    <Divider />
                    <List>
                        {!isInstalled && canInstall && (
                            <ListItem disablePadding>
                                <ListItemButton onClick={promptInstall}>
                                    <ListItemIcon>
                                        <InstallMobileIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary='Install App'
                                        slotProps={{
                                            primary: {
                                                className: 'font-primary',
                                            },
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </List>
                </>
            }
            action={
                <Avatar
                    src='/img/logo.png'
                    variant='rounded'
                    sx={{ opacity: '0.9' }}
                />
            }
        >
            {children}
        </MainDrawer>
    );
}
