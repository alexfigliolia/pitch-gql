import type { GraphQLFieldConfig } from "graphql";
import {
  GraphQLEnumType,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { Schema } from "modules/Schema";
import type { Context } from "resolvers/types";
import { UserType } from "resolvers/user";
import { PostController } from "./PostController";
import type { ICreatePost, IFeed } from "./types";

export const VisibilityType = new GraphQLEnumType({
  name: "Visibility",
  values: {
    public: {
      value: "public",
    },
    friends: {
      value: "friends",
    },
  },
});

export const PostType = new GraphQLObjectType({
  name: "Post",
  fields: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      description: "Primary key",
    },
    created_by: {
      type: Schema.nonNull(UserType),
      description: "Author",
    },
    created_at: {
      type: Schema.nonNull(GraphQLString),
      description: "Created at",
    },
    title: {
      type: Schema.nonNull(GraphQLString),
      description: "Title text",
    },
    text: {
      type: Schema.nonNull(GraphQLString),
      description: "Summary text",
    },
    tags: {
      type: Schema.nonNullArray(GraphQLString),
      description: "tags",
    },
    visibility: {
      type: Schema.nonNull(VisibilityType),
      description: "visibility",
    },
    _count: {
      type: Schema.nonNull(
        new GraphQLObjectType({
          name: "PostStats",
          fields: {
            likes: {
              type: Schema.nonNull(GraphQLInt),
              description: "The total number of likes",
            },
            comments: {
              type: Schema.nonNull(GraphQLInt),
              description: "The total number of comments",
            },
          },
        })
      ),
      description: "Total number of likes and comments",
    },
  },
});

export const feed: GraphQLFieldConfig<any, Context, IFeed> = {
  type: Schema.nonNullArray(PostType),
  args: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      description: "User primary key",
    },
    startIndex: {
      type: Schema.nonNull(GraphQLInt),
      description: "The start index of posts to pull",
    },
  },
  resolve: (_, args) => {
    return PostController.getFeed(args);
  },
};

export const profileFeed: GraphQLFieldConfig<any, Context, IFeed> = {
  type: Schema.nonNullArray(PostType),
  args: {
    id: {
      type: Schema.nonNull(GraphQLInt),
      description: "User primary key",
    },
    startIndex: {
      type: Schema.nonNull(GraphQLInt),
      description: "The start index of posts to pull",
    },
  },
  resolve: (_, args) => {
    return PostController.getProfileFeed(args);
  },
};

export const createPost: GraphQLFieldConfig<any, Context, ICreatePost> = {
  type: Schema.nonNull(PostType),
  args: {
    user_id: {
      type: Schema.nonNull(GraphQLInt),
      description: "User primary key",
    },
    title: {
      type: Schema.nonNull(GraphQLString),
      description: "Post title",
    },
    text: {
      type: Schema.nonNull(GraphQLString),
      description: "Post text",
    },
    tags: {
      type: Schema.nonNullArray(GraphQLString),
      description: "Post tags",
    },
    visibility: {
      type: Schema.nonNull(VisibilityType),
      description: "Post visibility",
    },
  },
  resolve: (_, args) => {
    return PostController.create(args);
  },
};
