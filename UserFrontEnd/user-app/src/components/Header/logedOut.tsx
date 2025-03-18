import Link from 'next/link';
import { Button } from '../ui/button';

export const LoggedOut = () => {
  return (
    <>
      <Link href="/login">
        <Button variant={'secondary'} className="rounded-3xl">
          Sign Up
        </Button>
      </Link>

      <Link href="/signup">
        <Button
          variant={'secondary'}
          className="bg-red-500 text-white hover:bg-red-400 rounded-3xl"
        >
          Log in
        </Button>
      </Link>
    </>
  );
};
