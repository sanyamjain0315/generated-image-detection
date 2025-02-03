import dotenv from "dotenv";
import { MailtrapClient } from "mailtrap";

// Load environment variables
dotenv.config();

const TOKEN = process.env.MAILTRAP_API_TOKEN;

if (!TOKEN) {
  console.error("❌ Mailtrap API token is missing! Check your .env file.");
  process.exit(1);
}

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
  endpoint: "https://send.api.mailtrap.io",
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Dashrath",
};

