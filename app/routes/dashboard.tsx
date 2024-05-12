import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Carousel } from "~/components/carousel";
import { TaskCarousel } from "~/components/taskCarousel";
import { auth } from "~/services/auth.server";
import { AppBar } from "~/components/appBar";
import { useLoaderData, useRouteError } from "@remix-run/react";
import User from "~/.server/models/user.model";
import formatDate from "~/utils/formatDate";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const response2 = await User.getUserById(user.id);

  if (!response2) throw new Error("Can't able to load Data");

  return json(response2);
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const id = String(formData.get("id")); // TODO: Need to add logic to clicking done.
  const status = String(formData.get("status"));

  // if (status == true) throw new Error("Already Completed this task" + id);

  const user = User.setDailyTaskDone("663fceed015d1c741d6284a9", id, status === "true");

  return json({
    user: user,
    message: "Task Done",
  });
};

export default function Dashboard() {
  const loaderData = useLoaderData<typeof loader>();

  const urgentTaskList = loaderData.urgentImportantTask.map((task) => {
    return {
      taskName: task.name,
      progressPerc: task.progress,
      remaningDays: task.remainingTime,
      themeColor: task.theme,
      id: task._id,
    };
  });

  const dailyTaskList = loaderData.dailyTask.map((task) => {
    return {
      taskName: task.name,
      status: task.status,
      id: task._id,
    };
  });

  const formattedDate = formatDate(new Date()); // Format: Saturday, Feb 20 2024

  return (
    <div className="pt-5 h-screen overflow-hidden relative">
      <div className="flex flex-row justify-between items-center mx-5">
        <span className="text-[12px] font-normal">{formattedDate}</span>
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
        <p className="text-[24px] font-bold">Welcome {loaderData.name}</p>
        <p className="text-[16px] font-medium text-[#474747]">Have a nice day !</p>
      </div>
      <div className="ml-5 mt-5">
        <p className="text-[20px] font-semibold leading-10">My Priority Task</p>
        <Carousel carouselItems={urgentTaskList} />
      </div>
      <div className="mx-5 mt-5">
        <p className="text-[20px] font-semibold leading-10">Daily Task</p>
        <TaskCarousel carouselItems={dailyTaskList} />
      </div>
      <AppBar activate="DASHBOARD" />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  console.log(error);

  return <h1>Some Error Occur. Please check console</h1>;
}
