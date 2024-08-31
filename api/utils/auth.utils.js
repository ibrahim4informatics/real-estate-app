import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = await bcrypt.genSalt(12);
const verifyToken = (token, secret) => {
    try {
        const decoded = jwt.verify(token, secret);
        return { status: true, data: decoded };
    }
    catch (err) {
        console.log(`ERRROR VERIFY:   \n${err}\n------------------------------`);
        return { status: false, data: err };
    }
};

const generateToken = (payload, secret, duration) => {
    try {
        const token = jwt.sign(payload, secret, { expiresIn: duration });
        return { status: true, token };
    }
    catch (err) {
        console.log(err);
        return { status: false, token: null }
    }
}
const hashPassword = async (password) => await bcrypt.hash(password, saltRounds) // return hashed password
const comparePassword = async (text, hash) => await bcrypt.compare(text, hash); // returns boolean

const authMiddleware = (req, res, next) => {
    const accessToken = req.cookies.access;
    try {

        const { status, data } = verifyToken(accessToken, process.env.ACCESS_SECRET);
        if (!status) {
            const refreshToken = req.cookies.refresh;
            if (!refreshToken) return res.status(403).json({ message: "UnAuthorized" });
            const { status, data } = verifyToken(refreshToken, process.env.REFRESH_SECRET);
            if (!status) return res.status(403).json({ message: "UnAuthorized" });
            const newAccessToken = generateToken({ id: data.id }, process.env.ACCESS_SECRET, '15m');
            res.cookie('access', newAccessToken.token, { maxAge: 1000 * 60 * 15, httpOnly: true, sameSite: 'strict', secure: process.env.mode === 'dev' ? false : true });
            req.user = data;
            return next()
        }

        req.user = data;
        return next();


    }
    catch (err) {
        console.log("Error Verifying Token", err);
        return res.status(403).json({ message: "UnAuthorized" });

    }
}


export { verifyToken, generateToken, hashPassword, comparePassword, authMiddleware }