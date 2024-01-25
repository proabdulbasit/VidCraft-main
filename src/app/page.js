'use client';

import NewNavbar from '@/components/navbar/Navbar';
import { Box } from '@/components/navbar/Box';

export default function Home() {
  return (
    <Box
      css={{
        maxW: '100%',
      }}
    >
      <NewNavbar />

      <div className='px-6 pt-6 sm:px-6 md:px-20'>
        Navigate to Create Videos.
      </div>
    </Box>
  );
}
