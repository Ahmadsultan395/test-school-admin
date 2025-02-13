import { logger as console } from "firebase-functions/v1";
import * as postmark from "postmark";

const serverToken = "2cdee6cc-1b7e-4617-bdb7-7b20aa266b0c";
const client = new postmark.ServerClient(serverToken);

export const TEMPLATE = {
  VERIFY_UPDATE_EMAIL: 33952453,
  WELCOME_EMAIL: 33953251,
  VERIFY_EMAIL: 33781991,
}

export async function mailer(
  sendTo: string,
  emailData: any,
) {
  try {
    await client.sendEmailWithTemplate({
      "TemplateId": 34798224,
      "TemplateModel": emailData,
      "From": "support@bluequest.co",
      "To": sendTo
    })
  } catch (error) {
    console.error('MAILER ERROR', error)
  }
}