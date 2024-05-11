import { Container, } from 'inversify';

import { bindCoreDependencies } from './dependencies';

export function bootstrapContainer(): Container {
  const container = new Container({
    defaultScope: 'Singleton',
  });
  // container.load();

  return bindCoreDependencies(container);
}

export * from 'inversify';
export type {
  Injectable,
  InjectableType,
  bindCoreDependencies,
} from './dependencies';