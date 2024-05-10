import type { MetaFunction } from "@remix-run/node";
import { Logo } from "~/components/logo";

export const meta: MetaFunction = () => {
  return [{ title: "Task Traceo" }, { name: "description", content: "Task Management App!" }];
};

export default function Index() {
  return (
    <div className="bg-white flex justify-center items-center h-screen">
      <div className="">
        <Logo />
      </div>
    </div>
  );
}
