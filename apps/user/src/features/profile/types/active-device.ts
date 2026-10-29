import type { Icon } from '@repo/ui/components/icons';

export interface ActiveDevice {
  id: string;
  name: string;
  icon: Icon;
  os: string;
  browser: string;
  location: string;
  lastActive: string;
  isCurrent?: boolean;
}
