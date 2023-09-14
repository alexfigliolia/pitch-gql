import type { GraphQLFieldConfig } from "graphql";
import { GraphQLError, GraphQLString, GraphQLBoolean } from "graphql";
import { UserType } from "resolvers/user";
import type { Context } from "resolvers/types";
import type { LoginArgs, SignUpArgs } from "./types";
import { AuthController } from "./AuthController";
import { Schema } from "modules/Schema";

export const login: GraphQLFieldConfig<any, Context, LoginArgs> = {
  type: Schema.nonNull(UserType),
  args: {
    email: {
      type: Schema.nonNull(GraphQLString),
    },
    password: {
      type: Schema.nonNull(GraphQLString),
    },
  },
  resolve: async (_, args, context) => {
    const user = await AuthController.login(args);
    context.res.cookie(
      "P_User",
      AuthController.generateToken(user),
      AuthController.cookieOptions
    );
    return user;
  },
};

export const onboard: GraphQLFieldConfig<any, Context, SignUpArgs> = {
  type: Schema.nonNull(UserType),
  args: {
    name: {
      type: Schema.nonNull(GraphQLString),
    },
    email: {
      type: Schema.nonNull(GraphQLString),
    },
    password: {
      type: Schema.nonNull(GraphQLString),
    },
  },
  resolve: async (_, args, context) => {
    const user = await AuthController.onboard(args);
    context.res.cookie(
      "P_User",
      AuthController.generateToken(user),
      AuthController.cookieOptions
    );
    return user;
  },
};

export const verifyToken: GraphQLFieldConfig<any, Context> = {
  type: Schema.nonNull(UserType),
  resolve: (_1, _2, context) => {
    try {
      const token = context.req.cookies["P_User"];
      const result = AuthController.verifyToken(token || "");
      const { email, name, id } = result;
      return { id, name, email };
    } catch (error) {
      throw new GraphQLError("Authorization not found");
    }
  },
};

export const verifyTokenMobile: GraphQLFieldConfig<
  any,
  Context,
  { token: string }
> = {
  type: Schema.nonNull(UserType),
  args: {
    token: {
      type: Schema.nonNull(GraphQLString),
      description: "The user cookie",
    },
  },
  resolve: (_, args) => {
    try {
      const result = AuthController.verifyToken(args.token || "");
      const { email, name, id, verified } = result;
      return { id, name, email, verified };
    } catch (error) {
      throw new GraphQLError("Authorization not found");
    }
  },
};

export const logout: GraphQLFieldConfig<any, Context> = {
  type: Schema.nonNull(GraphQLBoolean),
  resolve: (_1, _2, context) => {
    try {
      context.res.clearCookie("P_User", AuthController.cookieOptions);
      return true;
    } catch (error) {
      throw new GraphQLError("Authorization not found");
    }
  },
};
