import {
  Bell,
  Home,
  Menu,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react"
import { Link, NavLink, useLoaderData, } from "@remix-run/react"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet"
import { ElementType, } from "react"
import { cn } from "~/lib/utils"
import { loader } from "../route"
// import { SignedIn, UserButton } from "@clerk/remix"

export type NavId =
  "dashboard"
  | "applications"


const main_nav: Array<{ id: NavId, name: string, to: string, icon: ElementType }> = [
  {
    id: "dashboard",
    name: "Dashboard",
    to: "/",
    icon: Home
  },
  {
    id: "applications",
    name: "Applications",
    to: "/applications",
    icon: Users
  },

]

export interface NavNotification {
  id: NavId
  number?: number
  type: "high" | "medium" | "low"
}






export default function AppShell({
  children,
}: {
  children: React.ReactNode,

}) {
  const { pantry_name, main_notification } = useLoaderData<typeof loader>()


  return (
    <div className="grid grid-cols-1 h-screen lg:grid-cols-12   ">
      {/* Desktop sidebar */}
      <div className=" hidden border-r-2 h-full lg:block lg:col-span-3 lg:flex-col xl:col-span-2  ">
        <div className="flex h-full max-h-screen min-w-full flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4  lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">{pantry_name}</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {main_nav.map((nav_item) => {
                const number = main_notification?.[nav_item.id].number ?? 0

                return (

                  <NavLink
                    key={nav_item.id}
                    to={nav_item.to}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <nav_item.icon className="h-4 w-4" />
                    {nav_item.name}
                    {number > 0 && (
                      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        {main_notification[nav_item.id].number}
                      </Badge>
                    )}
                  </NavLink>
                )
              }
              )}
            </nav>
          </div>
          <div className="mt-auto p-4">
            {/* <SignedIn>
              <UserButton
                showName
              />
            </SignedIn> */}
          </div>
        </div>
      </div>

      <div className="col-span-full overflow-hidden  h-full flex flex-col lg:col-span-9  xl:col-span-10">
        <header className="flex flex-row h-14 items-center gap-4 border-b bg-muted/40 px-4  lg:px-6">
          {/* Mobile sidebar */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="mt-3.5 grid gap-2 text-lg font-medium">
                {
                  main_nav.map((nav_item) => {
                    const number = main_notification?.[nav_item.id].number ?? 0
                    return (
                      <NavLink
                        key={nav_item.id}
                        to={nav_item.to}
                        className={({ isActive }) => cn(
                          isActive
                            ? "bg-muted"
                            : "text-muted-foreground hover:text-foreground",
                          "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <nav_item.icon className="h-6 w-6" />
                        {nav_item.name}
                        {
                          number > 0 && (
                            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                              {main_notification[nav_item.id].number}
                            </Badge>
                          )
                        }
                      </NavLink>
                    )
                  }
                  )
                }
              </nav>
              <div className="mt-auto">
                {/* <SignedIn>
                  <UserButton
                    showName
                  />
                </SignedIn> */}
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
          </div>
          {/* <SignedIn>
            <UserButton />
          </SignedIn> */}
        </header>
        <main className=" flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )

}