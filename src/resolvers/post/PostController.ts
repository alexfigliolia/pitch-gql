import { DB } from "db/Client";
import type { ICreatePost, IFeed } from "./types";

export class PostController {
  public static create(data: ICreatePost) {
    return DB.post.create({
      data,
      include: {
        created_by: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  public static getFeed({ id, startIndex }: IFeed) {
    return DB.post.findMany({
      where: {
        OR: [
          {
            created_by: {
              is: {
                connections: {
                  some: {
                    user_id: id,
                  },
                },
              },
            },
          },
          { visibility: "public" },
        ],
      },
      take: 50,
      skip: startIndex,
      orderBy: [
        { created_at: "desc" },
        {
          likes: {
            _count: "desc",
          },
        },
      ],
      include: {
        likes: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
        created_by: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  public static getProfileFeed({ id, startIndex }: IFeed) {
    return DB.post.findMany({
      where: {
        created_by: {
          id,
        },
      },
      take: 50,
      skip: startIndex,
      orderBy: { created_at: "desc" },
      include: {
        likes: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
        created_by: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}
