import { TStatusTurismAttraction } from "../infra/typeorm/schemas/TurismAttraction";

export default interface IUpdateTurismAttractionDTO {
  turismAttraction?: Date;

  status?: TStatusTurismAttraction;

  observation?: string;
  quantity?: number;
}
