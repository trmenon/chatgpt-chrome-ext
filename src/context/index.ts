import { createContext } from 'react';
import { ContextProps } from '../types';
export const AppContext = createContext<ContextProps>({enable: false, handleEnable: ()=> {}});