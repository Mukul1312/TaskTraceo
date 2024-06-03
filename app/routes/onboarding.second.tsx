import { LinksFunction } from "@remix-run/node";

export const links: LinksFunction = () => [
  {
    rel: "preload",
    href: "/onboarding-second.png",
    as: "image",
    type: "image/svg+xml",
  },
];

export default function OnboardingSecond() {
  return (
    <div className="flex flex-col gap-6">
      <img src="/onboarding-second.png" />
      <span className="text-center text-[16px] font-bold">Increase Work Effectiveness</span>
      <p className="text-center text-[16px]">
        Time management and the determination of more important tasks will give your job statistics better and always
        improve{" "}
      </p>
    </div>
  );
}
