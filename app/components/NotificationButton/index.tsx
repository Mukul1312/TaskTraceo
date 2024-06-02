import { usePush } from "@remix-pwa/push/client";
import { useSubmit } from "@remix-run/react";

export function NotificationButton({ isSubscribed, handleClick }: { isSubscribed: boolean; handleClick: () => void }) {
  return (
    <button className="btn btn-accent select-none" onClick={handleClick}>
      {isSubscribed ? "Unsubscribe" : "Subscribe"}
    </button>
  );
}
