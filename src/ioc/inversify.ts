import { Container, } from 'inversify';

import { bindCoreDependencies } from './dependencies';

import MainContainer from '@apps/Main/container';

export function bootstrapContainer(): Container {
  const container = bindCoreDependencies(new Container({
    defaultScope: 'Singleton',
  }));

  container.load(MainContainer);

  return container;
}

export * from 'inversify';
export type {
  Injectable,
  InjectableType,
  bindCoreDependencies,
} from './dependencies';