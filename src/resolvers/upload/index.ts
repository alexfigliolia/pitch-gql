import type { GraphQLFieldConfig } from "graphql";
import { GraphQLObjectType, GraphQLString } from "graphql";
import { ImageStorage } from "modules/ImageStorage";
import { Schema } from "modules/Schema";
import type { Context } from "resolvers/types";

export const UploadSignatureType = new GraphQLObjectType({
  name: "UploadSignature",
  fields: {
    signature: {
      type: Schema.nonNull(GraphQLString),
      resolve: (sig) => sig.signature,
    },
    timestamp: {
      type: Schema.nonNull(GraphQLString),
      resolve: (sig) => sig.timestamp,
    },
    cloud_name: {
      type: Schema.nonNull(GraphQLString),
      resolve: (sig) => sig.cloud_name,
    },
    api_key: {
      type: Schema.nonNull(GraphQLString),
      resolve: (sig) => sig.api_key,
    },
  },
});

export const profilePhotoUploadSignature: GraphQLFieldConfig<
  any,
  Context,
  Record<string, never>
> = {
  type: Schema.nonNull(UploadSignatureType),
  resolve: () => {
    return {
      ...ImageStorage.sign(),
      api_key: ImageStorage.config.api_key,
      cloud_name: ImageStorage.config.cloud_name,
    };
  },
};
