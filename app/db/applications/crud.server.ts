import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { firestore } from "../firestore.server";
import { Student, Minor } from "../registrations/registration-types";
import { Application, ApplicationDb } from "./app-types";

export const applicationsDb = ({ semesterId }: { semesterId: string }) => {
  const collection = firestore.collection(
    `semesters/${semesterId}/applications`
  );

  const read = async (id: string) => {
    const doc = await collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }

    return {
      id: doc.id,
      userId: doc.data()?.userId ?? "error",
      semesterId: doc.data()?.semesterId ?? "error",
      status: doc.data()?.status ?? "error",
      primaryContact: {
        fname: doc.data()?.primaryContact?.fname ?? "error",
        lname: doc.data()?.primaryContact?.lname ?? "error",
        email: doc.data()?.primaryContact?.email ?? "error",
        phone: doc.data()?.primaryContact?.phone ?? "error",
      },
      address: {
        street: doc.data()?.address?.street ?? "",
        unit: doc.data()?.address?.unit ?? "",
        city: doc.data()?.address?.city ?? "",
        state: doc.data()?.address?.state ?? "",
        zip: doc.data()?.address?.zip ?? "",
      },
      adults: doc.data()?.adults ?? 0,
      students: doc.data()?.students ?? [],
      minors: doc.data()?.minors ?? [],
      createdDate: doc.data()?.createdDate ?? Timestamp.fromDate(new Date()),
      updatedDate: doc.data()?.updatedDate ?? Timestamp.fromDate(new Date()),
    } as Application;
  };

  const create = async ({
    appUserId,
    data,
  }: {
    appUserId: string;
    data: Omit<ApplicationDb, "createdDate">;
  }) => {
    const docRef = collection.doc(appUserId);

    const writeData = {
      ...data,
      createdDate: FieldValue.serverTimestamp(),
      updatedDate: FieldValue.serverTimestamp(),
    };

    await docRef.set(writeData);
    return docRef.id;
  };

  const update = async ({
    id,
    data,
  }: {
    id: string;
    data: Partial<Application>;
  }) => {
    const docRef = collection.doc(id);
    const updateData = {
      ...data,
      updatedDate: FieldValue.serverTimestamp(),
    };
    await docRef.update(updateData);

    return docRef.id;
  };
  const addStudent = async ({
    appUserId,
    data,
  }: {
    appUserId: string;
    data: Student;
  }) => {
    const docRef = collection.doc(appUserId);

    const writeData = {
      updatedDate: FieldValue.serverTimestamp(),
      students: FieldValue.arrayUnion(data),
    };

    await docRef.update(writeData);
    return docRef.id;
  };

  const removeStudent = async ({
    appUserId,
    studentId,
  }: {
    appUserId: string;
    studentId: string;
  }) => {
    const docRef = collection.doc(appUserId);
    const doc = await read(appUserId);

    const students = doc?.students ?? [];

    const newStudents = students.filter((student) => student.id !== studentId);

    const writeData = {
      updatedDate: FieldValue.serverTimestamp(),
      students: newStudents,
    };

    await docRef.update(writeData);
    return docRef.id;
  };

  const addMinor = async ({
    appUserId,
    data,
  }: {
    appUserId: string;
    data: Minor;
  }) => {
    const docRef = collection.doc(appUserId);

    const writeData = {
      updatedDate: FieldValue.serverTimestamp(),
      minors: FieldValue.arrayUnion(data),
    };

    await docRef.update(writeData);
    return docRef.id;
  };

  const removeMinor = async ({
    appUserId,
    minorId,
  }: {
    appUserId: string;
    minorId: string;
  }) => {
    const docRef = collection.doc(appUserId);
    const doc = await read(appUserId);

    const minors = doc?.minors ?? [];

    const newMinors = minors.filter((minor) => minor.id !== minorId);

    const writeData = {
      updatedDate: FieldValue.serverTimestamp(),
      minors: newMinors,
    };

    await docRef.update(writeData);
    return docRef.id;
  };

  const getAll = async () => {
    const querySnapshot = await collection.get();
    const applications: Application[] = querySnapshot.docs.map((doc) => {
      const application = doc.data() as ApplicationDb;
      return {
        id: doc.id,
        userId: application.userId,
        semesterId: application.semesterId,
        status: application.status,
        primaryContact: {
          fname: application.primaryContact.fname,
          lname: application.primaryContact.lname,
          email: application.primaryContact.email,
          phone: application.primaryContact.phone,
        },
        address: {
          street: application.address.street,
          unit: application.address.unit,
          city: application.address.city,
          state: application.address.state,
          zip: application.address.zip,
        },
        adults: application.adults,
        students: application.students,
        minors: application.minors,
        createdDate: application.createdDate,
        updatedDate: application.updatedDate,
      };
    });
    return applications;
  };

  return {
    read,
    create,
    update,
    addStudent,
    removeStudent,
    addMinor,
    removeMinor,
    getAll,
  };
};
