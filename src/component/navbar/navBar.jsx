import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import './navbar.css'
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper'
  };

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer({openNav,getResponse}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const retrieveNotes = () => {
        getResponse("Notes")
    }

    const retrieveArchieveNotes = () => {
        getResponse("ArchieveNotes")
    }
    
    const retrieveTrashNotes = () => {
        getResponse("Trashed")
    }

    const retrieveLabel = () => {

    }    

    React.useEffect(() =>{
        if(openNav === true){
            handleDrawerOpen();
        }
        else{
            handleDrawerClose();
        }    
        },[openNav])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer variant="permanent" open={open}>
                <List>
                    <ListItem button key="Notes" >
                        <ListItemIcon onClick={retrieveNotes}>
                        <LightbulbOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Notes" />
                    </ListItem>
                    <ListItem button key="Reminder">
                        <ListItemIcon>
                            <NotificationsNoneOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Reminder" />
                    </ListItem>
                    <ListItem button key="Edit Label" >
                        <ListItemIcon onClick={handleOpen}>
                            <LabelOutlinedIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Edit Label" />
                    </ListItem>
                    <ListItem button key="Archive" >
                        <ListItemIcon onClick={retrieveArchieveNotes}>
                            <ArchiveOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Archive" />
                    </ListItem>
                    
                    <ListItem button key="Trash">
                        <ListItemIcon onClick={retrieveTrashNotes}>
                            <DeleteOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Trash" />
                    </ListItem>
                </List>
            </Drawer>
            <DrawerHeader />
            <Modal 
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                        <div className="editMain" style={{backgroundColor:'white',width:'280px'}}>
                            <p className="editheader">Edit Labels</p>
                            

                        </div>
                </Box>
            </Modal> 
        </Box>
    );
}
