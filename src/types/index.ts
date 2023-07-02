export interface ContextProps {
    enable: boolean;
    handleEnable: ()=> void;
}

export interface ChatProps {
    timestamp: string;
    query: string;
    result: string;
    show_response: boolean;
}