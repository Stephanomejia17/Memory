import 'express';
declare module 'express-serve-static-core' {
    interface Request {
        session: {
            isLoggedIn?: boolean;
            user?: {
                type_id: string;
                id: string;
                name: string;
                lastname: string;
            };
        };
    }
}
