import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";

const { DB_URL } = process.env;
const ormConfig: MongoConnectionOptions = {
  type: "mongodb",
  url: DB_URL || "",
  useNewUrlParser: true,
  logging: true,
  synchronize: true,
  useUnifiedTopology: true,
  // ssl: true,
  entities: ["src/modules/**/infra/typeorm/schemas/*.{js,ts}", "src/shared/container/providers/**/typeorm/schemas/*.{js,ts}"],
};

export default ormConfig;
