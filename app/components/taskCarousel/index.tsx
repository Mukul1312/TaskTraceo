import { useSubmit } from "@remix-run/react";

interface CarouselProps {
  carouselItems: string[];
  taskDone: string[] | undefined;
  clickDone: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

export const TaskCarousel = ({ carouselItems, taskDone }: CarouselProps) => {
  const shouldSetColor = (taskDone: string[] | undefined, item: string) => {
    const isTaskDone = taskDone && taskDone.includes(item);
    return isTaskDone ? true : false;
  };
  // const fetcher = useFetcher();
  const submit = useSubmit();

  const handleSave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    submit(
      {
        name: e.currentTarget.id,
      },
      { method: "post" }
    );
  };
  return (
    <div className="carousel carousel-vertical rounded-box h-96 w-full">
      {carouselItems.map((task) => (
        <div className="carousel-item px-2 mb-2 h-10" key={task}>
          <div className="w-full rounded-md flex flex-row justify-between px-3 items-center border-2">
            <span
              className="text-[16px] font-semibold"
              style={{
                color: shouldSetColor(taskDone, task) ? "green" : "black",
              }}
            >
              {task}
            </span>
            <div id={task} defaultValue={task} aria-hidden="true" onClick={handleSave}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-6 h-6 ${shouldSetColor(taskDone, task) ? "fill-secondary" : "fill-transparent"}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
          </div>{" "}
        </div>
      ))}
    </div>
  );
};
