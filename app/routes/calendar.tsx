import { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { sessionStorage } from "~/services/session.server";
import { User as UserType, auth } from "~/services/auth.server";
import User from "~/.server/models/user.model";
import { AppBar } from "~/components/appBar";
import generatePastelColor from "~/utils/genPastelColor";

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
      const response = await User.addUrgentImportantTask(user.id, {
        name: taskname,
        status: false,
        progress: progress,
        remainingTime: remaining,
        theme: generatePastelColor(),
        time: time,
      });
      return response;
    }
    case "add-daily-task": {
      const response = await User.addDailyTask(user.id, {
        name: taskname,
        status: false,
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

  if (actionData) {
    console.log(actionData);
  }
  return (
    <div className="pt-5 h-screen overflow-hidden relative">
      <div className="flex flex-col gap-10 justify-start items-center mx-5 h-full">
        <div className="flex flex-col gap-6 mt-10 ">
          <span className="text-center font-bold text-[20px] select-none lg:select-auto">Create Priority Task</span>
          <Form className="flex flex-col gap-4" method="POST" action="/calendar">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <div className="grid gap-6 mb-6 md:grid-cols-2"></div>
            <div>
              <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Task Name
              </label>
              <input
                type="text"
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
                defaultValue={78}
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
                placeholder="19/05/2024"
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
              Save
            </button>
          </Form>
        </div>
        <div className="flex flex-col gap-6 mt-10 ">
          <span className="text-center font-bold text-[20px] select-none lg:select-auto">Create Daily Task</span>
          <Form className="flex flex-col gap-4" method="POST" action="/calendar">
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
              />
            </div>
            <button name="intent" value="add-daily-task" className="btn btn-primary text-white select-none">
              Save
            </button>
          </Form>
        </div>
      </div>
      <AppBar activate="CALENDAR" />
    </div>
  );
}
