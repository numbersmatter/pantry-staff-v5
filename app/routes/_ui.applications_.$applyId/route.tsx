import type { ActionFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import OverviewCard from "./components/overview-card";
import { Student, StudentsCard } from "./components/students-card";

export const loader = async (args: LoaderFunctionArgs) => {

  const students: Student[] = [
    {
      fname: "Bart",
      lname: "Simpson",
      school: "tps",
      id: "1",
    },
    {
      fname: "Lisa",
      lname: "Simpson",
      school: "lde",
      id: "2",
    },
  ]
  return json({ students });
};


export const action = async (args: ActionFunctionArgs) => {
  return null;
};







export default function ApplicationReview() {

  return (
    <>
      <OverviewCard />
      <StudentsCard />
    </>
  )
}