import { PrismaClient } from "@prisma/client";
import { CreateUser } from "./user.schema";
import { omit } from "lodash";

const prisma = new PrismaClient();

export const createUser = async (data: CreateUser) => {
  const user = await prisma.user.create({
    data,
  });

  return omit(user, "password");
};

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({});
  return users;
};

export const findUserByUsername = async (username: string) => {
  const userExist = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  return userExist;
};
