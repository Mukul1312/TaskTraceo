import { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
  {
    rel: "preload",
    href: "/onboarding-first.png",
    as: "image",
    type: "image/svg+xml",
  },
];

export default function OnboardingFirst() {
  return (
    <div className="flex flex-col gap-6">
      <img src="/onboarding-first.png" />
      <span className="text-center text-[16px] font-bold">Easy Time Management</span>
      <p className="text-center text-[16px]">
        With management based on priority and daily tasks, it will give you convenience in managing and determining the
        tasks that must be done first{" "}
      </p>
    </div>
  );
}
