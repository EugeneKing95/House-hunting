import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	role: 'buyer' | 'agent';
	matchPassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new mongoose.Schema<IUser>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, enum: ['buyer', 'agent'], default: 'buyer' },
	},
	{ timestamps: true }
);

// Hash password before saving
UserSchema.pre<IUser>('save', async function(next) {
	if (!this.isModified('password')) return next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

// Compare password method
UserSchema.methods.matchPassword = async function(
	enteredPassword: string
): Promise<boolean> {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Export the model
const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
export default User;

