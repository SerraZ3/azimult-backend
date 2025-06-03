import { TStatusTurismAttraction } from "../infra/typeorm/schemas/TurismAttraction";

export default interface ICreateTurismAttractionDTO {
  turismAttraction: Date;

  status: TStatusTurismAttraction;

  observation?: string;
  quantity: number;
}
