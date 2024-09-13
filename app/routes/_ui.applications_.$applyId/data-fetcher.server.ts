import { db } from "~/db/db.server";

export const getApplication = async (id: string) => {
  const activeSemester = await db.organization.activeSemester();
  if (!activeSemester) {
    throw new Error("No active semester found");
  }
  const application = await db
    .applications({ semesterId: activeSemester.semester_id })
    .read(id);
  if (!application) {
    throw new Error("Application not found");
  }
  return { ...application, activeSemester };
};
