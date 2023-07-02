import { fetchCall } from "../utilz/fetch-call";
import { constants } from "../constants/constants";

const postNewQuery = (data: string)=> 
    fetchCall(    
        '',    
        constants?.request_methods?.POST,
        {body: data},
    );

export const services = {
    postNewQuery
}