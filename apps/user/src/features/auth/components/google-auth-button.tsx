'use client';

import { Button } from '@repo/ui/components/ui/button';
import { Icons } from '@repo/ui/components/icons';

interface GoogleSignInButtonProps {
  onClick: () => void;
}

export default function GoogleSignInButton({ onClick }: GoogleSignInButtonProps) {
  return (
    <Button className='w-full' variant='outline' type='button' onClick={onClick}>
      <Icons.google className='mr-2 h-4 w-4' />
      Continue with Google
    </Button>
  );
}
