import mongoose, { Schema, model, Model } from "mongoose";

import { IUser } from "../interfaces";

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["user", "admin"],
        message: "{VALUE}this role is not supported",
        default: "user",
        required: true,
    },

},
    { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || model("User", userSchema);

export default User;