import { usePush } from "@remix-pwa/push/client";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import Notification, { subscription, agenda } from "~/.server/models/notification.model";
import UrgentTask from "~/.server/models/urgentTask.model";
import { sendNotification } from "~/.server/push";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  console.log("UI: TASK: LOADER: params", params.id);

  if (!params.id) throw new Error("Params not found.");
  const task = await UrgentTask.getTaskById(params.id);

  const task2 = await UrgentTask.find();

  if (!task) throw new Error("Task not found");

  return task;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = String(formData.get("intent"));
  const taskId = String(formData.get("taskId"));

  console.log("TASK ACTION RUNNING: intent:", intent);
  switch (intent) {
    case "add-priority-task":
      const taskname = formData.get("taskname");
      const progress = Number(formData.get("progress"));
      const remaining = String(formData.get("dead-date"));
      const time = String(formData.get("time"));
      const response = await UrgentTask.updateTask(taskId, {
        name: String(taskname),
        status: progress == 100,
        progress: progress,
        remainingTime: remaining,
        time: time,
      });
      if (!taskId) throw new Error("Task name can't be empty");
      "susbcribe";
      console.log("UI: EDIT TASK: Response", response);
      break;

    case "subscribe":
      const subscriptionObjectToo = JSON.parse(String(formData.get("subscriptionObjectToo")));

      const subscription = {
        endpoint: subscriptionObjectToo.endpoint,
        keys: {
          p256dh: subscriptionObjectToo.keys.p256dh,
          auth: subscriptionObjectToo.keys.auth,
        },
      } as subscription;
      const taskResult = await UrgentTask.updateTask(taskId, {
        shouldNotify: true,
      });
      await Notification.subscribeNotification(taskId, subscription);
      console.log("UI: NOTIFICATION SUBSCRIBE");
      const GMT5 = new Date(`${taskResult.remainingTime}T${taskResult.time}:00Z`);
      // Adjust the time by subtracting the offset difference
      const GMT0 = new Date(GMT5.getTime() - 5.5 * 60 * 60 * 1000);
      agenda.on("ready", () => {
        console.log("AGENDA READY");
      });

      agenda.define(`sentNotification${taskId}`, async (job: any) => {
        console.log("SENDING NOTIFICATION");
        const { subscription, task } = job.attrs.data;
        try {
          sendNotification({
            subscriptions: [subscription],
            vapidDetails: {
              publicKey: "BDuFo596tYfXnz-SmaM2zfIaOwj-VRQYKCat5_u_TiLF2Z80n7v0YR3o9IOif9c2vZi9cNoC8bMmIswuu4LfJ84",
              privateKey: "iEp35yaPjAbBvyq_w3LGf0LxdybjREoky_f0x7MmaXg",
            },
            notification: {
              title: "Reminder",
              options: {
                body: task,
              },
            },
            options: {},
          });
          console.log("Notification sent");
        } catch (error) {
          console.error("Error sending notification:", error);
        }
      });

      await agenda.start();
      await agenda.schedule(GMT0, `sentNotification${taskId}`, {
        subscription: subscription,
        task: taskResult.name,
      });

      break;
    case "unsubscribe":
      const taskResultF = await UrgentTask.updateTask(taskId, {
        shouldNotify: false,
      });
      const result2 = await Notification.unsubscribeNotification(taskId);
      console.log("UI: NOTIFICATION UNSUBSCRIBE", result2);
      break;
  }

  return null;
};

export default function Task() {
  const loaderData = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const { subscribeToPush, unsubscribeFromPush, isSubscribed, pushSubscription, requestPermission } = usePush();
  const publicKey = "BDuFo596tYfXnz-SmaM2zfIaOwj-VRQYKCat5_u_TiLF2Z80n7v0YR3o9IOif9c2vZi9cNoC8bMmIswuu4LfJ84";
  const submit = useSubmit();

  console.log(loaderData);

  const handleSubscribe = (isSubscribed: boolean, taskId: string) => {
    if (isSubscribed) {
      unsubscribeFromPush();
      submit(
        {
          intent: "unsubscribe",
          taskId: taskId,
        },
        {
          method: "POST",
          action: `/task/${taskId}`,
        }
      );
    } else {
      subscribeToPush(
        publicKey,
        (subscription) => {
          console.log("User subscribed to push notifications!", subscription);

          submit(
            {
              intent: "subscribe",
              subscriptionObjectToo: JSON.stringify(subscription),
              taskId: taskId,
            },
            {
              method: "POST",
              action: `/task/${taskId}`,
            }
          );
        },
        (error) => {
          console.error("Error subscribing user to push notifications!", error);
        }
      );
    }
  };

  return (
    <div className="h-screen overflow relative">
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
      <div className="flex flex-col w-full  relative top-[-5%] z-10 bg-white h-3/5 rounded-t-[50px] pt-20 px-5">
        <h1 className="text-secondary text-center text-3xl font-extrabold mb-10">{loaderData.name}</h1>
        <button
          name="intent"
          value="susbcribe"
          onClick={() => handleSubscribe(loaderData.shouldNotify, loaderData._id)}
          className="btn btn-md select-none w-40 self-end"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`size-4 ${loaderData.shouldNotify ? "stroke-black fill-black" : ""}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
          {loaderData.shouldNotify ? "Unsubscribe" : "Subscribe"}
        </button>
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
