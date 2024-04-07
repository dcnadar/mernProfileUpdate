import mongoose from "mongoose";
export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    password: {
        type: String,
        required: [true, "Please Provide a Password"],
        unique: false
    },
    email: {
        type: String,
        required: [true, "Please provide unique Email"],
        unique: true
    },
    firstName: { type: String },
    lastName: { type: String },
    mobile: { type: Number },
    address: { type: String },
    profile: { type: String }
})
export default mongoose.Schema.Users || mongoose.model('users', UserSchema)