import type { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
  {
    rel: "preload",
    href: "/Sprinkle.svg",
    as: "image",
    type: "image/svg+xml",
  },
];

function generatePastelColor() {
  const hue = Math.floor(Math.random() * 360); // Random hue
  const saturation = Math.floor(Math.random() * 30) + 70; // Random saturation (70-100)
  const lightness = Math.floor(Math.random() * 20) + 30; // Random lightness (30-50)
  const color = "hsl(" + hue + ", " + saturation + "%, " + lightness + "%)";

  return color;
}

interface TaskDetails {
  taskName: string;
  progressPerc: number;
  remaningDays: number;
  themeColor: string;
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
          style={{ backgroundColor: generatePastelColor() }}
        >
          <div
            className="w-full rounded-box h-[256px] flex flex-col justify-around items-center"
            style={{ backgroundImage: `url(/Sprinkle.svg)` }}
          >
            <span className="self-end bg-white rounded-[10px] px-2 mr-5 text-[10px] font-medium">
              {items.remaningDays} Days
            </span>
            <span className="text-white text-center text-[16px] font-semibold">{items.taskName}</span>
            <div className="flex flex-col pl-2 w-[90%]">
              <span className="text-white">Progress</span>
              <progress className="progress w-[90%] progress-base-100" value={items.progressPerc} max="100"></progress>
              <span className="self-end text-white">{items.progressPerc}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
