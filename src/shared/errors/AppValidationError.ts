import messageEmitter, { IError } from '@shared/utils/messageEmitter';
import { IValidation } from '@shared/utils/validation';

class AppValidationError {
  public readonly statusCode: number;

  public readonly errors: Array<IValidation>;

  public readonly code: string;

  constructor(
    errors: Array<IValidation> = [],
    code = 'VALIDATION_ERROR',
    statusCode = 400,
  ) {
    this.errors = errors;
    this.code = code;
    this.statusCode = statusCode;
  }

  /**
   * @description Obtém mensagem definida na criação do objeto ou obtém a mensagem
   * no momento e a retorna de acordo com a correta linguagem a partir
   * do locale passado ('pt' | 'en')
   */
  public getValidation(locale = 'pt'): IError[] {
    return messageEmitter.validation(this.errors, locale);
  }
}

export default AppValidationError;
