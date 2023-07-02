import React, {useContext} from "react";
import { AppContext } from "../../context";

// Legacy Imports
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export const EnableSwitch: React.FC = ()=> {
    // Globals
    const {enable, handleEnable} = useContext(AppContext);

    // Renderer
    return(
        <React.Fragment>
            <FormControlLabel
                value="end"
                control={
                    <Switch 
                        color={'primary'} 
                        value={enable} 
                        onChange={handleEnable} 
                    />
                }
                label={enable? "On": "Off"}
                labelPlacement="end"
            />
        </React.Fragment>
    )
}