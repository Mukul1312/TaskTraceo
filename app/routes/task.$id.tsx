import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import UrgentTask from "~/.server/models/urgentTask.model";
import { User as UserType, auth } from "~/services/auth.server";
import { sessionStorage } from "~/services/session.server";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  console.log("UI: TASK: LOADER: params", params.id);

  if (!params.id) throw new Error("Params not found.");
  const task = await UrgentTask.getTaskById(params.id);

  if (!task) throw new Error("Task not found");

  return task;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const taskname = formData.get("taskname");
  const taskId = formData.get("taskId");

  if (!taskId) throw new Error("Task name can't be empty");

  const progress = Number(formData.get("progress"));
  const remaining = String(formData.get("dead-date"));
  const time = String(formData.get("time"));
  const response = await UrgentTask.updateTask(String(taskId), {
    name: String(taskname),
    status: progress == 100,
    progress: progress,
    remainingTime: remaining,
    time: time,
  });

  console.log("UI: EDIT TASK: Response", response);

  return null;
};

export default function Task() {
  const loaderData = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  console.log(loaderData);

  return (
    <div className="h-screen overflow-hidden relative">
      <div className="bg-secondary h-1/5 w-full flex items-center px-4">
        <div className="grow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3.5}
            stroke="currentColor"
            className="size-6 bg-white rounded-md p-1 stroke-secondary"
            onClick={() => navigate(-1)}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </div>
        <p className="text-white grow self-center font-bold text-xl">Edit Task</p>
      </div>
      <div className="relative top-[-5%] z-10 bg-white h-3/5 rounded-t-[50px] pt-20 px-5">
        <h1 className="text-secondary text-center text-3xl font-extrabold mb-10">{loaderData.name}</h1>
        <Form className="flex flex-col gap-4" method="POST" action={`/task/${loaderData._id}`}>
          <div>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Task Name
            </label>
            <input
              type="text"
              name="taskname"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              defaultValue={loaderData.name}
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
              required
              defaultValue={loaderData.progress}
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
              defaultValue={loaderData.remainingTime}
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
              defaultValue={loaderData.time}
              required
            />
          </div>
          <input type="hidden" name="taskId" value={loaderData._id} />
          <button name="intent" value="add-priority-task" className="btn btn-primary text-white select-none">
            Update
          </button>
        </Form>
      </div>
    </div>
  );
}

// <input
//   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//   placeholder="78"
//   defaultValue={78}
//   required
// />;

//  <label htmlFor="progress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               Progress
//             </label>
//             <input
//               type="range"
//               name="progress"
//               min={0}
//               max="100"
//               value={loaderData.progress}
//               className="range range-xs range-primary"
//             />
