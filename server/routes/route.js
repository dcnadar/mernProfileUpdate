import { Router } from "express";
import Auth, { localVariables } from "../middleware/auth.js";
import { registerMail } from "../controllers/mailer.js";
import * as controller from '../controllers/appController.js'
const router = Router();

/** POST Methods */
// router.post('/register', (req, res) => res.json("This is normal"))
router.route('/register').post(controller.register);    //done
router.route('/registerMail').post(registerMail)  //send the email
router.route('/authenticate').post(controller.verifyUser, (req, res) => res.send())  //authenticate the user   
router.route('/login').post(controller.verifyUser, controller.login) //login in app //done



/** GET methods */
router.route('/user/:username').get(controller.getUser) // user with a user name    //done
router.route('/generateOTP').get(controller.verifyUser, localVariables, controller.generateOTP)    //generate random OTP   //
router.route('/verifyOTP').get(controller.verifyUser, controller.verifyOTP)      // verify generated OTP   //
router.route('/createResetSession').get(controller.createResetSession) // reset all the variables   //



/** */
router.route('/updateuser/').put(Auth, controller.updateUser)    // to update the user profiles    //done
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword) // use to reset password   //


export default router