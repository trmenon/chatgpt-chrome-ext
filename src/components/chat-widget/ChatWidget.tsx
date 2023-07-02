import React, {useState, useEffect, useRef} from "react";
import moment from "moment";
import logo from '../../assets/logo.png';
import { services } from "../../services";

// Legacy Imports
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { green } from '@mui/material/colors';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

// Icon Imports
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

// Models
import { ChatProps } from "../../types";

export const ChatWidget: React.FC = ()=> {
    // REFS
    const bottomRef = useRef<null | HTMLDivElement>(null);
    // States
    const [query, setQuery] = useState('');
    const [chat, setChat] = useState<ChatProps[] | []>([]);
    const [load, setLoaded] = useState(true);

    // State Handlers
    const resetQuery = ()=> setQuery('');
    const updateQuery = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setQuery(event.target.value);

    // Effects
    useEffect(()=> {
        
        if(chat[chat.length - 1]?.show_response === false) {
            bottomRef.current?.scrollIntoView({behavior: 'smooth'});
            setTimeout(() => {
                const last_index = chat.length - 1;
                const updated_chat = chat.map((
                    item: ChatProps,
                    index: number
                )=> {
                    if(index === last_index) {
                        return{
                            ...chat[last_index],
                            show_response: true
                        }
                    }
                    return item;
                })
                
                setChat(updated_chat);
                setLoaded(true);
            }, 1000);
        }        
    }, [chat])

    // Trackers
    // useEffect(()=> {console.log(chat)}, [chat])

    // Event Handlers
    const handleSubmitQuery = ()=> {
        const req = query;
        if(req.length> 0) {
            setLoaded(false);
            const newChatEntry:ChatProps = {
                timestamp: moment().format('lll'),
                query: req,
                result: '',
                show_response: false,
            };
            makeNewQueryRequest(newChatEntry);
        }        
        
    }

    // API Calls
    const makeNewQueryRequest = (data: ChatProps)=> {
        try{
            services.postNewQuery(data?.query).subscribe({
                next: (response: any)=> {
                    if(response && response?.body) {
                        setChat([
                            ...chat,
                            {...data, result: response?.body}
                        ]);
                        resetQuery();                        
                    }
                    setChat([
                        ...chat,
                        {
                            ...data,
                            show_response: true,
                            result: 'ChatGPT is offline at the moment. Inconvenience regretted'
                        }
                    ])
                    resetQuery();
                    setLoaded(true);
                },
                error: (error: any)=> {
                    console.log('[API: ERROR] Trying to make new query request');
                    console.log(error);
                    resetQuery();
                    setLoaded(true);
                },
            })
        }catch(err) {
            console.log('[ERROR] Trying to make new query request');
            console.log(err);
            resetQuery();
            setLoaded(true);
        }
    }

    // Renderer
    return(
        <React.Fragment>
            <Box
                sx={{
                    height: `inherit`,
                    display: 'flex',
                    flexDirection: 'column',                    
                    justifyContent: 'space-between',
                    gap: '12px'
                }}
            >
                <Paper
                    sx={{
                        display: 'flex',
                        flexGrow: 1,
                        backgroundColor: '#FFF',
                        overflow: 'scroll', 
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': {display: 'none'},
                        scrollBehavior: 'smooth',                                              
                    }}
                >
                    <Stack spacing={'16px'} sx={{width: '100%'}}>
                        {
                            chat.map((element: ChatProps, index: number)=> {
                                return(
                                    <Stack
                                        ref={index === chat.length-1? bottomRef: null} 
                                        key={index} 
                                        spacing={'8px'} 
                                        sx={{width: '100%', borderBottom: '1px solid #CCC'}}
                                    >
                                        <Box sx={{display: 'flex', justifyContent: 'flex-end', padding: '32px'}}>
                                            <Chip 
                                                label={element?.timestamp} 
                                                color="success" 
                                                variant="outlined" 
                                                size="small"
                                            />
                                        </Box>
                                        <Box 
                                            sx={{
                                                width: '100%', 
                                                display: 'flex', 
                                                justifyContent: 'flex-start', 
                                                padding: '8px',                                                
                                            }}
                                        >                                            
                                            <Box
                                                sx={{
                                                    backgroundColor: '#f0f0f0',
                                                    padding: '10px 15px',
                                                    borderRadius: '10px',
                                                    width: '80%',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    gap: '8px',
                                                }}
                                            >
                                                <Avatar 
                                                    variant={'square'} 
                                                    sx={{ bgcolor: green[500] }}
                                                >
                                                    <PersonOutlinedIcon sx={{width: '32px', height: '32px'}}/>
                                                </Avatar>
                                                <Box sx={{display: 'flex', flexGrow: 1}}>
                                                    <Typography 
                                                        variant={'h6'} 
                                                        sx={{
                                                            color: '#052513',
                                                            fontSize: '16px',
                                                            fontWeight: 600,
                                                            textAlign: 'left',
                                                            wordWrap: 'break-word',
                                                            overflowWrap: 'break-word',
                                                        }}
                                                    >
                                                        {element?.query}
                                                    </Typography>       
                                                </Box>                                          
                                            </Box>
                                        </Box>
                                        <Box 
                                            sx={{
                                                width: '100%', 
                                                display: 'flex', 
                                                justifyContent: 'flex-end', 
                                                padding: '8px',
                                            }}
                                        >                                            
                                            <Box
                                                sx={{
                                                    backgroundColor: '#f7f1f1',
                                                    padding: '10px 15px',
                                                    borderRadius: '10px',
                                                    width: '80%',
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    gap: '8px',
                                                }}
                                            >
                                                <img src={logo} width={'32px'} height={'32px'}/>
                                                <Box sx={{display: 'flex', flexGrow: 1}}>
                                                    {
                                                        element?.show_response === false?
                                                            <Skeleton
                                                                animation="wave"
                                                                height={'32px'}
                                                                width="100%"
                                                                style={{ marginBottom: 6 }}
                                                            />
                                                            :
                                                            <Typography 
                                                                variant={'subtitle2'} 
                                                                sx={{
                                                                    color: '#052513',
                                                                    fontSize: '12px',
                                                                    fontWeight: 500,
                                                                    textAlign: 'left',
                                                                    wordWrap: 'break-word',
                                                                    overflowWrap: 'break-word',
                                                                }}
                                                            >
                                                                {element?.result}
                                                            </Typography>
                                                        }    
                                                </Box>                                          
                                            </Box>
                                        </Box>
                                    </Stack>
                                )
                            })
                        }
                    </Stack>
                </Paper>
                <OutlinedInput
                    id="bot-query-field-id"
                    multiline
                    fullWidth
                    rows={2}
                    label=""
                    placeholder="Enter your query"
                    value={query}
                    onChange={updateQuery}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                color="primary"
                                onClick={handleSubmitQuery}
                                onMouseDown={handleSubmitQuery}
                                edge="end"
                                disabled = {load === false}
                            >
                                <SendRoundedIcon/>
                            </IconButton>
                        </InputAdornment>
                    }
                    
                />
            </Box>
            
        </React.Fragment>
    )
}