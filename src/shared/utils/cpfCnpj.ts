import { cnpj, cpf } from "cpf-cnpj-validator";
export function onlyNumber(value: string): string {
  return value.replace(/\D/g, "");
}
export function isCpf(value: string): boolean {
  const valueClean = onlyNumber(value);
  if (valueClean.length <= 11) {
    return true;
  }
  return false;
}
export function isCpfValid(value: string): boolean {
  const valueClean = onlyNumber(value);
  if (cpf.isValid(valueClean)) {
    return true;
  }
  return false;
}
export function isCnpj(value: string): boolean {
  const valueClean = onlyNumber(value);
  if (valueClean.length > 11) {
    return true;
  }
  return false;
}
export function isCnpjValid(value: string): boolean {
  const valueClean = onlyNumber(value);
  if (cnpj.isValid(valueClean)) {
    return true;
  }
  return false;
}
export function isCpfOrCnpj(value: string): { type: "cpf" | "cnpj"; isValid: boolean; formatted: string } {
  let type: "cpf" | "cnpj" = "cpf";
  let isValid: boolean = false;
  let formatted = "";
  if (isCpf(value)) type = "cpf";
  if (isCnpj(value)) type = "cnpj";
  if (type === "cpf") {
    isValid = isCpfValid(value);
    formatted = cpf.format(value);
  }
  if (type === "cnpj") {
    isValid = isCnpjValid(value);
    formatted = cnpj.format(value);
  }

  return { type, isValid, formatted };
}

const cpfCnpj = {
  isCpfOrCnpj,
  isCnpj,
  isCnpjValid,
  isCpf,
  isCpfValid,
  onlyNumber,
};
export default cpfCnpj;
