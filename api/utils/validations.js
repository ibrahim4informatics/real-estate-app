import xss from "xss";
class Validator {
    isEmail(email) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
    }
    isStrongPassword(password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
    }
    isPhoneNumber(phoneNumber) {
        return /^\+?[1-9]\d{1,14}$/.test(phoneNumber)
    }
    isUUID(uuid) {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid)
    }

    isInt(number) {
        return Number.isInteger(Number(number));
    }

    isFloat(number) {
        return !isNaN(Number.parseFloat(number));
    }
    sanitizeInput(input) {
        return xss(input)  // Sanitize the input using xss library to prevent XSS attacks;
    }
}


export default Validator