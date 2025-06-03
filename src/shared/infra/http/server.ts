import "dotenv/config";
import "reflect-metadata";

import messageEmitter from "@utils/messageEmitter";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import http from "http";
// import corsConfig from "@config/cors";
import "@shared/container";
import AppError from "@shared/errors/AppError";
import AppValidationError from "@shared/errors/AppValidationError";
import { errors } from "celebrate";
import "express-async-errors";

import language from "./middleware/language";
// import rateLimiter from "./middleware/rateLimiter";
import pagination from "./middleware/pagination";
import routes from "./routes";

import dataSourceDB from "@shared/infra/typeorm";
import path from "path";
// import a1 from "../../../tmp/userLimitSync";
const { PORT, PREFIX_ROUTES } = process.env;
const app = express();
app.use(cors());
app.use(express.json({ limit: "2400mb" }));
app.use(
  express.urlencoded({
    limit: "2400mb",
    extended: true,
    parameterLimit: 5000000,
  })
);

app.use("/public", express.static(path.join(__dirname, "..", "..", "..", "public")));
// app.use(rateLimiter);
app.use(pagination);
app.use(language);

app.use(PREFIX_ROUTES || "/api/v1/", routes);
app.use(errors());

app.use(async (err: Error & { response: any }, req: Request, res: Response, _: NextFunction) => {
  if (err.response) {
    console.error(err.message);
    console.log(err.response.data as any);
  } else {
    console.error(err);
  }
  console.error("===============");
  // if (req.files && req.files.length > 0) {
  //   const files: any = req.files;
  //   files.map((file: { path: fs.PathLike }) => {
  //     fs.unlinkSync(file.path);
  //   });
  // }
  // Obtendo linguagem 'en' ou 'pt'
  const lang = req.lang;
  // Verificando se é erro conhecido
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.getMessage(lang),
      code: err.code,
    });
  }
  console.error("===============");
  // Verificando se é erro conhecido
  if (err instanceof AppValidationError) {
    return res.status(err.statusCode).json({
      status: "error",
      code: err.code,
      errors: err.getValidation(lang),
    });
  }
  console.error("===============");

  // Se erro não conhecido, emite Internal Server Error
  const serverError = messageEmitter.error("SERVER_ERROR", lang);
  return res.status(500).json({
    status: "error",
    message: serverError.message,
  });
});
app.use(PREFIX_ROUTES || "/api/v1/", (req, res) => {
  res.send("Azimult - Router not found");
});

const server = http.createServer(app);
// server.listen(PORT);

(async () => {
  // Iniciando banco de dados
  await dataSourceDB.initialize();
  // Iniciando servidor
  // a1();

  server.listen(PORT, async () => {
    console.log(`🚀 Server started on http://localhost:${PORT}`);
  });
  // new SocketConfig(server);
})();
