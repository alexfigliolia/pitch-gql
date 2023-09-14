import { DB } from "db/Client";
import type { IAddPostLike } from "./types";
import { GraphQLError } from "graphql";

export class PostLikeController {
  public static async create(data: IAddPostLike) {
    const likes = await DB.postLike.findMany({
      where: {
        user_id: data.user_id,
        post_id: data.post_id,
      },
    });
    if (likes.length) {
      throw new GraphQLError("This user already likes this post");
    }
    return DB.postLike.create({
      data,
      include: {
        created_by: true,
      },
    });
  }

  public static delete(data: IAddPostLike) {
    return DB.postLike.deleteMany({
      where: {
        user_id: data.user_id,
        post_id: data.post_id,
      },
    });
  }
}
