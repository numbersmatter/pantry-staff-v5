import { db } from "~/db/db.server";

export const getOpportunities = async () => {
  const activeSemester = await db.organization.activeSemester();
  if (!activeSemester) {
    throw new Error("No active semester found");
  }

  const semesterOpportunities = await db.food_opportunities.getFromSemester({
    semesterId: activeSemester.semester_id,
  });

  return semesterOpportunities.map((opportunity) => {
    return {
      id: opportunity.id,
      name: opportunity.name,
      type: opportunity.type,
      status: opportunity.status,
      date: opportunity.date.toDate().toLocaleDateString(),
    };
  });
};
