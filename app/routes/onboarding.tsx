import { Outlet, useLocation, useNavigate } from "@remix-run/react";

export default function OnboardingRoot() {
  const location = useLocation();
  const navigate = useNavigate();

  let currRoute: "FIRST" | "SECOND" | "THIRD";

  if (location.pathname.includes("first")) {
    currRoute = "FIRST";
  } else if (location.pathname.includes("second")) {
    currRoute = "SECOND";
  } else if (location.pathname.includes("third")) {
    currRoute = "THIRD";
  }

  return (
    <div className="pt-5 h-screen relative p-4 flex flex-col justify-between">
      <div className="flex flex-row justify-between">
        <div className="flex gap-2 items-center">
          <div
            className={`w-3 h-3 rounded-full ${location.pathname.includes("first") ? "bg-black" : "bg-white"}`}
          ></div>
          <div
            className={`w-3 h-3 rounded-full ${location.pathname.includes("second") ? "bg-black" : "bg-[#EEF5FD]"}`}
          ></div>
          <div
            className={`w-3 h-3 rounded-full ${location.pathname.includes("third") ? "bg-black" : "bg-[#EEF5FD]"}`}
          ></div>
        </div>
        <span className="text-primary font-medium" onClick={() => navigate("/dashboard")}>
          skip
        </span>
      </div>
      <Outlet />
      <button
        className="bg-secondary py-3 text-white rounded-lg select-none lg:select-auto w-full"
        onClick={() => {
          if (currRoute == "FIRST") {
            navigate("/onboarding/second");
          }
          if (currRoute == "SECOND") {
            navigate("/onboarding/third");
          }
          if (currRoute == "THIRD") {
            navigate("/dashboard");
          }
        }}
      >
        Get Started
      </button>
    </div>
  );
}
