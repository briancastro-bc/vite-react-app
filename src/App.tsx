import { FC, useCallback, useEffect, } from 'react';
import { RecoilRoot, } from 'recoil';
import { TFunction, } from 'i18next';
import { RouterProvider, } from 'react-router-dom';
import { Context, } from '@redtea/react-inversify';
import { LocalizationProvider, } from '@mui/x-date-pickers';
import { AdapterDateFns, } from '@mui/x-date-pickers/AdapterDateFnsV3';

import { Container, } from '@ioc/inversify';

import { CacheRepository, } from '@contexts/shared/domain/repositories/CacheRepository';

import { socket, SocketContext, } from '@apps/Shared/contexts/socket';

import Router from './Router';

type AppProps = object & {
  i18n: TFunction;
  container: Container;
};

const App: FC<AppProps> = ({
  container,
}) => {
  const cacheRepository = container.get<CacheRepository>('LocalCacheRepository');

  const cache = useCallback(async () => {
    return await cacheRepository.cache();
  }, [cacheRepository,]);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed)
      cache()
        .then()
        .catch((err) => console.error(err));

    return () => {
      isSubscribed = false;
    }
  }, [cache,]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <RecoilRoot>
        <Context.Provider value={container}>
          <SocketContext.Provider value={socket}>
            <RouterProvider router={Router} />
          </SocketContext.Provider>
        </Context.Provider>
      </RecoilRoot>
    </LocalizationProvider>
  );
}

export default App
