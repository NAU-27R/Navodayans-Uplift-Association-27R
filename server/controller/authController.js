import { admin } from '../adminConfig.js'

const authenticate = async (req, res, next) => {

    // console.log("authenticate:", req.headers);
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.log("error server:token missing");
        return res.status(401).json({ message: 'Unauthorized: Missing access token' });
    }

    const accessToken = authHeader.split(' ')[1];

    try {
        const authUser = await admin.auth().verifyIdToken(accessToken);
        // console.log("Verified User");
        req.userData = {
            "email":authUser.email
        }
    }
    catch (error) {
        console.log("error on authenticating user in server:", error);
        res.send(error);
    }
    next();
}

export { authenticate }