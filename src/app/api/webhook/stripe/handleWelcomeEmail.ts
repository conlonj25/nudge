import { Resend } from "resend";
import type * as React from "react";
import { WelcomeTemplate } from "~/app/_components/email-templates/welcome-template";

export const handleWelcomeEmail = async () => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: "Nudge <accounts@nudge-app.com>",
      to: ["conlonj25@gmail.com"],
      subject: "Welcome",
      react: WelcomeTemplate({}) as React.ReactElement,
    });

    console.error(error);
  } catch (error) {
    console.error(error);
  }
};
