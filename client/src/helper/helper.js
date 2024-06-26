import axios from "axios";
// import jwt_decode from 'jwt-decode'

axios.defaults.baseURL = 'http://localhost:8080'
// axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;



// make api requests


// export async function getUsername() {
//     const token = localStorage.getItem('token')
//     if (!token) return Promise.reject("Cannot find the Token");
//     let decode = jwt_decode(token)
//     console.log(decode);
//     return decode
// }




// authenticate function
export async function authenticate(username) {
    try {
        return await axios.post('/api/authenticate', { username })
    } catch (error) {
        return ({ error: "Username doesn't exist...!" })
    }
}

// get user details
export async function getUser({ username }) {
    try {
        const { data } = await axios.get(`/api/user/${username}`)
        return { data };
    } catch (error) {
        return ({ error: "Password doesn't match" })
    }
}

// register user 
export async function registeUser(credentials) {
    try {
        const { data: { msg }, status } = await axios.post(`/api/register`, credentials)
        let { username, email } = credentials;
        // send email
        if (status === 201) {
            await axios.post('/api/registerMail', { username, userEmail: email, text: msg })
        }
        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}

// login function

export async function verifyPassword({ username, password }) {
    try {
        if (username) {
            const data = await axios.post('/api/login', { username, password })
            // console.log(data.data);
            return Promise.resolve({ data })
        }
    } catch (error) {
        return Promise.reject({ error: "Password doesn't match...!" })
    }
}

// update fucniton
export async function updateUser(response) {
    try {
        const token = await localStorage.getItem('token')
        const data = await axios.put('/api/updateuser', response, { headers: { "Authorization": `Bearer ${token}` } })
        // console.log(data);
        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error: "Couldn't Update Profile" })
    }
}

// generate otp
export async function generateOTP(username) {
    try {
        const { data: { code }, status } = await axios.get('/api/generateOTP', { params: { username } })
        // mail with the otp
        if (status === 201) {
            let { data: { email } } = await getUser({ username })
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your Password.`
            await axios.post('/api/registerMail', { username, userEmail: email, text, subject: "Password recovery OTP" })
        }
        return Promise.resolve(code)
    } catch (error) {
        return Promise.reject({ error })
    }
}

// verify OTP
export async function verifyOTP({ username, code }) {
    try {
        const { data, status } = await axios.get('/api/verifyOTP', { params: { username, code } })
        return { data, status }
    } catch (error) {
        return Promise.reject(error)
    }
}

// reset password
export async function resetPassword({ username, password }) {
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password })
        return Promise.resolve({ data, status })
    } catch (error) {
        return Promise.reject(error)
    }
}