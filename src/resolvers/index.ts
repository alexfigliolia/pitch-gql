import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { user, users } from "./user";
import { feed, createPost } from "./post";
import {
  login,
  logout,
  onboard,
  verifyToken,
  verifyTokenMobile,
} from "./authentication";
import { addPostLike, removePostLike } from "./post-like";

const QueryRoot = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    user,
    users,
    login,
    logout,
    feed,
    verifyToken,
    verifyTokenMobile,
  }),
});

const MutationRoot = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    onboard,
    addPostLike,
    removePostLike,
    createPost,
  }),
});

export const Schema = new GraphQLSchema({
  query: QueryRoot,
  mutation: MutationRoot,
});
