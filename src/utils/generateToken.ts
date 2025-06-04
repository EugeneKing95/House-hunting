import jwt from 'jsonwebtoken';


export const generateToken = (id: string) => {
	if (!process.env.JWT_SECRET) {
		throw new Error('JWT_SECRET is not defined in the environment variables');
	}

	if (!id) {
		throw new Error('User ID is required to generate a token');
	}

	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};


