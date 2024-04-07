import jwt from "jsonwebtoken";
import ENV from "../config.js"

export default async function Auth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // res.json(token)
        //retrive the user detail 
        const decodedToken = await jwt.verify(token, ENV.JWT_SECRET)
        req.user = decodedToken;
        // res.json(decodedToken)
        next()
    } catch (error) {
        res.status(401).json({ error: "authorise failed" })

    }
}


export function localVariables(req, res, next) {
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    // console.log(req.app.locals);
    next()
}