import { container } from "tsyringe";
import "./providers";

import UserTokensRepository from "@modules/users/infra/typeorm/repositories/UserTokensRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import IUserTokensRepository from "@modules/users/repositories/IUserTokensRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

import LogsRepository from "@modules/logs/infra/typeorm/repositories/LogsRepository";
import ILogsRepository from "@modules/logs/repositories/ILogsRepository";
import ISettingsRepository from "@modules/settings/repositories/ISettingsRepository";
import SettingsRepository from "@modules/settings/infra/typeorm/repositories/SettingsRepository";
import SchedulesRepository, { ISchedulesRepository } from "@modules/schedules/infra/typeorm/repositories/SchedulesRepository";
import TurismAttractionsRepository, { ITurismAttractionsRepository } from "@modules/turismAttractions/infra/typeorm/repositories/TurismAttractionsRepository";

container.registerSingleton<IUserTokensRepository>("UserTokensRepository", UserTokensRepository);
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);

container.registerSingleton<ISettingsRepository>("SettingsRepository", SettingsRepository);
container.registerSingleton<ILogsRepository>("LogsRepository", LogsRepository);
container.registerSingleton<ISchedulesRepository>("SchedulesRepository", SchedulesRepository);
container.registerSingleton<ITurismAttractionsRepository>("TurismAttractionsRepository", TurismAttractionsRepository);
