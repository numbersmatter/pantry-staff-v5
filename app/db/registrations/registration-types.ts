import { Timestamp } from "firebase-admin/firestore";

interface Student {
  id: string;
  fname: string;
  lname: string;
  school: "tps" | "lde" | "tms" | "ths";
}
interface Minor {
  id: string;
  fname: string;
  lname: string;
  birthyear: number;
}

interface Registration {
  id: string;
  userId: string;
  semesterId: string;
  status: "registered" | "removed" | "error";
  primaryContact: {
    fname: string;
    lname: string;
    email: string;
    phone: string;
  };
  adults: number;
  students: Student[];
  minors: Minor[];
  createdDate: Timestamp;
}

interface RegistrationDb extends Omit<Registration, "id"> {}

interface RegistrationCreate extends Omit<RegistrationDb, "createdDate"> {}

export type {
  Registration,
  RegistrationDb,
  Student,
  Minor,
  RegistrationCreate,
};
