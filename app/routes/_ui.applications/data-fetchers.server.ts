import { json, LoaderFunctionArgs } from "@remix-run/node";
import { db } from "~/db/db.server";

type ApplicationRow = {
  id: string;
  lname: string;
  fname: string;
  status: string;
  created_at: string;
  updated_at: string;
};

const data: ApplicationRow[] = [
  {
    id: "1",
    lname: "Doe",
    fname: "John",
    status: "Pending",
    created_at: "2023-01-01",
    updated_at: "2023-01-01",
  },
  {
    id: "2",
    lname: "Smith",
    fname: "Jane",
    status: "Approved",
    created_at: "2023-01-01",
    updated_at: "2023-01-01",
  },
];

export const getApplications = async () => {
  const activeSemester = await db.organization.activeSemester();
  if (!activeSemester) {
    throw new Error("No active semester found");
  }

  console.log(activeSemester);
  const getSemesterApplications = await db
    .applications({ semesterId: activeSemester.semester_id })
    .getAll();

  const applications: ApplicationRow[] = getSemesterApplications.map(
    (application) => {
      return {
        id: application.id,
        lname: application.primaryContact.lname,
        fname: application.primaryContact.fname,
        status: application.status,
        created_at: application.createdDate.toDate().toLocaleDateString(),
        updated_at: application.updatedDate.toDate().toLocaleDateString(),
      };
    }
  );

  console.log(applications);

  return applications;
};
