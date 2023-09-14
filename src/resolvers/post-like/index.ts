import type { GraphQLFieldConfig } from "graphql";
import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLInt,
  GraphQLObjectType,
} from "graphql";
import { Schema } from "modules/Schema";
import type { Context } from "resolvers/types";
import { UserType } from "resolvers/user";
import type { IAddPostLike } from "./types";
import { PostLikeController } from "./PostLikeController";

export const PostLikeStatusType = new GraphQLEnumType({
  name: "PostLikeStatus",
  values: {
    liked: {
      value: "liked",
    },
    unliked: {
      value: "unliked",
    },
  },
});

export const PostLikeType = new GraphQLObjectType({
  name: "PostLikeType",
  fields: {
    id: {
      resolve: (like) => like.id,
      type: Schema.nonNull(GraphQLInt),
    },
    user_id: {
      resolve: (like) => like.user_id,
      type: Schema.nonNull(GraphQLInt),
    },
    post_id: {
      resolve: (like) => like.post_id,
      type: Schema.nonNull(GraphQLInt),
    },
    created_by: {
      resolve: (like) => like.created_by,
      type: Schema.nonNull(UserType),
    },
  },
});

export const addPostLike: GraphQLFieldConfig<any, Context, IAddPostLike> = {
  type: Schema.nonNull(PostLikeType),
  args: {
    user_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "User primary key",
    },
    post_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "Post primary key",
    },
  },
  resolve: (_, args) => {
    return PostLikeController.create(args);
  },
};

export const removePostLike: GraphQLFieldConfig<any, Context, IAddPostLike> = {
  type: Schema.nonNull(GraphQLBoolean),
  args: {
    user_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "User primary key",
    },
    post_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "Post primary key",
    },
  },
  resolve: async (_, args) => {
    await PostLikeController.delete(args);
    return true;
  },
};
