import { compare, hash } from "bcrypt";
import crypto from 'crypto';

import IHashProvider from "../models/IHashProvider";

class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string, size: number = 8): Promise<string> {
    return hash(payload, size);
  }
  

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }


public hashCryto(type:string, value: string) {
  return crypto
    .createHash(type)
    .update(value)
    .digest('hex');
}

public  md5(value: string) {
  return this.hashCryto('md5', value);
}

public  sha1(value: string) {
  return this.hashCryto('sha1', value);
}



}

export default BCryptHashProvider;
