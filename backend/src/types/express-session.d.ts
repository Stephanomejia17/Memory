import 'express-session';

declare module 'express-session' {
    interface SessionData {
        isLoggedIn?: boolean;
        user?: {
            type_id: string;
            id: string;
            name: string;
            lastname: string;
            password: string;
            email:string;
            phone: string;
            adress: string;
            city: string;
        };
    }
}
