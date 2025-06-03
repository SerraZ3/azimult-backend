export interface IValidation {
  field: string;
  validation: string;
  message: string;
}
const validation = {
  convertId: (error: IValidation): string => `${error.field}.${error.validation}`,
};
export default validation;
