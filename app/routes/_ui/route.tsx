import { json, Outlet, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import App from "~/root";
import AppShell, { NavNotification } from "./components/app-shell";

export const loader = async (args: LoaderFunctionArgs) => {
  const pantry_name = "Thomasville CIS Pantry"
  const main_notification: Record<string, NavNotification> = {
    "dashboard": {
      "number": 0,
      id: "dashboard",
      "type": "high"
    },
    "applications": {
      "number": 0,
      id: "applications",
      "type": "high"
    },
    // "history": {
    //   "number": 0,
    //   "type": "high"
    // }
  }
  return json({ pantry_name, main_notification });
};


export default function Layout() {
  const data = useLoaderData();

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}
