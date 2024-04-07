import { response } from 'express';
import UserModel from '../model/User.model.js'
import bcrypt, { hash } from 'bcrypt';
import ENV from '../config.js'
import jwt from 'jsonwebtoken';
import otpGenerator from 'otp-generator';


/** MIDDLEWARE for VERIFYING USER */
export async function verifyUser(req, res, next) {
    try {
        const { username } = req.method == "GET" ? req.query : req.body;
        // check the user existence
        let exist = await UserModel.findOne({ username });
        if (!exist) return res.status(404).send({ error: "Can't find this is verifyUser user!" })
        next();
    } catch (error) {
        return res.status(404).send({ error: "Authenciation error" })

    }
}

// POST: http://localhost:8080/api/register
// {
//     "username" : "example123",
//     "password": "admin123",
//     "email": "example@gmail.com",
//     "firstName" : "bill",
//     "lastName": "william",
//     "mobile": 8009860560,
//     "address" : "Apt. 556, Kulas Light, Gwenborough",
//     "profile": ""
// }

/**//////////////////////////////////////   REGISTER FUNCTION  /////////////////////////////////////fsdf/a////////////////////// */
export async function register(req, res) {
    try {
        const { username, password, profile, email } = req.body;

        // Check if username exists
        const existingUsername = await UserModel.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Check if email exists
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const user = new UserModel({
            username,
            password: hashedPassword,
            profile: profile || '',
            email
        });

        // Save the user to the database
        const savedUser = await user.save();

        // Send success response
        return res.status(201).send({ msg: "User Register successfully", user: savedUser });

    } catch (error) {
        // Handle any errors
        console.error("Error registering user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

/**//////////////////////////////////////   REGISTER FUNCTION  /////////////////////////////////////fsdf/a////////////////////// */


/**//////////////////////////////////////   LOGIN FUNCTION  /////////////////////////////////////fsdf/a////////////////////// */
/** POST: http://localhost:8080/api/login
*
@param:
"username":"example123",
"password":"admin123"
*/

export async function login(req, res) {
    const { username, password } = req.body
    // console.log(req.body);
    try {
        // Find the user by username
        const user = await UserModel.findOne({ username });
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: "Username does not exist" });
        }
        // Compare the password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Password does not match" });
        }
        // Generate JWT token
        const token = jwt.sign({
            userId: user._id,
            username: user.username,
        }, ENV.JWT_SECRET, { expiresIn: "24h" });
        // console.log("Token is :=", token);
        // Send success response
        return res.status(200).json({
            msg: "Login Successful",
            username: user.username,
            token

        });
    } catch (error) {
        // Handle any unexpected errors
        console.error("Error occurred during login:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

/**//////////////////////////////////////   LOGIN FUNCTION  /////////////////////////////////////fsdf/a////////////////////// */


/**//////////////////////////////////////   getuser FUNCTION  /////////////////////////////////////fsdf/a////////////////////// */

// GET REQUEST--
//  http://localhost:8080/api/user/example123
// chat gpt code---
export async function getUser(req, res) {
    const { username } = req.params;
    try {
        if (!username || typeof username !== 'string') {
            return res.status(400).send({ error: "Invalid username provided" });
        }
        const user = await UserModel.findOne({ username })//.exec();
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        // const { password, ...rest } = user
        // move password and id form user
        // mongoose return unnecessary data with object so in order to convert in into json
        const { password, _id, ...rest } = Object.assign({}, user.toJSON())
        return res.status(200).send(rest);
    } catch (error) {
        console.error("Error occurred while fetching user:", error);
        return res.status(500).send({ error: "Internal server error" });
    }
}
//////////////////////////////////////  getuser FUNCTION  /////////////////////////////////////fsdf/a////////////////////// */


/**//////////////////////////////////////   UPDATE FUNCTION  /////////////////////////////////////fsdf/a////////////////////// */
// http://localhost:8080/api/updateuser

// chat gpt
export async function updateUser(req, res) {
    try {
        const { userId } = req.user; // Extract user ID from the token
        if (!userId) {
            return res.status(401).send({ error: "User ID not found in token" });
        }
        if (userId) {
            // Exclude password from the request body
            const { password, ...body } = req.body;
            // console.log("Body", req.body)
            const updatedUser = await UserModel.findByIdAndUpdate({ _id: userId }, body, { new: true })
            if (!updatedUser) {
                return res.status(500).json({ error: "Failed to update user" });
            }
            return res.status(200).json({ msg: "Record updated successfully" });
        }
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).send({ error: "Internal server error" });
    }
}

/**//////////////////////////////////////   UPDATE FUNCTION  /////////////////////////////////////fsdf/a////////////////////// */


//////////////////////////////////////  OTP Generator  /////////////////////////////////////fsdf/
//  http://localhost:8080/api/generateOTP //GET request
export async function generateOTP(req, res) {
    // res.json("Get User Route")
    req.app.locals.OTP = await otpGenerator.generate(4, {
        lowerCaseAlphabets: false, upperCaseAlphabets:
            false, specialChars: false
    })


    res.status(201).send({ code: res.app.locals.OTP })

}

//  http://localhost:8080/api/generateOTP
export async function verifyOTP(req, res) {
    // res.json("verify the OTP Route")
    const { code } = req.query
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null       //reset the value
        req.app.locals.resetSession = true
        return res.status(201).send({ msg: "Verify Successfully!" })
    }
    return res.status(400).send({ msg: "Invalid OTP" })

}

export async function createResetSession(req, res) {
    // res.json("create verifyOTP Route")
    if (req.app.locals.resetSession) {
        // req.app.locals.resetSession = false; // allow access to this route only once
        return res.status(201).send({ flag: req.app.locals.resetSession })
    }
    return res.status(440).json({ msg: "Session Expired!" })
}


// PUT reqjest



export async function resetPassword(req, res) {
    try {
        if (!req.app.locals.resetSession) {
            return res.status(440).json({ error: 'Session Expired' });
        }

        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(401).send({ error: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.updateOne({ username: user.username }, { password: hashedPassword });

        return res.status(201).json({ msg: 'Record Updated...!' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}