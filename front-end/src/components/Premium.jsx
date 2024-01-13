
'use client';

import { Button, Card } from 'flowbite-react';

export default function Component() {
  return (
    <Card className="max-w-lg lg:mx-5">
      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
      Upgrade to Premium Membership for Exclusive Benefits!
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
      Unlock a world of premium features and exclusive benefits by upgrading to our premium membership.
      </p>
      <Button className='bg-gradient-to-br from-black via-blue-900 to-black' >
        <a href="/premium">Go with premium</a>
        <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
    </Card>
  );
}
