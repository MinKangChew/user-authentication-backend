import jwt from "jsonwebtoken";
import fs from "fs";

const pathToPrivateKey = process.env.PRIVATE_KEY_PATH as string;
const pathToPubliceKey = process.env.PUBLIC_KEY_PATH as string;
const privateKey = fs.readFileSync(pathToPrivateKey);
const publicKey = fs.readFileSync(pathToPubliceKey);

export const signJwt = (object: Record<any, any>, expiresIn: string) => {
	return jwt.sign(object, privateKey, {
		expiresIn,
		algorithm: "RS256",
	});
};

export const verifyJwt = (token: string) => {
	try {
		const decoded = jwt.verify(token, publicKey);
		return {
			valid: true,
			expired: false,
			decoded,
		};
	} catch (error: any) {
		return {
			valid: false,
			expired: error.message === "jwt expired",
			decoded: null,
		};
	}
};
