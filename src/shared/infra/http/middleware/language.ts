import { NextFunction, Request, Response } from "express";

export default function language(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const lang: string | undefined = req.headers["accept-language"];
  const options: any = {
    pt: "pt",
    en: "en",
  };
  req.lang = "pt";
  // if (!lang) {
  //   req.lang = "pt";
  // } else {
  //   req.lang = options[lang] || "pt";
  // }

  return next();
}
