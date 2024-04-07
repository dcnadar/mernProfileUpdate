import toast from 'react-hot-toast'
import { authenticate } from './helper';

/** validate login page username */
export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);

    if (values.username) {
        // chck user existence
        const { status } = await authenticate(values.username)

        if (status !== 200) {
            errors.exist = toast.error('User does not exist')
        }
    }
    return errors;

}
/** validate password */
export async function passwordValidate(values) {
    const errors = passwordVerify({}, values);
    return errors;

}
/** validate reset Password */
export async function resetpasswordValidation(values) {
    const errors = passwordVerify({}, values);
    if (values.password !== values.confirm_pwd) {
        errors.exist = toast.error("Password not match");
        return errors;
    }
}

/** validate register form */
export async function registerValidation(values) {
    const errors = usernameVerify({}, values)
    passwordVerify(errors, values)
    emailVerify(errors, values)
    return errors
}

/** validate profile page */

export async function profileVaidation(values) {
    const errors = emailVerify({}, values);
    return errors
}

/** *********************************************************************/

/** Validate username */
function usernameVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error('Username Requires..')

    } else if (values.username.includes(" ")) {
        error.username = toast.error('Invalid username...!')

    }
    return error;

}
/** Validate password */
function passwordVerify(errors = {}, values) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\!]/;
    if (!values.password) {
        errors.password = toast.error('Password is required');
    } else if (values.password.includes(" ")) {
        errors.password = toast.error('Password should not contain spaces');
    } else if (values.password.length < 4) {
        errors.password = toast.error('Password must be at least 4 characters long');
    } else if (!specialChars.test(values.password)) {
        errors.password = toast.error('Password should contain special characters');
    }
    return errors;
}

/** Validate email */

function emailVerify(error = {}, values) {
    if (!values.email) {
        error.email = toast.error("Email Required...");
    } else if (values.email.includes(" ")) {
        error.email = toast.error("Wrong Email ....!")
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        error.email = toast.error("Invalid email Address...!")
    }
    return error
}
