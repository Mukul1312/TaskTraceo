import { Authenticator, AuthorizationError } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import User from "~/.server/models/user.model";

import { sessionStorage } from "~/services/session.server";

export const auth = new Authenticator<string>(sessionStorage);

auth.use(
  new FormStrategy(async ({ form }) => {
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    // replace the code below with your own authentication logic
    if (!password) throw new AuthorizationError("Password is required");
    if (!email) throw new AuthorizationError("Email is required");

    const user = await User.getUserByEmail(email);

    if (!user) {
      throw new Error("User doesn't exist");
    }

    const validPassword = password === user.password;

    if (!validPassword) {
      throw new Error("Invalid email or password");
    }

    return email as string;
  })
);
