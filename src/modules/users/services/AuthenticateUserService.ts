import authConfig from "@config/auth";
import IHashProvider from "@shared/container/providers/HashProvider/models/IHashProvider";
import AppError from "@shared/errors/AppError";
import emitter, { ISuccess } from "@shared/utils/messageEmitter";
import time from "@shared/utils/time";
import { sign } from "jsonwebtoken";
import { RateLimiterRedis } from "rate-limiter-flexible";
import redis from "redis";
import { inject, injectable } from "tsyringe";
import User from "../infra/typeorm/schemas/User";
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokensRepository from "../repositories/IUserTokensRepository";

interface IRequest {
  email: string;
  password: string;
  ip: string;
}

interface IResponse extends ISuccess {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password, ip }: IRequest): Promise<IResponse> {
    const redisClient = redis.createClient({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASS || undefined,
    });

    const limiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: "ratelimitsessions",
      points: 5,
      duration: 1800,
    });

    const attempt = await limiter.get(ip);
    if (attempt?.remainingPoints === 0) throw new AppError("MANY_LOGIN_REQUEST", 429);
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      await limiter.consume(ip);
      throw new AppError("INVALID_EMAIL_OR_PASSWORD", 400);
    }
    if (!user.isActive) {
      throw new AppError("USER_NOT_ACTIVE", 400);
    }
    if (!user.password) {
      throw new AppError("UPDATE_PASSWORD", 400);
    }

    const passwordMatched = await this.hashProvider.compareHash(password, user.password);
    if (!passwordMatched) {
      await limiter.consume(ip);
      throw new AppError("INVALID_EMAIL_OR_PASSWORD", 400);
    }
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: `${user._id}`,
      expiresIn,
    });

    const tokenActivated = await this.userTokensRepository.findActiveTokenAuth(user._id);

    if (tokenActivated) {
      Object.assign(tokenActivated, { isRevoked: true });
      await this.userTokensRepository.save(tokenActivated._id, tokenActivated);
    }
    const tokenExpiration = time.datePlusMinutes(expiresIn === "1h" ? 60 : 30);
    const tokenCreated = await this.userTokensRepository.create({
      type: "authentication",
      token,
      isRevoked: false,
      tokenExpiration,
      userId: user._id,
    });

    return { ...emitter.success("SUCCESS_LOGIN"), user, token };
  }
}

export default AuthenticateUserService;
