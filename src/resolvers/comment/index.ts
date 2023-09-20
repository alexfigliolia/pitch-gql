import type { GraphQLFieldConfig } from "graphql";
import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { Schema } from "modules/Schema";
import type { Context } from "resolvers/types";
import { UserType } from "resolvers/user";
import type { ICreateComment } from "./types";
import { CommentController } from "./CommentController";

const CommentCountType = new GraphQLObjectType({
  name: "CommentCount",
  fields: {
    likes: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (count) => count.likes,
    },
  },
});

const UserRepType = new GraphQLObjectType({
  name: "UserRep",
  fields: {
    user_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (userRep) => userRep.user_id,
    },
  },
});

export const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (comment) => comment.id,
    },
    user_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (comment) => comment.user_id,
    },
    post_id: {
      type: Schema.nonNull(GraphQLInt),
      resolve: (comment) => comment.post_id,
    },
    text: {
      type: Schema.nonNull(GraphQLString),
      resolve: (comment) => comment.text,
    },
    created_at: {
      type: Schema.nonNull(GraphQLString),
      resolve: (comment) => comment.created_at,
    },
    created_by: {
      type: Schema.nonNull(UserType),
      resolve: (comment) => comment.created_by,
    },
    _count: {
      type: Schema.nonNull(CommentCountType),
      resolve: (comment) => comment._count,
    },
    likes: {
      type: Schema.nonNullArray(UserRepType),
      resolve: (comment) => comment.likes,
    },
  },
});

export const postComments: GraphQLFieldConfig<
  any,
  Context,
  { post_id: number }
> = {
  type: Schema.nonNullArray(CommentType),
  args: {
    post_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "A post's primary key",
    },
  },
  resolve: (_, args) => {
    return CommentController.postComments(args.post_id);
  },
};

export const createComment: GraphQLFieldConfig<any, Context, ICreateComment> = {
  type: Schema.nonNull(CommentType),
  args: {
    text: {
      type: Schema.nonNull(GraphQLString),
      description: "The comment text",
    },
    post_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "A post's primary key",
    },
    user_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "A user's primary key",
    },
  },
  resolve: (_, args) => {
    return CommentController.create(args);
  },
};
