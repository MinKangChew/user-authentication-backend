import bcrypt from "bcrypt";
import { omit } from "lodash";
import { findUserByUsername } from "../user/user.service";

export const hashPassword = async (password: string) => {
  const saltWorkFactor = Number(process.env.SALT_WORK_FACTOR);

  const salt = await bcrypt.genSalt(saltWorkFactor);

  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

export const validatePassword = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const user = await findUserByUsername(username);

  if (!user) return false;

  const isValid = await bcrypt.compare(password, user.password as string);

  if (!isValid) return false;

  return omit(user, "password");
};
