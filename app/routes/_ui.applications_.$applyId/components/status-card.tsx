import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/components/ui/card";
import { SetStatusDialog } from "./set-status-dialog";
import { useLoaderData } from "@remix-run/react";
import { loader } from "../route";


export default function StatusCard() {
  const { status, overview } = useLoaderData<typeof loader>()

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8" >
      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
          <CardDescription>
            {status}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2">
              <div
                className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0"
              >
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Submitted on
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                  {overview.submited_at}
                </dd>
              </div>
              <div
                className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0"
              >
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Last Updated
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                  {overview.updated_at}
                </dd>
              </div>
            </dl>
          </div>
        </CardContent>
        <CardFooter>
          <SetStatusDialog />
        </CardFooter>
      </Card>
    </div>
  )
}