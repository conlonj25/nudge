import * as React from "react";

export const WelcomeTemplate: React.FC = () => (
  <>
    <div>
      <h1>Welcome to Nudge!</h1>
      <p>
        We have received confirmation of your subscription. Thanks for yor
        support!
      </p>
      <p>
        Login to <a href={"https://nudge-app.com/"}>nudge-app.com</a> to enjoy
        full access.
      </p>

      <p>
        Thanks,
        <br />
        The Nudge Team
      </p>
    </div>
  </>
);
