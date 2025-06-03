import { ObjectID } from "typeorm";

export default interface ICreateUserTokenDTO {
  userId: ObjectID;
  token: string;
  isRevoked: boolean;
  type: string;
  description?: string;
  tokenExpiration?: string | Date;
  key?: string;
}
