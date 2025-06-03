import CheckChatIdService from "@modules/chats/services/CheckChatIdService";
import { Request, Response } from "express";
import { container } from "tsyringe";

async function checkChatId(
  request: Request,
  response: Response
): Promise<Response> {
  const chatId = request.query.data as any;
  const checkChatIdService = container.resolve(CheckChatIdService);
  const chat = await checkChatIdService.execute({
    chatId: chatId,
  });
  return response.status(200).json(chat);
}
export default checkChatId;
