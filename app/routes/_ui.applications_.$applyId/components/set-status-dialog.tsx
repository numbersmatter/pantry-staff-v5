import { getFormProps, useForm } from "@conform-to/react";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { action, loader } from "../route";
import { parseWithZod } from "@conform-to/zod";
import { SetStatusSchema } from "../schemas";
import { useState, useEffect } from "react";
import { cn } from "~/lib/utils";
import type { ApplicationStatus } from "~/db/applications/app-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "~/components/ui/dialog";


type Status = "pending" | "approved" | "declined"


const applicationStatus = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "approved",
    label: "Approved",
  },
  {
    value: "declined",
    label: "Declined",
  },
]


export function SetStatusDialog() {
  const { status, semester } = useLoaderData<typeof loader>()
  const fetcher = useFetcher<typeof action>();
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<ApplicationStatus>(status)
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult: fetcher.data,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: SetStatusSchema });
    },
    defaultValue: {
    },

    shouldRevalidate: 'onBlur',
  })

  const isFetching = fetcher.state !== "idle";
  const success = fetcher.data?.status === "success" ? true : false;

  useEffect(() => {
    if (success && !isFetching) {
      setOpen(false);
    }
  }, [success, isFetching]);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Review Application</DialogTitle>
          <DialogDescription>
            Approve application to add family to {semester.name}.
          </DialogDescription>
        </DialogHeader>
        <fetcher.Form method="POST" className="grid gap-4 py-4">
          <Button
            variant="secondary" className="  w-full bg-green-600 text-white hover:bg-green-800"
            type="submit"
            name="status"
            value="approved"
          >
            Approve
          </Button>
          <Button
            variant="destructive" className="w-full hover:bg-red-800"
            type="submit"
            name="status"
            value="declined"
          >
            Decline
          </Button>
        </fetcher.Form>
        <DialogFooter>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
