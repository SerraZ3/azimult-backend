import { ObjectID } from "typeorm";

export default interface IUpdateTokenDTO {
  userId?: ObjectID;
  type?: string;
  token?: string;
  tokenExpiration?: Date;
  description?: string;
  isRevoked?: boolean;
}
