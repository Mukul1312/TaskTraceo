import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import User from "~/.server/models/user.model";
import { AppBar } from "~/components/appBar";
import { auth } from "~/services/auth.server";
import formatDate from "~/utils/formatDate";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const response = await User.getUserById(user.id);

  return json(response);
};

export default function Profile() {
  const loaderData = useLoaderData<typeof loader>();

  if (!loaderData) return <div>User not found</div>;
  console.log(loaderData);

  const formattedDate = formatDate(new Date()); // Format: Saturday, Feb 20 2024

  return (
    <div className="pt-5 h-screen overflow-hidden relative">
      <div className="flex flex-row justify-between items-center mx-5">
        <span className="text-[12px] font-normal">{formattedDate}</span>
      </div>
      <div className="mx-5 mt-5">
        <p className="text-[24px] font-bold">Welcome {loaderData.name}</p>
        <p className="text-[16px] font-medium text-[#474747]">Have a nice day !</p>
      </div>
      <AppBar activate="PROFILE" />
    </div>
  );
}
