import { ArrowLeftRight, List, Plus, User } from "lucide-react";

export function buildSidebar() {
  return [
    {
      id: "devolucao",
      label: "Devolução",
      href: "/devolucao",
      isVisible: true,
      icon: <ArrowLeftRight />,
      children: [
        {
          id: "devolucao-list",
          label: "Lista de Devoluções",
          href: "/devolucao/lista",
          isVisible: true,
          icon: <List />,
        },
        {
          id: "devolucao-create",
          label: "Criar Devolução",
          href: "/devolucao/criar",
          isVisible: true,
          icon: <Plus />,
        }
      ]
    },
    {
      id: "customers",
      label: "Clientes",
      href: "/finance",
      isVisible: true,
      icon: <User />,
      children: [
        {
          id: "customers-list",
          label: "Lista de Clientes",
          href: "/finance/dashboard",
          isVisible: true
        }
      ]
    }
  ]
}
