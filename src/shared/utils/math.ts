const BigNumber = require("bignumber.js");
const { ROUND_DOWN, ROUND_UP } = BigNumber.default;

function createMath() {
  function _BN(value: string) {
    return new BigNumber(value);
  }

  /**
   * @description Realiza a transformação de 1 número em string ou number para BigNumber
   * @param {string|number} a
   * @param {string|number} b
   * @returns {BigNumber} result - Objeto BigNumber
   */
  function toBigNumber(a: string) {
    return _BN(a);
  }

  function isNaN(a: string) {
    return _BN(a).isNaN();
  }

  /**
   * @description Realiza um somatório de 2 números grandes utilizando a
   * biblioteca Bignumber.js.
   * @param {string|number} a
   * @param {string|number} b
   * @returns {BigNumber} result - Objeto BigNumber
   */
  function sum(a: string, b: string, fixed = 18, roundDown = false) {
    const _a = _BN(a);
    const _b = _BN(b);
    return BigNumber.sum(_a, _b).toFixed(fixed, roundDown ? ROUND_DOWN : ROUND_UP);
  }

  /**
   * @description Realiza um somatório de 2 números grandes utilizando a
   * biblioteca Bignumber.js.
   * @param {string|number} a
   * @param {string|number} percentagem
   * @returns {BigNumber} result - Objeto BigNumber
   */
  function sumPercentage(a: string, percentage: string, fixed = 18, roundDown = false) {
    const _a = _BN(a);

    const _percentage = _BN(percentage);
    const percentagemOfA = _a.multipliedBy(_percentage).toFixed(fixed, roundDown ? ROUND_DOWN : ROUND_UP);
    return BigNumber.sum(_a, percentagemOfA).toFixed(fixed, roundDown ? ROUND_DOWN : ROUND_UP);
  }

  /**
   * @description Realiza um somatório de 2 números grandes utilizando a
   * biblioteca Bignumber.js.
   * @param {string|number} a
   * @param {string|number} percentagem
   * @returns {BigNumber} result - Objeto BigNumber
   */
  function subPercentage(a: string, percentage: string, fixed = 18, roundDown = false) {
    const _a = _BN(a);

    const _percentage = _BN(percentage);
    const percentagemOfA = _a.multipliedBy(_percentage).toFixed(fixed, roundDown ? ROUND_DOWN : ROUND_UP);
    return _a.minus(percentagemOfA).toFixed(fixed, roundDown ? ROUND_DOWN : ROUND_UP);
  }

  // function sumMany(numbersList, fixed = 18, roundDown = false) {
  //   return BigNumber.default.sum
  //     .apply(null, numbersList)
  //     .toFixed(fixed, roundDown ? ROUND_DOWN : ROUND_UP);
  // }

  /**
   * @description Realiza a multiplicação de 2 números grandes utilizando a
   * biblioteca Bignumber.js.
   * @param {string|number} a
   * @param {string|number} b
   * @returns {BigNumber} result - Objeto BigNumber
   */
  function mul(a: string, b: string, fixed = 18, roundDown = false) {
    const _a = _BN(a);
    const _b = _BN(b);
    return _a.multipliedBy(_b).toFixed(fixed, roundDown ? ROUND_DOWN : ROUND_UP);
  }

  /**
   * @description Realiza a subtração de 2 números grandes utilizando a
   * biblioteca Bignumber.js.
   * @param {string|number} a
   * @param {string|number} b
   * @returns {BigNumber} result - Objeto BigNumber
   * @returns null - Se b > a
   */
  function sub(a: string, b: string, fixed = 18, roundDown = false) {
    const _a = _BN(a);
    const _b = _BN(b);
    if (_b.isLessThanOrEqualTo(_a)) {
      return _a.minus(_b).toFixed(fixed, roundDown ? ROUND_DOWN : ROUND_UP);
    } else {
      return null;
    }
  }

  /**
   * @description Realiza a divisão de 2 números grandes utilizando a
   * biblioteca Bignumber.js.
   * @param {string|number} a
   * @param {string|number} b
   * @returns {BigNumber} result - Objeto BigNumber
   * @returns null - Se b < 0
   */
  function div(a: string, b: string, fixed = 18, roundDown = false) {
    const _a = _BN(a);
    const _b = _BN(b);
    if (_b > 0) {
      return _a.div(_b).toFixed(fixed, roundDown ? ROUND_DOWN : ROUND_UP);
    } else {
      return null;
    }
  }

  /**
   * @description Realiza a comparação se a > b e retorna o resultado
   * @param {string|number} a
   * @param {string|number} b
   * @returns {boolean}
   */
  function isGreaterThan(a: string, b: string) {
    const _a = _BN(a);
    const _b = _BN(b);
    return _a.isGreaterThan(_b);
  }

  /**
   * @description Realiza a comparação se a >= b e retorna o resultado
   * @param {string|number} a
   * @param {string|number} b
   * @returns {boolean}
   */
  function isGreaterThanOrEqualTo(a: string, b: string) {
    const _a = _BN(a);
    const _b = _BN(b);
    return _a.isGreaterThanOrEqualTo(_b);
  }

  /**
   * @description Realiza a comparação se a < b e retorna o resultado
   * @param {string|number} a
   * @param {string|number} b
   * @returns {boolean}
   */
  function isLessThan(a: string, b: string) {
    const _a = _BN(a);
    const _b = _BN(b);
    return _a.isLessThan(_b);
  }

  /**
   * @description Realiza a comparação se a <= b e retorna o resultado
   * @param {string|number} a
   * @param {string|number} b
   * @returns {boolean}
   */
  function isLessThanOrEqualTo(a: string, b: string) {
    const _a = _BN(a);
    const _b = _BN(b);
    return _a.isLessThanOrEqualTo(_b);
  }

  /**
   * @description Realiza a comparação se a == b e retorna o resultado
   * @param {string|number} a
   * @param {string|number} b
   * @returns {boolean}
   */
  function isEqualTo(a: string, b: string) {
    const _a = _BN(a);
    const _b = _BN(b);
    return _a.isEqualTo(_b);
  }

  /**
   *
   * @param {*} a
   * @param {Number} [fixed=18]
   */
  function fixit(a: string, fixed = 18, roundDown = false) {
    const _a = _BN(a);
    return _a.toFixed(fixed, roundDown ? ROUND_DOWN : ROUND_UP);
  }

  /**
   * Incluso o min, excluso o max
   */
  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  return {
    sum,
    isNaN,
    // sumMany,
    mul,
    sub,
    div,
    fixit,
    toBigNumber,
    isGreaterThan,
    isLessThan,
    isGreaterThanOrEqualTo,
    isLessThanOrEqualTo,
    isEqualTo,
    getRandomInt,
    sumPercentage,
    subPercentage,
  };
}

export default createMath;
