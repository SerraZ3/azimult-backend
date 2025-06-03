import { NextFunction, Request, Response } from "express";
export interface IPagination {
  perPage?: number;
  page?: number;
  orderBy?: string;
  order?: "ASC" | "DESC";
  find?: string;
}
export default function pagination(req: Request, res: Response, next: NextFunction): void {
  const { perPage = 10, page = 1, orderBy = "createdAt", order = "DESC", find = "" } = req.query;

  req.pagination = {
    perPage: parseInt(perPage.toString()),
    page: parseInt(page.toString()),
    orderBy: orderBy.toString(),
    order: order.toString() as "ASC" | "DESC",
    find: find.toString(),
  };
  return next();
}
