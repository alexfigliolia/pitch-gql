import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { user, users } from "./user";
import { feed, profileFeed, createPost } from "./post";
import {
  login,
  logout,
  onboard,
  verifyToken,
  verifyTokenMobile,
} from "./authentication";
import { postComments, createComment } from "./comment";
import { addPostLike, removePostLike } from "./post-like";
import { profilePhotoUploadSignature } from "./upload";

const QueryRoot = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    user,
    users,
    login,
    logout,
    feed,
    profileFeed,
    verifyToken,
    postComments,
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
    createComment,
    profilePhotoUploadSignature,
  }),
});

export const Schema = new GraphQLSchema({
  query: QueryRoot,
  mutation: MutationRoot,
});
