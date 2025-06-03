import messageEmitter from "@shared/utils/messageEmitter";

class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly errors: Array<Record<string, unknown>>;

  public readonly code: string;

  constructor(
    code = "CODE_NOT_FOUND",
    statusCode = 400,
    errors: Array<Record<string, unknown>> = [],
    message = ""
  ) {
    this.code = code;
    this.statusCode = statusCode;
    this.errors = errors;
    this.message = message;
  }

  /**
   * @description Obtém mensagem definida na criação do objeto ou obtém a mensagem
   * no momento e a retorna de acordo com a correta linguagem a partir
   * do locale passado ('pt' | 'en')
   */
  public getMessage(locale = "pt"): string {
    if (this.message) {
      return this.message;
    }
    return messageEmitter.getMessage("errors", this.code, locale);
  }
}

export default AppError;
