import AdminCreateUserService from "@modules/users/services/AdminCreateUserService";
import AdminListUserService from "@modules/users/services/AdminListUserService";
import AdminShowUserService from "@modules/users/services/AdminShowUserService";
import AdminUpdateUserService from "@modules/users/services/AdminUpdateUserService";
import ListUserWithPendingConfirmationEmailService from "@modules/users/services/ListUserWithPendingConfirmationEmailService";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { TUserRole } from "../../typeorm/schemas/User";
import AdminShowFileService from "@modules/users/services/AdminShowFileService";

export default class AdminUserController {
  public async store(req: Request, res: Response): Promise<Response> {
    const {
      email,
      password,
      fullName,
      referralCode,
      // roles
    } = req.body;

    const adminCreateUserService = container.resolve(AdminCreateUserService);

    const data = await adminCreateUserService.execute({
      email,
      password,
      fullName,
      referralCode,
      // roles,
    });

    return res.status(200).json(data);
  }

  public async image(req: Request, res: Response): Promise<Response> {
    const fileName = req.params.fileName;

    const adminListUserService = container.resolve(AdminShowFileService);

    const data = await adminListUserService.execute({ fileName });
    return res.status(200).json(data);
  }
  public async index(req: Request, res: Response): Promise<Response> {
    const pagination = req.pagination;

    // const userId = req.user.id as any;
    const role = (req.params.role || req.query.role) as TUserRole;
    const { fullName, email, cpfCnpj } = req.query as any;
    const isActive = req.query.isActive as any;

    const adminListUserService = container.resolve(AdminListUserService);

    const data = await adminListUserService.execute({
      data: {
        ...pagination,
        fullName,
        email,
        cpfCnpj,
        // userId,
        role,
        isActive,
      },
    });
    return res.status(200).json(data);
  }
  public async listByEmailConfirmationPending(req: Request, res: Response): Promise<Response> {
    const pagination = req.pagination;

    const listUserWithPendingConfirmationEmailService = container.resolve(ListUserWithPendingConfirmationEmailService);

    const data = await listUserWithPendingConfirmationEmailService.execute();
    return res.status(200).json(data);
  }
  public async show(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    const adminShowUserService = container.resolve(AdminShowUserService);

    const data = await adminShowUserService.execute({
      id,
    });

    return res.status(200).json(data);
  }
  public async update(req: Request, res: Response): Promise<Response> {
    const email = req.params.email as string;
    const { isActive, roles, email: newEmail, fullName } = req.body;

    const adminUpdateUserService = container.resolve(AdminUpdateUserService);

    const data = await adminUpdateUserService.execute({
      email,
      data: { isActive, roles, email: newEmail, fullName },
    });

    return res.status(200).json(data);
  }
}
