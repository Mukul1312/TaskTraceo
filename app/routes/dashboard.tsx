import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Carousel } from "~/components/carousel";
import { TaskCarousel } from "~/components/taskCarousel";
import { auth, User as UserType } from "~/services/auth.server";
import { AppBar } from "~/components/appBar";
import { isRouteErrorResponse, useLoaderData, useNavigate, useRouteError } from "@remix-run/react";
import User from "~/.server/models/user.model";
import formatDate from "~/utils/formatDate";
import DailyTask from "~/.server/models/dailyTask.model";
import UrgentTask from "~/.server/models/urgentTask.model";
import { sessionStorage } from "~/services/session.server";
import { object } from "zod";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  console.log("DASHBOARD: LOADER: RUNNING");
  const user = await auth.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  console.log("DASHBOARD: LOADER: USER", user);

  const dailyTaskList = await DailyTask.getAllDailyTask(user.id);
  const urgentTaskList = await UrgentTask.getAllUrgentTask(user.id);

  console.log("DASHBOARD: LOADER: GET RESPOSNE", dailyTaskList, urgentTaskList);

  if (!(dailyTaskList && urgentTaskList)) {
    throw new Error("Can't able to load Data");
  }

  return json({
    user: user,
    dailyTask: dailyTaskList,
    urgentImportantTask: urgentTaskList,
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const id = String(formData.get("id")); // TODO: Need to add logic to clicking done.
  const status = String(formData.get("status"));

  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const user: UserType = session.get(auth.sessionKey);

  // if (status == true) throw new Error("Already Completed this task" + id);

  const task = DailyTask.setDailyTaskDone(user.id, id, status === "true");

  return json({
    user: task,
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

  console.log(urgentTaskList, dailyTaskList);

  const formattedDate = formatDate(new Date()); // Format: Saturday, Feb 20 2024

  return (
    <div className="pt-5 h-screen relative">
      <div className="flex flex-row justify-between items-center mx-5">
        <span className="text-[12px] font-normal select-none lg:select-auto">{formattedDate}</span>
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
        <p className="text-[24px] font-bold select-none lg:select-auto">Welcome {loaderData.user.name}</p>
        <p className="text-[16px] font-medium text-[#474747] select-none lg:select-auto">Have a nice day !</p>
      </div>
      <div className="ml-5 mt-5 overflow-hidden">
        <p className="text-[20px] font-semibold leading-10 select-none lg:select-auto">My Priority Task</p>
        {urgentTaskList.length ? <Carousel carouselItems={urgentTaskList} /> : <NewTaskText />}
      </div>
      <div className="mx-5 mt-5 overflow">
        <p className="text-[20px] font-semibold leading-10 select-none lg:select-auto">Daily Task</p>
        {dailyTaskList.length ? <TaskCarousel carouselItems={dailyTaskList} /> : <NewTaskText />}
      </div>
      <AppBar activate="DASHBOARD" />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    console.log("DASHBOARD: ERROR: ROUTE RESPONSE ERROR", error);
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    console.log("DASHBOARD: ERROR: Error Instance", error);

    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    console.log("DASHBOARD: ERROR: Unknown Error", error);

    return <h1>Unknown Error</h1>;
  }
}

function NewTaskText() {
  return (
    <span className="flex gap-2">
      No Task Found. Click{" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`w-6 h-6`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>{" "}
      to create new task.
    </span>
  );
}
