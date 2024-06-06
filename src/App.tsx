import { FC, } from 'react';
import { RecoilRoot, } from 'recoil';
import { TFunction, } from 'i18next';
import { RouterProvider, } from 'react-router-dom';
import { Context, } from '@redtea/react-inversify';

import { Container, } from '@ioc/inversify';
import { socket, SocketContext, } from '@apps/Shared/contexts/socket';

import Router from './Router';

type AppProps = object & {
  i18n: TFunction;
  container: Container;
};

const App: FC<AppProps> = ({
  container,
}) => {
  return (
    <RecoilRoot>
      <Context.Provider value={container}>
        <SocketContext.Provider value={socket}>
          <RouterProvider router={Router} />
        </SocketContext.Provider>
      </Context.Provider>
    </RecoilRoot>
  );
}

export default App
