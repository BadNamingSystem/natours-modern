import { User } from "@prisma/client"

// Augment the Express Request interface to include the user property
declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}
