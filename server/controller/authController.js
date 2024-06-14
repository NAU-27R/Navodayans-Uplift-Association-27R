import { admin } from '../adminConfig.js'
import NodeCache from "node-cache" ;
const serverCache = new NodeCache();

const authenticate = async (req, res, next) => {

    // console.log("authenticate:", req.headers);
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.log("error server:token missing");
        return res.status(401).json({ message: 'Unauthorized: Missing access token' });
    }

    const accessToken = authHeader.split(' ')[1];

    // if(serverCache.get(accessToken)){
    //     req.userData = {
    //         "email":serverCache.get(accessToken)
    //     }
    //     next();
    // }

    try {
        const authUser = await admin.auth().verifyIdToken(accessToken);
        // console.log("Verified User");
        req.userData = {
            "email":authUser.email
        }

        // serverCache.set(accessToken,authUser.email,1000);
    }
    catch (error) {
        console.log("error on authenticating user in server:", error);
        res.send(error);
    }
    next();
}

export { authenticate }