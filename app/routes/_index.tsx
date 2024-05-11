import type { MetaFunction } from "@remix-run/node";
import { Logo } from "~/components/logo";
import { db } from "~/.server/data";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Task Traceo" }, { name: "description", content: "Task Management App!" }];
};

export async function loader() {
  const response = db.user.getAll();
  return response;
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  console.log(data);
  return (
    <div className="bg-white flex justify-center items-center h-screen">
      <div className="">
        <Logo />
      </div>
    </div>
  );
}
