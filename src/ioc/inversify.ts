import { Container, } from 'inversify';

import { bindCoreDependencies } from './dependencies';

import MainContainer from '@apps/Main/container';

const container = bindCoreDependencies(new Container({
  defaultScope: 'Singleton',
}));

container.load(MainContainer);

export * from 'inversify';
export type {
  Injectable,
  InjectableType,
  bindCoreDependencies,
} from './dependencies';
export {
  container,
};