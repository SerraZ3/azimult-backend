import ormConfig from "@config/ormconfig";
import { DataSource } from "typeorm";

const dataSourceDB = new DataSource(ormConfig);

export default dataSourceDB;
