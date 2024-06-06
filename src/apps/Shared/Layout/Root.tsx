import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import Chat from '../../Main/pages/Chat/Chat';

type RootProps = object;

const Root: FC<RootProps> = () => {
  return (
    <>
      <Outlet />
      <Chat />
    </>
  );
};

export default Root;