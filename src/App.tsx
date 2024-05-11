import { FC, } from 'react';
import { TFunction, } from 'i18next';
import { RouterProvider, } from 'react-router-dom';
import { Context, } from '@redtea/react-inversify';

import { Container, } from '@ioc/inversify';

import Router from './Router';

type AppProps = object & {
  i18n: TFunction;
  container: Container;
};

const App: FC<AppProps> = ({
  container,
}) => {
  return (
    <Context.Provider value={container}>
      <RouterProvider router={Router} />
    </Context.Provider>
  );
}

export default App
