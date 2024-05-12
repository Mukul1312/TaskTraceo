import { Link } from "@remix-run/react";
import { CalendarIcon } from "../icons/calendar";
import { HomeIcon } from "../icons/home";
import { UserIcon } from "../icons/user";

export const AppBar = ({ activate }: { activate: "DASHBOARD" | "CALENDAR" | "PROFILE" }) => {
  return (
    <div className="fixed flex flex-row justify-evenly items-center h-20 bottom-0 bg-white w-full rounded-t-sm drop-shadow-4xl">
      <Link to="/dashboard">
        <HomeIcon className={activate == "DASHBOARD" ? "fill-secondary w-8 h-8" : "w-8 h-8"} />
      </Link>
      <Link to="/calendar">
        <CalendarIcon className={activate == "CALENDAR" ? "fill-secondary w-8 h-8" : "w-8 h-8"} />
      </Link>
      <Link to="/profile">
        <UserIcon className={activate == "PROFILE" ? "fill-secondary w-8 h-8" : "w-8 h-8"} />
      </Link>
    </div>
  );
};
