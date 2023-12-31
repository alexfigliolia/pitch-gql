import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { DB } from "db";
import { GraphQLError } from "graphql";
import type { CookieOptions } from "express";
import { Environment } from "Environment";
import type { LoginArgs, SignUpArgs } from "./types";
import type { User } from "@prisma/client";

export class AuthController {
  private static SALTS = 10;
  private static AGE = 30 * 24 * 60 * 60 * 1000;
  public static async login({ email, password }: LoginArgs) {
    const user = await DB.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });
    if (!user) {
      throw new GraphQLError("There are no users with this email");
    }
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    throw new GraphQLError("The password is incorrect");
  }

  public static async onboard({ name, email, password }: SignUpArgs) {
    const user = await DB.user.findFirst({
      where: {
        email: email.toLowerCase(),
      },
    });
    if (user) {
      throw new GraphQLError("A user with this email address already exists");
    }
    return DB.user.create({
      data: {
        name,
        verified: false,
        email: email.toLocaleLowerCase(),
        password: await bcrypt.hash(password, this.SALTS),
      },
    });
  }

  public static generateToken(user: User) {
    return JWT.sign(user, Environment.TOKEN);
  }

  public static verifyToken(token: string) {
    return JWT.verify(token, Environment.TOKEN) as User;
  }

  public static cookieOptions: CookieOptions = {
    maxAge: this.AGE,
    sameSite: "none",
    secure: true,
    httpOnly: true,
  };
}
