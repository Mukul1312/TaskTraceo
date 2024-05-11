import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { InputWithLeadIcon } from "~/components/InputWithLeadIcon";
import { Logo } from "~/components/logo";

import { auth, sessionStorage } from "~/services/auth.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  await auth.authenticate("form", request, {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  });
};

type LoaderError = { message: string } | null;
export const loader = async ({ request }: LoaderFunctionArgs) => {
  await auth.isAuthenticated(request, { successRedirect: "/private" });
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const error = session.get(auth.sessionErrorKey) as LoaderError;
  return json({ error });
};

export default function Screen() {
  const { error } = useLoaderData<typeof loader>();

  return (
    <div className="h-screen px-5 w-screen">
      <Form method="post" className="h-full flex flex-col justify-center items-center">
        {error ? <div className="text-red-600">{error.message}</div> : null}
        <div className="text-center">
          <Logo />
        </div>
        <div className="flex flex-col gap-5 w-full">
          <p className="text-[#474747] font-medium text-[14px] text-center">Login to your account</p>
          <div className="flex flex-col gap-5 w-full">
            <InputWithLeadIcon
              inputName="email"
              type="email"
              placeholder="Email"
              //@ts-expect-error: type mismatch
              svg={
                <svg
                  ref={null}
                  width="18"
                  height="15"
                  viewBox="0 0 18 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.1158 0C14.2333 0 15.3083 0.441667 16.0992 1.23417C16.8908 2.025 17.3333 3.09167 17.3333 4.20833V10.7917C17.3333 13.1167 15.4417 15 13.1158 15H4.88334C2.55751 15 0.666672 13.1167 0.666672 10.7917V4.20833C0.666672 1.88333 2.54917 0 4.88334 0H13.1158ZM14.0583 4.33333C13.8833 4.32417 13.7167 4.38333 13.5908 4.5L9.83334 7.5C9.35001 7.90083 8.65751 7.90083 8.16667 7.5L4.41667 4.5C4.15751 4.30833 3.79917 4.33333 3.58334 4.55833C3.35834 4.78333 3.33334 5.14167 3.52417 5.39167L3.63334 5.5L7.425 8.45833C7.89167 8.825 8.45751 9.025 9.05 9.025C9.64084 9.025 10.2167 8.825 10.6825 8.45833L14.4417 5.45L14.5083 5.38333C14.7075 5.14167 14.7075 4.79167 14.4992 4.55C14.3833 4.42583 14.2242 4.35 14.0583 4.33333Z"
                    fill="white"
                  />
                </svg>
              }
            />
            <InputWithLeadIcon
              inputName="password"
              type="password"
              placeholder="Password"
              //@ts-expect-error: type mismatch
              svg={
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.9873 0C10.5446 0 12.6023 2.01232 12.6023 4.49667V5.77445C14.0376 6.22247 15.0833 7.52178 15.0833 9.07367V13.1878C15.0833 15.109 13.4905 16.6667 11.5268 16.6667H4.474C2.50946 16.6667 0.916664 15.109 0.916664 13.1878V9.07367C0.916664 7.52178 1.96329 6.22247 3.39774 5.77445V4.49667C3.4062 2.01232 5.46389 0 7.9873 0ZM7.99576 9.4869C7.58931 9.4869 7.25906 9.80986 7.25906 10.2074V12.0458C7.25906 12.4516 7.58931 12.7745 7.99576 12.7745C8.41069 12.7745 8.74093 12.4516 8.74093 12.0458V10.2074C8.74093 9.80986 8.41069 9.4869 7.99576 9.4869ZM8.00423 1.4492C6.28526 1.4492 4.88807 2.80731 4.87961 4.48011V5.59475H11.1204V4.49667C11.1204 2.8156 9.7232 1.4492 8.00423 1.4492Z"
                    fill="white"
                  />
                </svg>
              }
            />
          </div>
          <span className="text-black self-end">Forgot password?</span>
          <button className="bg-secondary py-3 text-white rounded-lg ">Log In</button>
        </div>
      </Form>
    </div>
  );
}

{
  /* user@domain.tld */
  /*test */
}
