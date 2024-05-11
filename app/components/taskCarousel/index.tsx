interface DailyTaskDetails {
  taskName: string;
}

interface CarouselProps {
  carouselItems: DailyTaskDetails[];
  taskDone: DailyTaskDetails[] | undefined;
  clickDone: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

export const TaskCarousel = ({ carouselItems, taskDone, clickDone }: CarouselProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const shouldSetColor = (taskDone: DailyTaskDetails[] | undefined, items: DailyTaskDetails) => {
    return "black";
  };
  return (
    <div className="carousel carousel-vertical rounded-box h-96 w-full">
      {carouselItems.map((items) => (
        <div className="carousel-item px-2 mb-2 h-10" key={items.taskName}>
          <div className="w-full rounded-md flex flex-row justify-between px-3 items-center border-2">
            <span
              className="text-[16px] font-semibold"
              style={{
                color: shouldSetColor(taskDone, items),
              }}
            >
              {items.taskName}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={shouldSetColor(taskDone, items) ? "none" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              id={items.taskName}
              onClick={clickDone}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};
