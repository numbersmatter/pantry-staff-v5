import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
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


export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <div>
      <h1> Route Error</h1>
    </div>
  }
  return <div>
    <h1>
      Uncaught Error:
    </h1>
    <div>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  </div>
}

