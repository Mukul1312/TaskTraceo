import { CalendarIcon } from "../icons/calendar";
import { HomeIcon } from "../icons/home";
import { UserIcon } from "../icons/user";

export const AppBar = ({ activate }: { activate: "DASHBOARD" | "CALENDAR" | "PROFILE" }) => {
  return (
    <div className="fixed flex flex-row justify-evenly items-center h-20 bottom-0 bg-white w-full rounded-t-sm drop-shadow-4xl">
      <HomeIcon className={activate == "DASHBOARD" ? "fill-secondary w-8 h-8" : "w-8 h-8"} />
      <CalendarIcon className={activate == "CALENDAR" ? "fill-secondary w-8 h-8" : "w-8 h-8"} />
      <UserIcon className={activate == "PROFILE" ? "fill-secondary w-8 h-8" : "w-8 h-8"} />
    </div>
  );
};
