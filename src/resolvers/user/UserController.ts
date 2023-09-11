import { DB } from "db";

export class UserController {
  public static queryByID(id: number) {
    return DB.user.findUnique({
      where: {
        id,
      },
    });
  }

  public static searchByName(name: string) {
    return DB.user.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });
  }
}
