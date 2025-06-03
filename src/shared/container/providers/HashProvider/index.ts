import { container } from "tsyringe";
import IHashProvider from "./models/IHashProvider";
import BCryptHashProvider from "./implementations/BCryptHashProvider";

const providers = {
  bCryptHashProvider: container.resolve(BCryptHashProvider),
};

container.registerInstance<IHashProvider>(
  "HashProvider",
  providers.bCryptHashProvider
);
