import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import DashboardHeader from "./component/dashboard-header";
import { ApplicationsDataTable } from "./component/applications-data-table";


type Application = {
  id: string,
  name: string,
  description: string,
  status: string,
  created_at: string,
  updated_at: string,
  user_id: string,
}

export const loader = async (args: LoaderFunctionArgs) => {
  // get auth user

  // get applications
  const applications: Application[] = []

  return json({ applications });
};


export default function ApplicationsPage() {

  return (
    <>
      <DashboardHeader />
      <ApplicationsDataTable />
    </>
  )
}


