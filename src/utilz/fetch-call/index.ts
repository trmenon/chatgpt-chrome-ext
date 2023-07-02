import { Observable, BehaviorSubject } from 'rxjs';
import { constants } from '../../constants/constants';

const loaderObservable = new BehaviorSubject(false);

interface FetchCallProps {
    url: string;
    method: string;
    data?: object;
}

export const fetchCall = (
    url: string,
    method: string,
    data: object,
) => {
    // Options
    let options: any = {
        method: method,
        mode: "cors",
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Accept': 'application/json',
        }
    };

    // Checking if call is a GET call to add body
    if(method !== constants?.request_methods?.GET) {
        options = {
            ...options, 
            body: JSON.stringify(data),
        };        
    }    

    return Observable.create((observer: any)=> {
        try {
            loaderObservable.next(true);
            const finalUrl = constants?.server_baseurl+url;
            fetch(finalUrl, options)
                .then((res)=> {
                    if(
                        res.headers.get("Content-Type") &&
                        res.headers.get("Content-Type")?.includes("application/json") 
                    ) {
                        try {
                            return res.json();
                        }catch(samp) {
                            console.log(samp);
                        }
                    }else {
                        return res.blob();
                    }
                })
                .then((body)=> {
                    loaderObservable.next(false);
                    observer.next(body);
                    observer.complete();
                    // TODO status code
                })
                .catch((err)=> {
                    observer.error(err);
                    loaderObservable.next(false);
                });
        } catch(error) {
            loaderObservable.error(false);
            observer.error(error);
        }        
    });
}