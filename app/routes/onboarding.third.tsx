import { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
  {
    rel: "preload",
    href: "/onboarding-third.png",
    as: "image",
    type: "image/svg+xml",
  },
];

export default function OnboardingSecond() {
  return (
    <div className="flex flex-col gap-6">
      <img src="/onboarding-second.png" />
      <span className="text-center text-[16px] font-bold">Reminder Notification</span>
      <p className="text-center text-[16px]">
        The advantage of this application is that it also provides reminders for you so you don't forget to keep doing
        your assignments well and according to the time you have set{" "}
      </p>
    </div>
  );
}
