import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import DashboardHeader from "./component/dashboard-header";
import { ApplicationsDataTable } from "./component/applications-data-table";
import { getApplications } from "./data-fetchers.server";
import { protectedRoute } from "~/lib/auth/auth.server";




export const loader = async (args: LoaderFunctionArgs) => {
  // get auth user
  await protectedRoute(args.request);



  // get applications
  const applications = await getApplications();


  return json({ applications });
};


export default function ApplicationsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <DashboardHeader />
      <ApplicationsDataTable />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}


