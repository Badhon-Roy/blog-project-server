import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt"
import config from "../../config";


const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true,
    }
)

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(
            user?.password,
            Number(config.bcrypt_salt_rounds))
    }
    next();

})

userSchema.post('save', async function (doc, next) {
    doc.password = '',
    next()
})

const User = model<IUser>('User', userSchema);
export default User;