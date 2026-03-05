'use client'
import React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/presentation/shared/components/ui/sidebar"
import { buildSidebar } from "./build-sidebar"
import { NavMain } from "./navMenu"
import { NavUser } from "./navUser"
import { useUserStore } from "../../store/user.store"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { userData, logout } = useUserStore();
  return (
    <div>

      {userData && <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">LILO - HUB</span>
              <span className="truncate text-xs">Guia comercial</span>
            </div>
          </SidebarMenuButton>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={buildSidebar()} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser logout={logout} user={userData} />
        </SidebarFooter>
      </Sidebar>}
    </div>
  )
}
