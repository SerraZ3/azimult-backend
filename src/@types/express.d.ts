declare namespace Express {
  export interface Request {
    user: {
      id: string;
      isTokenApi: boolean;
    };

    lang: string;
    pagination: {
      perPage: number;
      page: number;
      orderBy: string;
      order: "ASC" | "DESC";
      find?: string;
    };
  }
}
