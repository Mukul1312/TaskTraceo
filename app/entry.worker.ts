/// <reference lib="WebWorker" />

export {};

declare let self: ServiceWorkerGlobalScope;

self.addEventListener("install", (event) => {
  console.log("Service worker installed");

  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activated");

  event.waitUntil(self.clients.claim());
});

import { PushManager } from "@remix-pwa/push/client";

const pushManager = new PushManager({
  handlePushEvent: (event) => {
    // Handle incoming push event
    const messageObj = event.data?.json();
    console.log("SERVICE WORKER: Handling Incoming push events", messageObj);

    self.registration.showNotification(messageObj.title, {
      body: messageObj.options.body,
      icon: "https://img.icons8.com/ios-filled/50/t.png",
    });
  },
  handleNotificationClick: (event) => {
    // Handle notification click event
    console.log("SERVICE WORKER: Handling Notfication click events");
  },
  handleNotificationClose: (event) => {
    // Handle notification close event
    console.log("SERVICE WORKER: Handling Notfication Notification Close");
  },
  handleNotificationError: (event) => {
    // Handle notification error event
    console.log("SERVICE WORKER: Handling Notfication Notification Error");
  },
});
