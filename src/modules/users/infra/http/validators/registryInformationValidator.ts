import AppValidationError from "@shared/errors/AppValidationError";
import { NextFunction, Request, Response } from "express";
import { validateAll } from "indicative/validator";

export default async function registryInformationValidator(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let rules = {
      person: "required|object",
      "person.first_name": "required|string",
      "person.last_name": "required|string",
      "person.birthdate": "required|string",
      "person.cpf": "required|string",
      "person.rg": "required|string",
      "person.rg_uf": "required|string",
      address_company: "object",
      "address_company.cep": "required|string",
      "address_company.street": "required|string",
      "address_company.neighborhood": "required|string",
      "address_company.number": "required|string",
      "address_company.complement": "string",
      "address_company.state": "required|string",
      "address_company.city": "required|string",
      "address_company.country": "required|string",
      company: "object",
      "company.cnpj": "required|string",
      "company.industry_type": "required|string",
      "company.industry_sector": "required|string",
      "company.company_size": "required|string",
    };
    await validateAll(req.body, rules);
    return next();
  } catch (error: any) {
    throw new AppValidationError(error);
  }
}
