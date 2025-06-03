import * as errorsPt from '@shared/resources/locales/pt/errors.json';
import * as successesPt from '@shared/resources/locales/pt/successes.json';
import * as validationsPt from '@shared/resources/locales/pt/validations.json';

import * as errorsEn from '@shared/resources/locales/en/errors.json';
import * as successesEn from '@shared/resources/locales/en/successes.json';
import * as validationsEn from '@shared/resources/locales/en/validations.json';

interface IMessage {
  [key: string]: any;
}
interface ILang {
  [key: string]: IMessage;
}

export default {
  pt: {
    errors: errorsPt,
    successes: successesPt,
    validations: validationsPt,
  },
  en: {
    errors: errorsEn,
    successes: successesEn,
    validations: validationsEn,
  },
} as ILang;
