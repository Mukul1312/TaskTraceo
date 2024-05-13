import { ActionFunctionArgs, LinksFunction } from "@remix-run/node";
import { Form, useActionData, useRouteError } from "@remix-run/react";
import { sessionStorage } from "~/services/session.server";
import { User as UserType, auth } from "~/services/auth.server";
import User from "~/.server/models/user.model";
import { AppBar } from "~/components/appBar";
import generatePastelColor from "~/utils/genPastelColor";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css?url" },
];

// const scripts: ExternalScriptsFunction = () => {
//   return [
//     {
//       src: "https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js",
//     },
//   ];
// };

// if you don't care about the type
// export const handle = { scripts };

// interface AppHandle<LoaderData = unknown> {
//   scripts?: ExternalScriptsFunction<LoaderData> | ScriptDescriptor[];
// }

// export const handle: AppHandle<LoaderData> = {
//   scripts() {
//     return [
//       { src: "https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js" },
//       { src: "https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/datepicker.min.js" },
//     ];
//   },
// };

// export const handle: ExternalScriptsHandle = {};

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
      const remaining = Number(formData.get("remaining"));
      console.log(progress, remaining);

      if (remaining == 0) throw new Error("Remaining Days can't be zero.");

      const response = await User.addUrgentImportantTask(user.id, {
        name: taskname,
        status: false,
        progress: progress,
        remainingTime: remaining,
        theme: generatePastelColor(),
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
            <input
              type="text"
              name="taskname"
              placeholder="Task Name"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="number"
              name="progress"
              placeholder="Progress Percentage"
              className="input input-bordered w-full max-w-xs"
            />
            <DatePicker placeholder="Completion Date: DD/MM/YYYY" type="text" name="dead-date" />
            <TimePicker />
            <button name="intent" value="add-priority-task" className="btn btn-primary text-white select-none">
              Save
            </button>
          </Form>
        </div>
        <div className="flex flex-col gap-6 mt-10 ">
          <span className="text-center font-bold text-[20px] select-none lg:select-auto">Create Daily Task</span>
          <Form className="flex flex-col gap-4" method="POST" action="/calendar">
            <input
              type="text"
              name="taskname"
              placeholder="Task Name"
              className="input input-bordered w-full max-w-xs"
            />
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

export function ErrorBoundary() {
  const error = useRouteError();

  console.log(error);

  return <h1>Some Error Occur. Please check console</h1>;
}

function DatePicker({ placeholder, type, name }: { placeholder: string; type: string; name: string }) {
  return (
    <div className="relative max-w-sm">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
        </svg>
      </div>
      <input
        datepicker="true"
        datepicker-buttons="true"
        datepicker-autoselect-today="true"
        type={type}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
}

function TimePicker() {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <input
        type="time"
        id="time"
        className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        min="09:00"
        max="18:00"
        value="00:00"
        required
      />
    </div>
  );
}

// ps-10
// leading-none
