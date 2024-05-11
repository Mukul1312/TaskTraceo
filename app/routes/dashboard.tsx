import { LoaderFunctionArgs, json } from "@remix-run/node"; // or cloudflare/deno
// import { useLoaderData } from "@remix-run/react";
import { Carousel } from "~/components/carousel";
import { TaskCarousel } from "~/components/taskCarousel";
import { auth } from "~/services/auth.server";
import { useState } from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const email = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return json({ email });
};

interface TaskDetails {
  taskName: string;
  progressPerc: number;
  remaningDays: number;
  themeColor: string;
}

const data: TaskDetails[] = [
  {
    taskName: "UI Design",
    progressPerc: 80,
    remaningDays: 10,
    themeColor: "red",
  },
  {
    taskName: "Backend Development",
    progressPerc: 60,
    remaningDays: 5,
    themeColor: "green",
  },
  {
    taskName: "Database Setup",
    progressPerc: 30,
    remaningDays: 8,
    themeColor: "blue",
  },
  {
    taskName: "Testing",
    progressPerc: 20,
    remaningDays: 7,
    themeColor: "yellow",
  },
  {
    taskName: "Frontend Integration",
    progressPerc: 40,
    remaningDays: 6,
    themeColor: "orange",
  },
  {
    taskName: "API Documentation",
    progressPerc: 50,
    remaningDays: 4,
    themeColor: "pink",
  },
  {
    taskName: "Bug Fixing",
    progressPerc: 10,
    remaningDays: 9,
    themeColor: "green",
  },
  {
    taskName: "Deployment",
    progressPerc: 70,
    remaningDays: 3,
    themeColor: "grey",
  },
  {
    taskName: "User Acceptance Testing",
    progressPerc: 25,
    remaningDays: 2,
    themeColor: "green",
  },
  {
    taskName: "Final Review",
    progressPerc: 90,
    remaningDays: 1,
    themeColor: "brown",
  },
];

interface DailyTaskDetails {
  taskName: string;
}

const dailyTaskData: DailyTaskDetails[] = [
  { taskName: "Workout" },
  { taskName: "Reading" },
  { taskName: "Meditation" },
  { taskName: "Cooking" },
  { taskName: "Writing" },
  { taskName: "Coding" },
  { taskName: "Walking" },
  { taskName: "Drawing" },
  { taskName: "Learning" },
  { taskName: "Listening to Music" },
];

export default function Dashboard() {
  const [taskDone, setTaskDone] = useState<DailyTaskDetails[] | undefined>([]);

  const clickDone = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const svgId = (e.target as SVGSVGElement).id;
    console.log(svgId);
    setTaskDone((prevState) => {
      prevState && prevState.push({ taskName: svgId });
      return prevState;
    });
    console.log("Inside click handler", taskDone);
  };

  console.log("Inside dashboard", taskDone);

  return (
    <div className="pt-5 h-screen overflow-hidden">
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
      <div className="mx-5">
        <p className="text-[24px] font-bold">Welcome Phillip</p>
        <p className="text-[16px] font-medium text-[#474747]">Have a nice day !</p>
      </div>
      <div className="ml-5 mt-5">
        <p className="text-[20px] font-semibold leading-10">My Priority Task</p>
        <Carousel carouselItems={data} />
      </div>
      <div className="mx-5 mt-5">
        <p className="text-[20px] font-semibold leading-10">Daily Task</p>
        <TaskCarousel carouselItems={dailyTaskData} taskDone={taskDone} clickDone={clickDone} />
      </div>
    </div>
  );
}
