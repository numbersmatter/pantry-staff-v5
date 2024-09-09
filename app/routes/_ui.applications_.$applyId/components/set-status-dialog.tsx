import { getFormProps, useForm } from "@conform-to/react"
import { useFetcher, useLoaderData } from "@remix-run/react"
import { Check, ChevronsUpDown } from "lucide-react"
import { z } from "zod"
// import { toast } from "@/components/hooks/use-toast"
import { Button } from "~/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { action, loader } from "../route"
import { parseWithZod } from "@conform-to/zod"
import { SetStatusSchema } from "../schemas"
import { useState } from "react"
import { cn } from "~/lib/utils"


const ApplicationStatus = [
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
  {
    value: "review",
    label: "Review",
  },
]


export function SetStatusDialog() {
  const { status } = useLoaderData<typeof loader>()
  const fetcher = useFetcher<typeof action>();
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(status)
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

  function onSubmit(data: z.infer<typeof SetStatusSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? ApplicationStatus.find((status) => status.value === value)?.label
            : "Select Status..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {ApplicationStatus.map((status) => (
                <CommandItem
                  key={status.value}
                  value={status.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === status.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {status.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
