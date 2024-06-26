import { 
  interfaces,
  Injectable,
  InjectableType, 
  ContainerModule,
} from '@ioc/inversify';

import { UserAccountUseCase,  } from '@contexts/user/application/UserAccountUseCase';
import { UserAddressUseCase,  } from '@contexts/user/application/UserAddressUseCase';
import { UpdateAccountUseCase, } from '@contexts/user/application/UpdateAccountUseCase';
import { AccountSecurityUseCase,  } from '@contexts/user/application/AccountSecurityUseCase';
import { CountriesPhonePrefixesUseCase } from '@contexts/user/application/CountriesPhonePrefixesUseCase';

import { HttpUserRepository, } from '@contexts/user/infrastructure/HttpUserRepository';

const dependencies: Array<Injectable> = [
  {
    id: HttpUserRepository.name,
    class: HttpUserRepository,
    type: 'class',
  },
  {
    id: UserAccountUseCase.name,
    class: UserAccountUseCase,
    type: 'class',
  },
  {
    id: UserAddressUseCase.name,
    class: UserAddressUseCase,
    type: 'class',
  },
  {
    id: AccountSecurityUseCase.name,
    class: AccountSecurityUseCase,
    type: 'class',
  },
  {
    id: CountriesPhonePrefixesUseCase.name,
    class: CountriesPhonePrefixesUseCase,
    type: 'class',
  },
  {
    id: UpdateAccountUseCase.name,
    class: UpdateAccountUseCase,
    type: 'class',
  },
];

const MainContainer = new ContainerModule(
  (bind: interfaces.Bind) => {
    dependencies.forEach((dependency) => {
      const actionByInjectableType: {
        [K in InjectableType]: () => void
      } = {
        'constant': () => bind(dependency.id).toConstantValue(dependency.class),
        'class': () => bind(dependency.id).to(dependency.class).inSingletonScope(),
      };

      actionByInjectableType[dependency.type]();
    })
  }
)

export default MainContainer;