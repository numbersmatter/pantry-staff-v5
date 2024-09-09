import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "~/components/ui/card";


export default function OverviewCard() {

  const overview = {
    id: "1",
    fname: "John",
    lname: "Doe",
    email: "john.doe@example.com",
    phone: "555-555-5555",
    description: "Application Description",
    status: "Pending",
    created_at: "2023-01-01",
    updated_at: "2023-01-01",
    user_id: "1",
    submited_at: "2023-01-01",
  }


  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8" >
      <Card>
        <CardHeader>
          <CardTitle>Application Overview</CardTitle>
          <CardDescription>
            Submitted on: {overview.submited_at}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2">
              <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  First Name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                  {overview.lname}
                </dd>
              </div>
              <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Last Name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                  {overview.lname}
                </dd>
              </div>
              <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Email
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                  {overview.email}
                </dd>
              </div>
              <div className="border-t border-gray-100 px-4 py-6 sm:col-span-1 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Phone
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:mt-2">
                  {overview.phone}
                </dd>
              </div>

            </dl>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}