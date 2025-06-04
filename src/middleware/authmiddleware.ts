import jwt from 'jsonwebtoken';

import User from '../models/users';
import type { NextFunction } from 'express';

interface Decoded {
	id: string;
}

export const protect = async (req, res, next: NextFunction) => {
	let token;

	if (req.headers.authorization?.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as Decoded;
			req.user = await User.findById(decoded.id).select('-password');
			next();
		} catch (error) {
			res.status(401).json({ message: 'Not authorized, token failed' });
		}
	} else {
		res.status(401).json({ message: 'Not authorized, no token' });
	}
};

