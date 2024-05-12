import { ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useRouteError } from "@remix-run/react";
import { sessionStorage } from "~/services/session.server";
import { User as UserType, auth } from "~/services/auth.server";
import User from "~/.server/models/user.model";
import { AppBar } from "~/components/appBar";
import generatePastelColor from "~/utils/genPastelColor";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const taskname = String(formData.get("taskname"));

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
          <span className="text-center font-bold text-[20px]">Create Priority Task</span>
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
            <input
              type="number"
              name="remaining"
              placeholder="Remaining Days"
              className="input input-bordered w-full max-w-xs"
            />
            <button name="intent" value="add-priority-task" className="btn btn-primary text-white">
              Save
            </button>
          </Form>
        </div>
        <div className="flex flex-col gap-6 mt-10 ">
          <span className="text-center font-bold text-[20px]">Create Daily Task</span>
          <Form className="flex flex-col gap-4" method="POST" action="/calendar">
            <input
              type="text"
              name="taskname"
              placeholder="Task Name"
              className="input input-bordered w-full max-w-xs"
            />
            <button name="intent" value="add-daily-task" className="btn btn-primary text-white">
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
