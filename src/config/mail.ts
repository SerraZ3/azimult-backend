interface IMailConfig {
  driver:
    | "ethereal"
    // | "ses"
    | "godaddy"
    | "gmail"
    | "gmailOAuth2";
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
  gmailAuth: {
    type: "OAuth2";
    user: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
    redirectUri: string;
  };
  smtp: {
    pool: true;
    port: number;
    host: string;
    secure: false;
    auth: {
      user: string;
      pass: string;
    };
    maxConnections: number;
    maxMessages: number;
    rateLimit: number;
  };
}

export default {
  driver: process.env.MAIL_DRIVER || "gmailOAuth2",

  defaults: {
    from: {
      email: process.env.MAIL_SENDER_EMAIL || "",
      name: process.env.MAIL_SENDER_NAME || "",
    },
  },
  gmailAuth: {
    type: "OAuth2",
    user: process.env.MAIL_SENDER_EMAIL || "",
    clientId: process.env.GMAIL_CLIENT_ID || "",
    clientSecret: process.env.GMAIL_CLIENT_SECRET || "",
    refreshToken: process.env.GMAIL_REFRESH_TOKEN || "",
    redirectUri: process.env.GMAIL_REDIRECT_URI || "",
  },
  smtp: {
    pool: true,
    port: process.env.SMTP_PORT || 2525,

    host: process.env.SMTP_HOST,
    secure: false,
    auth: {
      user: process.env.SMTP_SENDER,
      pass: process.env.SMTP_PASSWORD,
    },
    maxConnections: 5,
    maxMessages: 100,
    rateLimit: 10,
  },
} as IMailConfig;
