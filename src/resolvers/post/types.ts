export interface IFeed {
  id: number;
  startIndex: number;
}

export enum Visibility {
  "public" = "public",
  "friends" = "friends",
}

export interface ICreatePost {
  user_id: number;
  title: string;
  text: string;
  tags: string[];
  visibility: Visibility;
}
