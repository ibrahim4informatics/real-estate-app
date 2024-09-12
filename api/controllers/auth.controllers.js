import prisma from '../config/db.js'
import { sendMail } from '../config/nodemailer.js';
import { comparePassword, generateToken, hashPassword, verifyToken } from '../utils/auth.utils.js';
import Validator from '../utils/validations.js';
const validator = new Validator()

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "missing required fields" });
    if (!validator.isEmail(email)) return res.status(400).json({ message: "invalid email provided" });
    try {
        const user = await prisma.user.findUnique({ where: { email: validator.sanitizeInput(email) } });
        if (!user) return res.status(401).json({ message: "invalid email or password" });
        if (!await comparePassword(validator.sanitizeInput(password), user.password)) return res.status(401).json({ message: "invalid email or password" });

        const accessToken = generateToken({ id: user.id }, process.env.ACCESS_SECRET, '15m');
        const refreshToken = generateToken({ id: user.id }, process.env.REFRESH_SECRET, '7d');

        if (!accessToken.status || !refreshToken.status) return res.status(500).json({ message: "Error occured while authenticating" });
        res.cookie(`access`, accessToken.token, { sameSite: 'strict', maxAge: 1000 * 60 * 15, httpOnly: true, secure: process.env.mode === 'dev' ? false : true });
        res.cookie(`refresh`, refreshToken.token, { sameSite: 'strict', maxAge: 1000 * 3600 * 24 * 7, httpOnly: true, secure: process.env.mode === 'dev' ? false : true });
        return res.status(200).json({ message: "user logged in successfully" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "an error occurred while processing your request" });
    }
}
const registerUser = async (req, res) => {
    const { email, password, confirm, full_name, phone, isSeller } = req.body;
    if (!email || !password, !full_name || !phone) return res.status(400).json({ message: "missing required fields" });
    if (!validator.isEmail(email)) return res.status(400).json({ message: "invalid email provided" });
    if (!validator.isStrongPassword(password)) return res.status(400).json({ message: "the password is weak" });
    if (password !== confirm) return res.status(400).json({ message: "passwords do not match" });
    if (!validator.isPhoneNumber(phone)) return res.status(400).json({ message: "invalid phone number provided" });

    try {

        const userExist = await prisma.user.findUnique({ where: { email } });
        if (userExist) return res.status(400).json({ message: "email already taken" });
        const newUser = await prisma.user.create({
            data: {
                email: validator.sanitizeInput(email),
                phone: validator.sanitizeInput(phone),
                full_name: validator.sanitizeInput(full_name),
                isSeller,
                password: await hashPassword(validator.sanitizeInput(password)),
            }
        });

        return res.status(201).json({ message: "user registered successfully", newUser });

    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "an error occurred while processing your request" });
    }
}
const logoutUser = async (req, res) => {
    res.cookie('access', null, { maxAge: 0 });
    res.cookie('refresh', null, { maxAge: 0 });

    try {
        await prisma.user.update({ where: { id: req.user.id }, data: { isOnline: false } });

        return res.status(200).json({ message: "user logged out successfully" });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: err || 'Unknonw sevrer error' });
    }
}
const resetPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "missing required fields" });
    if (!validator.isEmail(email)) return res.status(400).json({ message: "invalid email provided" });
    try {
        const user = await prisma.user.findUnique({ where: { email: validator.sanitizeInput(email) } });
        if (!user) return res.status(404).json({ message: "no account found with this information" });
        const { status, token } = generateToken({ id: user.id, email: user.email }, process.env.RESET_SECRET, '15m')
        if (!status) return res.status(500).json({ message: "error occurred while processing the reset request" });
        const mail = await sendMail({
            from: "<REAL ESTATE>",
            to: user.email,
            subject: "Reset Password",
            text: `Click on the link below to reset your password: ${process.env.CLIENT_URL}/reset-password?token=${token}`,
        })
        if (!mail.status) {
            console.error("Failed to send email\n", mail.error);
            return res.status(500).json({ message: "Failed to send email" });
        }
        return res.status(200).json({ message: "Reset password email sent successfully", mailResponse: mail });
    }

    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "an error occurred while processing your request" });
    }
}
const isValidResetPasswordUrl = (req, res) => {
    const { token } = req.query;
    if (!token) return res.status(403).json({ message: "missing token" });
    try {

        const { status, data } = verifyToken(token, process.env.RESET_SECRET);
        if (!status) {
            console.log("Error Verifying token\n", data)
            return res.status(403).json({ message: "invalid or expired token provided" });
        }
        return res.status(200).json({ message: "valid reset password URL" });
    }

    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "an error occurred while processing your request" });
    }
}
const changePassword = async (req, res) => {
    const { password, confirm } = req.body;
    const { token } = req.query;
    if (!token) return res.status(403).json({ message: "missing token" });
    if (!password || !confirm) return res.status(403).json({ message: "missing required fields" });
    if (!validator.isStrongPassword(validator.sanitizeInput(password))) return res.status(400).json({ message: "invalid password <does not fill the constraints>" });
    if (password !== confirm) return res.status(403).json({ message: "passwords do not match" });
    try {
        const { status, data } = verifyToken(token, process.env.RESET_SECRET);
        if (!status) {
            console.log("Error Verifying token\n", data);
            return res.status(403).json({ message: "invalid or expired token provided" });
        }
        const user = await prisma.user.findUnique({ where: { email: data.email } });
        if (!user) return res.status(403).json({ message: "can not find user to update" });
        await prisma.user.update({ where: { id: data.id, email: data.email }, data: { password: await hashPassword(validator.sanitizeInput(password)) } });
        return res.status(200).json({ message: "password changed successfully" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "an error occurred while processing your request" });
    }
}
export { loginUser, registerUser, resetPassword, changePassword, isValidResetPasswordUrl, logoutUser }