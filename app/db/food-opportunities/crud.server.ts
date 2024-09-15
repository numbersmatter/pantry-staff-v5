import { Timestamp } from "firebase-admin/firestore";
import { intializeFb } from "../firebase.server";
import { firestore } from "../firestore.server";

export type OpportunityType = "pickup" | "drive-thru" | "error";
export type OpportunityStatus = "open" | "closed" | "past";

interface FoodOpportunity {
  id: string;
  name: string;
  semesterId: string;
  status: OpportunityStatus;
  type: OpportunityType;
  date: Timestamp;
  timeSlots: { id: string; label: string }[];
}

export const foodOpportunityDb = () => {
  intializeFb();
  const collection = firestore.collection("/food_opportunities");
  const read = async (id: string) => {
    const doc = await collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      name: doc.data()?.name ?? "error",
      semesterId: doc.data()?.semesterId ?? "error",
      status: doc.data()?.status ?? "error",
      code: doc.data()?.code ?? "error",
      date: doc.data()?.date,
      timeSlots: doc.data()?.timeSlots ?? [{ id: "default", label: "default" }],
    };
  };

  const getFromSemester = async ({ semesterId }: { semesterId: string }) => {
    const query = collection.where("semesterId", "==", semesterId);
    const docs = await query.get();
    return docs.docs.map((doc) => {
      return {
        id: doc.id,
        name: doc.data()?.name ?? "error",
        semesterId: doc.data()?.semesterId ?? "error",
        status: doc.data()?.status ?? "error",
        type: doc.data()?.code ?? "error",
        date: doc.data()?.date,
        timeSlots: doc.data()?.timeSlots ?? [
          { id: "default", label: "default" },
        ],
      } as FoodOpportunity;
    });
  };

  return {
    getFromSemester,
    read,
  };
};
