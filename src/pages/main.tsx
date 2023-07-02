import React, {useContext} from "react";
import { AppContext } from "../context";

// Assets
import logo from '../assets/logo.png';

// HOC Imports
import { EnableSwitch, ChatWidget } from "../components";

// Legacy Imports
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';


export const MainPage = ()=> {
    // Globals
    const {enable} = useContext(AppContext);

    // Renderer
    return(
        <React.Fragment>
            <Box>
                <AppBar position="fixed"  elevation={0} sx={{backgroundColor: '#FFF'}}>
                    <Toolbar 
                        sx={{
                            height: '64px', 
                            borderBottom: '1px solid #CCC', 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Stack 
                            direction={'row'}
                            spacing={'8px'}
                            sx={{display: 'flex',justifyContent: 'flex-start',alignItems: 'center'}}
                        >
                            <img src={logo} width={'48px'} height={'48px'} alt={'brand-logo'}/>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#075bd5' }}>
                                YouQuery
                            </Typography>
                        </Stack>                        
                        <EnableSwitch/>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box sx={{mt: '64px',minHeight: '400px',width: '100%',}}>
                {
                    enable?
                        <Box sx={{height: `calc(100vh - 96px)`, padding: '16px', backgroundColor: '#f7f3f3',}}>
                        <ChatWidget/>
                        </Box>
                        :
                        <Stack 
                            spacing={'16px'}
                            sx={{
                                width:'100%', 
                                minHeight: '400px', 
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <img src={logo} width={'128px'} height={'128px'} alt={'brand'}/>
                            <Typography variant={'h6'}>YouQuery</Typography>
                            <Typography variant={'subtitle2'}>Activate Chat to interact with the asist BOT</Typography>
                        </Stack>
                }
                
            </Box>
            
            
        </React.Fragment>
    )
}