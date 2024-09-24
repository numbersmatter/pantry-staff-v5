import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import { requireAuth } from "~/auth/requireAuth.server";
import { getOpportunities } from "./data-fetchers.server";
import { OpportunitiesDataTable } from "./components/opp-table";

export const loader = async (args: LoaderFunctionArgs) => {
  await requireAuth(args.request);
  const opportunities = await getOpportunities();
  return json({ opportunities });
};



export default function FoodOpportunitiesIndex() {
  const data = useLoaderData();

  return (
    <>
      <h1>Food Opportunities</h1>
      <OpportunitiesDataTable />
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </>
  )
}


