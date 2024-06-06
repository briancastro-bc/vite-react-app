import 'reflect-metadata';

import { 
  Suspense, 
  StrictMode, 
} from 'react';
import { createRoot, } from 'react-dom/client';
import { 
  ThemeProvider, 
  StyledEngineProvider, 
} from '@mui/material';

import { use, TFunction, } from 'i18next';
import { initReactI18next,  } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';

import { customTheme, } from '@theme/main';

import { bootstrapContainer, Container, } from '@ioc/inversify';

import es from '@assets/locales/es.json';
import en from '@assets/locales/en.json';

import App from './App.tsx';

import './index.css';

type Setup = object & {
  i18n: TFunction;
  container: Container;
};

async function bootstrapI18N(): Promise<TFunction> {
  const i18n = await use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: true,
      resources: {
        es,
        en,
      },
      fallbackLng: 'es',
      lowerCaseLng: true,
      returnNull: true,
      returnObjects: true,
      interpolation: {
        escapeValue: false,
      }
    });

  return i18n;
}

async function bootstrap(): Promise<Setup> {
  const i18n = await bootstrapI18N();
  const container = bootstrapContainer();

  return {
    i18n,
    container,
  }
}

bootstrap()
  .then(setup => {
    const {
      i18n,
    } = setup;

    const rootElement = document.getElementById('root')!;

    const root = createRoot(rootElement)
    root.render(
        <StrictMode>  
          <Suspense fallback={<p>{i18n('common.loading.basic')}</p>}>
            <ThemeProvider theme={customTheme}>
              <StyledEngineProvider injectFirst>
                <App {...setup}/>
              </StyledEngineProvider>
            </ThemeProvider>
          </Suspense>
        </StrictMode>
      );
  })
  .catch((err) => { throw err; });
