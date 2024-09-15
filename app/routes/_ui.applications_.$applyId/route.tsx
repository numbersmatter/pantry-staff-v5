import type { ActionFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node";
import OverviewCard from "./components/overview-card";
import { Student, StudentsCard } from "./components/students-card";
import StatusCard from "./components/status-card";
import { getApplication } from "./data-fetcher.server";
import { requireAuth } from "~/auth/requireAuth.server";
import { registerForSemester } from "./mutations.server";

export const loader = async (args: LoaderFunctionArgs) => {
  const applicationId = args.params.applyId ?? "error";

  const application = await getApplication(applicationId);




  const students: Student[] = application.students;

  const overview = {
    id: application.id,
    fname: application.primaryContact.fname,
    lname: application.primaryContact.lname,
    email: application.primaryContact.email,
    phone: application.primaryContact.phone,
    description: application.address.street,
    status: application.status,
    created_at: application.createdDate.toDate().toLocaleDateString(),
    updated_at: application.updatedDate.toDate().toLocaleDateString(),
    user_id: application.userId,
    submited_at: application.updatedDate.toDate().toLocaleDateString(),
  }

  const semester = application.activeSemester

  const status = application.status;
  return json({ students, status, overview, semester });
};


export const action = async (args: ActionFunctionArgs) => {
  await requireAuth(args.request);

  return await registerForSemester({ request: args.request, params: args.params });

};







export default function ApplicationReview() {

  return (
    <>
      <OverviewCard />
      <StudentsCard />
    </>
  )
}