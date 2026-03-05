export interface SidebarItem {
  id: string
  label: string
  icon?: React.ReactNode
  href?: string
  children?: SidebarItem[]
  isVisible: boolean
}