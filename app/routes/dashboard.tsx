import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
// import { useLoaderData } from "@remix-run/react";
import { Carousel } from "~/components/carousel";
import { TaskCarousel } from "~/components/taskCarousel";
import { auth } from "~/services/auth.server";
import { useState } from "react";
import { AppBar } from "~/components/appBar";
import data from "~/.server/data";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const response = data;

  return response;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const name = formData.get("name");

  return `${name} task done`;
};
const dailyTaskData: string[] = [
  "Workout",
  "Reading",
  "Meditation",
  "Cooking",
  "Writing",
  "Coding",
  "Walking",
  "Drawing",
  "Learning",
  "Listening to Music",
];

export default function Dashboard() {
  const [taskDone, setTaskDone] = useState<string[]>([""]);
  const loaderData = useLoaderData<typeof loader>();

  const clickDone = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const svgId = (e.target as SVGSVGElement).id;
    console.log(svgId);
    if (!taskDone?.includes(svgId)) setTaskDone((prevState) => [...prevState, svgId]);
    else setTaskDone((prevState) => prevState.filter((item) => item != svgId));
  };

  return (
    <div className="pt-5 h-screen overflow-hidden relative">
      <div className="flex flex-row justify-between items-center mx-5">
        <span className="text-[12px] font-normal">Saturday, Feb 20 2024</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
          />
        </svg>
      </div>
      <div className="mx-5 mt-5">
        <p className="text-[24px] font-bold">Welcome Phillip</p>
        <p className="text-[16px] font-medium text-[#474747]">Have a nice day !</p>
      </div>
      <div className="ml-5 mt-5">
        <p className="text-[20px] font-semibold leading-10">My Priority Task</p>
        <Carousel carouselItems={loaderData} />
      </div>
      <div className="mx-5 mt-5">
        <p className="text-[20px] font-semibold leading-10">Daily Task</p>
        <TaskCarousel carouselItems={dailyTaskData} taskDone={taskDone} clickDone={clickDone} />
      </div>
      <AppBar activate="DASHBOARD" />
    </div>
  );
}
