import type { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
  {
    rel: "preload",
    href: "/Sprinkle.svg",
    as: "image",
    type: "image/svg+xml",
  },
];

interface TaskDetails {
  taskName: string;
  progressPerc: number;
  remaningDays: string;
  themeColor: string;
  id: string;
}

interface CarouselProps {
  carouselItems: TaskDetails[];
}

export const Carousel = ({ carouselItems }: CarouselProps) => {
  return (
    <div className="carousel rounded-box w-96">
      {carouselItems.map((items) => (
        <div
          className="carousel-item w-1/2 mr-5 rounded-box"
          key={items.taskName}
          style={{ backgroundColor: items.themeColor }}
        >
          <div
            className="w-full rounded-box h-[256px] flex flex-col justify-around items-center"
            style={{ backgroundImage: `url(/Sprinkle.svg)` }}
          >
            <span className="self-end bg-white rounded-[10px] px-2 mr-5 text-[10px] font-medium select-none lg:select-auto">
              {items.remaningDays} Days
            </span>
            <span className="text-white text-center text-[16px] font-semibold select-none lg:select-auto">
              {items.taskName}
            </span>
            <div className="flex flex-col pl-2 w-[90%]">
              <div className="flex flex-row w-full justify-between">
                <span className="text-white select-none lg:select-auto">Progress</span>
                <span className=" text-white select-none lg:select-auto">{items.progressPerc}%</span>
              </div>
              <progress className="progress w-[90%] progress-base-100" value={items.progressPerc} max="100"></progress>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
