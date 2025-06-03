import language from "@config/lang";

import validations, { IValidation } from "@utils/validation";

interface IMessages {
  [code: string]: Record<string, string>;
}
export interface IError {
  code: string;
  message: string;
}
export interface ISuccess {
  status: string;
  code: string;
  message: string;
}
/**
 * Objeto que controla emissão de mensagem de sucesso, validação e erro
 */
const messageEmitter = {
  /**
   * Seleciona arquivos de mensagem de acordo com a lingua
   * @param lang  Linguagem de tradução. Ex: 'en', 'pt'
   */
  getLanguage: (lang = "pt"): IMessages => {
    return language[lang];
  },
  /**
   * Pega a mensagem no arquivo
   * @param type Arquivo que irá buscar code. Ex: 'successes', 'errors' e 'validations'
   * @param code Chave no arquivo de x.json. Ex: 'SUCCESS_EMAIL_CONFIRMED', 'INVALID_INPUT'
   * @param lang Linguagem de tradução. Ex: 'en', 'pt'
   */
  getMessage(type: string, code: string, lang = "pt"): string {
    const messages = this.getLanguage(lang);
    return messages[type][code];
  },
  /**
   * Mensagem de sucesso
   * @param code Chave no arquivo de successes.json. Ex: 'SUCCESS_EMAIL_CONFIRMED'
   * @param lang Linguagem de tradução. Ex: 'en', 'pt'
   * @returns Ex: {code:"SUCCESS_EMAIL_CONFIRMED", message: "Email confirmed successfully!"}
   */
  success(code: string, lang = "pt"): ISuccess {
    return {
      status: "success",
      code,
      message: this.getMessage("successes", code, lang),
    };
  },
  /**
   * Mensagem de erro
   * @param code Chave no arquivo de errors.json. Ex: 'INVALID_INPUT'
   * @param lang Linguagem de tradução. Ex: 'en', 'pt'
   * @returns Ex: {code:"INVALID_COIN_TYPE", message: "Invalid coin type"}
   */
  error(code = "SERVER_ERROR", lang = "pt"): IError {
    return { code, message: this.getMessage("errors", code, lang) };
  },
  /**
   * Mensagem de validação
   * @param errors Array com objeto contendo code e mensagens de erros
   * @param lang Linguagem de tradução. Ex: 'en', 'pt'
   * @returns Ex: [{code:"email.unique", message: "E-mail already exists"},{code:"email.required", message: "E-mail is required"}]
   */
  validation(errors: IValidation[], lang = "pt"): Array<IError> {
    return errors.map((error) => {
      const code = validations.convertId(error);
      const message = this.getMessage("validations", code, lang);
      if (!message) return { code, message: error.message };
      return { code, message };
    });
  },
};

export default messageEmitter;
