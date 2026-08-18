import {
  Bus,
  Gift,
  Headset,
  Hotel,
  Map,
  PartyPopper,
  Percent,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  bus: Bus,
  hotel: Hotel,
  users: Users,
  trophy: Trophy,
  "party-popper": PartyPopper,
  map: Map,
  headset: Headset,
  // Used by the agent offers rather than the services list.
  gift: Gift,
  percent: Percent,
};

type ServiceIconProps = {
  name: string;
  className?: string;
};

export function ServiceIcon({name, className = "size-6"}: ServiceIconProps) {
  const Icon = iconMap[name.toLowerCase()] ?? Bus;
  return <Icon className={className} aria-hidden />;
}
