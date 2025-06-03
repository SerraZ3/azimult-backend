import { IPagination } from "@shared/infra/http/middleware/pagination";
import { ObjectID } from "typeorm";

export default interface IListTurismAttractionDTO extends IPagination {
  // isActive?: boolean;
  userId?: ObjectID | string;
}
