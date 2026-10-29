import { ProfileView } from '@/features/profile/profile-view';
import { createMetadata } from '@/shared/lib/metadata';

export const metadata = createMetadata('Profile', '');

export default function ProfilePage() {
  return <ProfileView />;
}
