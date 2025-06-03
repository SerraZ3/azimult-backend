export default interface ICreateSettingDTO {
  userId: ObjectID;

  url: string;
  name: string;
  externalId: string;

  method: "POST";
}
