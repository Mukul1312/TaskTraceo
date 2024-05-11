import { LoaderFunctionArgs, json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";
import { auth } from "~/services/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const email = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  console.log(email);

  return json({ email });
};

export default function Dashboard() {
  const { email } = useLoaderData<typeof loader>();
  console.log(email);

  return (
    <div className="bg-white flex justify-center items-center h-screen">
      <h1 className="">Welcome User</h1>
    </div>
  );
}
