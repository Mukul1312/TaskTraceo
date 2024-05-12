import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Logo } from "~/components/logo";
import { auth } from "~/services/auth.server";

export const meta: MetaFunction = () => {
  return [{ title: "Task Traceo" }, { name: "description", content: "Task Management App!" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  console.log("Index Route running");
  await auth.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });
}

export default function Index() {
  return (
    <div className="bg-white flex justify-center items-center h-screen">
      <div className="">
        <Logo />
      </div>
    </div>
  );
}
