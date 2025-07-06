import authConfig from "@config/auth";
import { TUserRole } from "@modules/users/infra/typeorm/schemas/User";
import CheckIfTokenIsValidService from "@modules/users/services/CheckIfTokenIsValidService";
import GetRolesUserService from "@modules/users/services/GetRolesUserService";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { ObjectID } from "mongodb";
import { container } from "tsyringe";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function ensureAuthenticated(roles?: TUserRole[], isTokenAccess: boolean = false): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  const handleAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("TOKEN_NOT_FOUND", 401);
    }

    let [, token] = authHeader.split(" ");

    let decoded;
    let id = "";
    let isJwt = true;
    try {
      decoded = verify(token, authConfig.jwt.secret);
    } catch (error) {
      isJwt = false;
    }
    try {
      const checkIfTokenIsValidService = container.resolve(CheckIfTokenIsValidService);

      const res = await checkIfTokenIsValidService.execute({
        token,
      });

      if (res.isRevoked) throw Error("TOKEN_REVOKED");
      if (res.userId) id = res.userId;
    } catch (error: any) {
      if (error.message === "TOKEN_REVOKED") {
        throw new AppError("TOKEN_REVOKED", 401);
      }

      throw new AppError("EXPIRED_TOKEN", 401);
    }
    if (isJwt) {
      const { sub } = decoded as ITokenPayload;
      id = sub;
    }

    if (roles && roles.length > 0) {
      const getRolesUserService = container.resolve(GetRolesUserService);

      let hasRole = false;
      try {
        const userRoles = await getRolesUserService.execute({
          userId: new ObjectID(id),
        });

        for (let i = 0; i < roles.length; i++) {
          const role = roles[i];
          if (userRoles.roles.includes(role)) {
            hasRole = true;
          }
        }
      } catch (error) {}
      if (!hasRole) {
        throw new AppError("UNAUTHORIZED", 401);
      }
    }

    req.user = {
      id,
      isTokenApi: !isJwt,
    };

    return next();
  };
  return handleAuth;
}

export default ensureAuthenticated;
