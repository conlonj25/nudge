import { Resend } from "resend";
import type * as React from "react";
import { WelcomeTemplate } from "~/app/_components/email-templates/welcome-template";

export const handleWelcomeEmail = async ({ email }: { email: string }) => {
  console.warn("HANDLE WELCOME EMAIL");
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: "Nudge <accounts@nudge-app.com>",
      to: [email],
      subject: "Welcome",
      react: WelcomeTemplate({}) as React.ReactElement,
    });

    console.error(error);
  } catch (error) {
    console.error(error);
  }
};
