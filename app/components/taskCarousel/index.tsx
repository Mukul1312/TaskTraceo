import { useSubmit } from "@remix-run/react";

interface TaskDetails {
  taskName: string;
  status: boolean;
  id: string;
}

interface CarouselProps {
  carouselItems: TaskDetails[];
}

export const TaskCarousel = ({ carouselItems }: CarouselProps) => {
  // const fetcher = useFetcher();
  const submit = useSubmit();

  const handleDone = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const isDone = e.currentTarget.classList.values.toString().includes("fill-secondary") ? false : true;

    const array = e.currentTarget.id.split(",");
    const id = array[0];
    const status = array[1].includes("true");

    console.log("From HandleDone", isDone);
    submit(
      { id: id, status: !status },
      {
        method: "post",
        action: "/dashboard",
      }
    );
  };

  return (
    <div className="carousel carousel-vertical rounded-box h-[19rem] w-full">
      {carouselItems.map((task) => (
        <div className="carousel-item px-2 mb-2 h-10" key={task.taskName}>
          <div className="w-full rounded-md flex flex-row justify-between px-3 items-center border-2">
            <span
              className="text-[16px] font-semibold"
              style={{
                color: task.status ? "green" : "black",
              }}
            >
              {task.taskName}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${task.status ? "fill-secondary" : "fill-transparent"}`}
              id={`${task.id},${task.status}`}
              onClick={handleDone}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>{" "}
        </div>
      ))}
    </div>
  );
};
