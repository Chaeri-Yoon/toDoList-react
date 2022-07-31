import mongoose from "mongoose";
import passport from 'passport-local-mongoose';

const UserSchema = new mongoose.Schema({
    email: String,
    taskList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }]
})
UserSchema.plugin(passport, { usernameField: "email" });
const model = mongoose.model('User', UserSchema);
export default model;