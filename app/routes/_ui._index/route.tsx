import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";



export const loader = async (args: LoaderFunctionArgs) => {

  return json({});
};



export default function Dashboard() {

  return (
    <h1>Dashboard</h1>
  )
}