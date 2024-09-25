import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { protectedRoute } from "~/lib/auth/auth.server";



export const loader = async (args: LoaderFunctionArgs) => {
  await protectedRoute(args.request);
  return json({});
};



export default function Dashboard() {

  return (
    <h1>Dashboard</h1>
  )
}