import { Link, useFetcher, useLoaderData, useNavigate, useRouteLoaderData } from "@remix-run/react"
import { EllipsisVerticalIcon } from "lucide-react"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "~/components/ui/dropdown-menu"
import { loader } from "../route"
import { AddStudentDialog } from "./add-student-dialog"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";


export type Student = {
  fname: string
  lname: string
  school: "tps" | "lde" | "tms" | "ths"
  id: string
}




export function StudentsCard() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto max-w-7xl py-4 md:py-8 sm:px-6 lg:px-8" >
      <Card>
        <CardHeader>
          <CardTitle>
            Students
          </CardTitle>
          <CardDescription>

          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContentStudents />
        </CardContent>
        <CardFooter className="flex flex-col justify-between gap-4 md:flex-row md:gap-8 ">
          <AddStudentDialog />
        </CardFooter>
      </Card>
    </div>

  )
}

function ContentStudents() {
  const { students } = useLoaderData<typeof loader>()




  const english = {
    add: "Add Student",
    edit: "Edit",
    remove: "Remove",
  }

  const spanish = {
    add: "Agregar estudiante",
    edit: "Editar",
    remove: "Eliminar",
  }



  return (
    <ul className="divide-y divide-gray-100">
      {students.map((student: Student) => (
        <StudentRowCard key={student.id} student={student} />
      )
      )}
    </ul>
  )
}




function StudentRowCard({ student, }: {
  student: Student,
}) {
  const fetcher = useFetcher();

  const handleRemove = async () => {
    return fetcher.submit({ type: "removeStudent", studentId: student.id }, { method: "post" });
  }


  return <li key={student.id} className="flex justify-between gap-x-6 py-5">
    <div className="flex min-w-0 gap-x-4">
      <div className="h-12 w-12 pt-3 flex place-content-center flex-none rounded-full bg-gray-50">
        {student.fname.charAt(0)}
      </div>
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900">
          {student.fname} {student.lname}
        </p>
        <p className="mt-1 flex text-xs leading-5 text-gray-500">

        </p>
      </div>
    </div>
    <div className="flex shrink-0 items-center gap-x-6">
      <div className="hidden sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">{student.school}</p>
        <p className="mt-1 text-xs leading-5 text-gray-500">
          School: {student.school}
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
          <span className="sr-only">
            Edit
          </span>
          <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
        >
          <DropdownMenuLabel>

          </DropdownMenuLabel>
          {/* <DropdownMenuItem>{lang.edit}</DropdownMenuItem> */}
          <DropdownMenuItem onClick={handleRemove}>
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </li>
}

