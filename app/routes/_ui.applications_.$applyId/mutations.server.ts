import { parseWithZod } from "@conform-to/zod";
import { ApplicationStatus } from "~/db/applications/app-types";
import { db } from "~/db/db.server";
import { SetStatusSchema } from "./schemas";
import { ActionFunctionArgs, json } from "@remix-run/node";

const writeChangeInStatus = async ({
  semesterId,
  applicationId,
  status,
}: {
  semesterId: string;
  applicationId: string;
  status: ApplicationStatus;
}) => {
  const writeApplication = await db.applications({ semesterId }).update({
    id: applicationId,
    data: {
      status,
    },
  });

  return writeApplication;
};

export const setStatus = async ({
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
    const writeApplication = await writeChangeInStatus({
      semesterId: activeSemester.semester_id,
      applicationId,
      status: submission.value.status as ApplicationStatus,
    });
    return json(submission.reply());
  }

  return json(submission.reply());
};
