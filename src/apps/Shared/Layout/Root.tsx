import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { SnackbarProvider, } from 'notistack';

import Chat from '@apps/Main/pages/Chat/Chat';

const SNACKBAR_DURATION_IN_MS = 10000;

type RootProps = object;

const RootLayout: FC<RootProps> = () => {
  return (
    <SnackbarProvider
      preventDuplicate
      maxSnack={5}
      autoHideDuration={SNACKBAR_DURATION_IN_MS}
      // Components={{
      //   default: Snackbar,
      // }}>
      >
      <Outlet />
      <div className='relative'>
        <Chat />
      </div>
    </SnackbarProvider>
  );
};

export default RootLayout;