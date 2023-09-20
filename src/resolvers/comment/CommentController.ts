import { DB } from "db/Client";
import type { ICreateComment } from "./types";

export class CommentController {
  private static get join() {
    return {
      created_by: {
        select: {
          id: true,
          name: true,
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
      likes: {
        select: {
          user_id: true,
        },
      },
    };
  }

  public static postComments(post_id: number) {
    return DB.comment.findMany({
      where: { post_id },
      include: this.join,
      orderBy: {
        created_at: "asc",
      },
    });
  }

  public static create(data: ICreateComment) {
    return DB.comment.create({
      data,
      include: this.join,
    });
  }
}
