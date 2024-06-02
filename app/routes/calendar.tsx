import { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { sessionStorage } from "~/services/session.server";
import { User as UserType, auth } from "~/services/auth.server";
import { AppBar } from "~/components/appBar";
import generatePastelColor from "~/utils/genPastelColor";
import UrgentTask from "~/.server/models/urgentTask.model";
import DailyTask from "~/.server/models/dailyTask.model";
import { useEffect, useRef, useState, useTransition } from "react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css?url" },
];

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const taskname = String(formData.get("taskname"));

  if (!taskname) throw new Error("Task name can't be empty");

  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const user: UserType = session.get(auth.sessionKey);

  switch (intent) {
    case "add-priority-task": {
      const progress = Number(formData.get("progress"));
      const remaining = String(formData.get("dead-date"));
      const time = String(formData.get("time"));
      const response = await UrgentTask.addUrgentImportantTask(user.id, {
        name: taskname,
        status: false,
        progress: progress,
        remainingTime: remaining,
        theme: generatePastelColor(),
        time: time,
        user: user.id,
      });
      return response;
    }
    case "add-daily-task": {
      const response = await DailyTask.addDailyTask(user.id, {
        name: taskname,
        status: false,
        user: user.id,
      });
      return response;
    }
    default: {
      throw new Error("Unexpected action");
    }
  }
};

export default function Calendar() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  let isAdding = navigation.state === "submitting";
  let formType: "DailyTask" | "UrgentTask" =
    navigation.formData?.get("intent") === "add-daily-task" ? "DailyTask" : "UrgentTask";

  const formRef1 = useRef<HTMLFormElement>(null);
  const formRef2 = useRef<HTMLFormElement>(null);

  useEffect(() => {
    console.log("UI: NAVIGATION", navigation);
    if (isAdding) {
      if (formType === "DailyTask") {
        formRef2.current?.reset();
      } else {
        formRef1.current?.reset();
      }
    }
  }, [isAdding]);

  return (
    <div className="pt-5 h-screen overflow-hidden relative">
      <div className="flex flex-col gap-5 md:gap-10 justify-start items-center mx-5 h-full">
        <div className="flex flex-col gap-3  mt-10 ">
          <span className="text-center font-bold text-[20px] select-none lg:select-auto">Create Priority Task</span>
          <Form ref={formRef1} className="flex flex-col gap-4" method="POST" action="/calendar">
            <div>
              <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Task Name
              </label>
              <input
                type="text"
                name="taskname"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="UI Design"
                required
              />
            </div>
            <div>
              <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Progress %
              </label>
              <input
                type="number"
                name="progress"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="78"
                required
              />
            </div>
            <div>
              <label htmlFor="start" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Deadline Date
              </label>

              <input
                type="date"
                id="start"
                name="dead-date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
                required
              />
            </div>

            <div>
              <label htmlFor="start" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Deadline Time
              </label>

              <input
                type="time"
                id="time"
                name="time"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue="00:00"
                required
              />
            </div>

            <button name="intent" value="add-priority-task" className="btn btn-primary text-white select-none">
              {navigation.state === "submitting" && formType === "UrgentTask" ? "Saving" : "Save"}
            </button>
          </Form>
        </div>
        <div className="flex flex-col gap-3 mt-10 ">
          <span className="text-center font-bold text-[20px] select-none lg:select-auto">Create Daily Task</span>
          <Form ref={formRef2} className="flex flex-col gap-4" method="POST" action="/calendar">
            <div>
              <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Task Name
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Workout"
                required
                name="taskname"
              />
            </div>
            <button name="intent" value="add-daily-task" className="btn btn-primary text-white select-none">
              {navigation.state === "submitting" && formType === "DailyTask" ? "Saving" : "Save"}
            </button>
            {actionData ? <Snackbar /> : ""}
          </Form>
        </div>
      </div>
      <AppBar activate="CALENDAR" />
    </div>
  );
}

function Snackbar() {
  const [visible, setVisible] = useState<boolean>(true);
  const res = setTimeout(() => {
    setVisible(false);
  }, 2000);

  return visible ? (
    <div className="toast toast-top toast-start">
      <div className="alert alert-success">
        <span>Task created successfully.</span>
      </div>
    </div>
  ) : (
    ""
  );
}
