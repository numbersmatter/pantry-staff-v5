import { parseWithZod } from "@conform-to/zod";
import { ApplicationStatus } from "~/db/applications/app-types";
import { db } from "~/db/db.server";
import { SetStatusSchema } from "./schemas";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { RegistrationCreate } from "~/db/registrations/registration-types";

const mutateDb = async ({
  semesterId,
  applicationId,
  status,
}: {
  semesterId: string;
  applicationId: string;
  status: ApplicationStatus;
}) => {
  // get application
  const applicationDoc = await db
    .applications({ semesterId })
    .read(applicationId);
  if (!applicationDoc) {
    throw new Error("Application not found");
  }
  // update application
  const writeApplication = await db.applications({ semesterId }).update({
    id: applicationId,
    data: {
      status,
    },
  });
  // create registration if status is accepted
  if (status === "accepted") {
    const regData: RegistrationCreate = {
      userId: applicationId,
      semesterId: semesterId,
      status: "registered",
      primaryContact: applicationDoc.primaryContact,
      adults: applicationDoc.adults,
      students: applicationDoc.students,
      minors: applicationDoc.minors,
    };

    // write registration
    const writeRegistration = await db
      .registrations({ semesterId })
      .create({ data: regData, id: applicationId });
  }

  return writeApplication;
};

export const registerForSemester = async ({
  request,
  params,
}: {
  request: ActionFunctionArgs["request"];
  params: ActionFunctionArgs["params"];
}) => {
  const activeSemester = await db.organization.activeSemester();
  if (!activeSemester) {
    throw new Error("No active semester found");
  }

  const applicationId = params.applyId ?? "error";
  console.log(applicationId);

  const formInput = await request.formData();
  const submission = parseWithZod(formInput, { schema: SetStatusSchema });

  if (submission.status === "success") {
    const writeApplication = await mutateDb({
      semesterId: activeSemester.semester_id,
      applicationId,
      status: submission.value.status as ApplicationStatus,
    });
    return json(submission.reply());
  }

  return json(submission.reply());
};
