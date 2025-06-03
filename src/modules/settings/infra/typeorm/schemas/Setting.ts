import { Exclude, plainToClass } from "class-transformer";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn } from "typeorm";

// export type TOrigin = "bank" | "broker" | "wallet";
export type TSettingType = "MAINTENANCE" | "FEES" | "COINS";

export interface IMaintenance {
  in: boolean;
  out: boolean;
  swap: boolean;
  userTest: string[];
}
export interface IFees {
  in: string;
  out: string;
  swap: string;
  referral: string;
}
export interface ICoins {
  [key: string]: {
    tag: string;
    name: string;
    icon: string;
    markets: string[];
    fiatDecimals: number;
    lastPrice: string;
    var: string;
    volumeUSD: string;
    volumeBRL: string;
    networks: {
      network: string;
      networkName: string;
      withdrawFee: string;
      contractAddress?: boolean | string;
      depositAllowed: number;
      withdrawAllowed: number;
    }[];
  };
}
@Entity({ name: "settings" })
class Setting {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  type: TSettingType;

  @Column()
  data: IMaintenance | IFees | ICoins;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  @Exclude()
  deletedAt: Date;

  toJSON(): Setting {
    return plainToClass(Setting, this);
  }
}

export default Setting;
