import type { GraphQLFieldConfig } from "graphql";
import {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLBoolean,
} from "graphql";
import { UserController } from "./UserController";
import { Schema } from "modules/Schema";
import type { Context } from "resolvers/types";

export const UserType = new GraphQLObjectType({
  name: "user",
  fields: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (user) => user.id,
    },
    name: {
      type: Schema.nonNull(GraphQLString),
      resolve: (user) => user.name,
    },
    email: {
      type: Schema.nonNull(GraphQLString),
      resolve: (user) => user.email,
    },
    image: {
      type: Schema.nonNull(GraphQLString),
      resolve: (user) => user.image,
    },
    verified: {
      type: Schema.nonNull(GraphQLBoolean),
      resolve: (user) => user.verified,
    },
  },
});

export const user: GraphQLFieldConfig<any, Context, { id: number }> = {
  type: Schema.nonNull(UserType),
  args: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      description: "primary key",
    },
  },
  resolve: (_, args) => {
    return UserController.queryByID(args.id);
  },
};

export const users: GraphQLFieldConfig<any, Context, { name: string }> = {
  type: Schema.nonNullArray(UserType),
  args: {
    name: {
      type: Schema.nonNull(GraphQLString),
      description: "search by name",
    },
  },
  resolve: (_, args) => {
    return UserController.searchByName(args.name);
  },
};
