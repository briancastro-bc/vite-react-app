import { Container, BindingScopeEnum, } from 'inversify';

import { IndexedDatabaseService } from '@contexts/shared/infrastructure/services/IndexedDatabaseService';

import { FetchHttpRepository, } from '@contexts/shared/infrastructure/repositories/FetchHttpRepository';
import { LocalCacheRepository } from '@contexts/shared/infrastructure/repositories/LocalCacheRepository';
import { HttpRemoteRepository, } from '@contexts/shared/infrastructure/repositories/HttpRemoteRepository';
import { HttpPicklistRepository } from '@contexts/shared/infrastructure/repositories/HttpPicklistRepository';

export type InjectableType = 'constant' | 'class';

export type Injectable = {
	id: string;
	class: any;
	type: InjectableType;
	scope?: typeof BindingScopeEnum;
}

const dependencies = [
	{
		id: 'BACKEND_URL',
		class: import.meta.env.VITE_BACKEND_URL,
		type: 'constant',
	},
	{
		id: FetchHttpRepository.name,
		class: FetchHttpRepository,
		type: 'class',
	},
	{
		id: HttpRemoteRepository.name,
		class: HttpRemoteRepository,
		type: 'class',
	},
	{
		id: IndexedDatabaseService.name,
		class: IndexedDatabaseService,
		type: 'class',
	},
	{
		id: HttpPicklistRepository.name,
		class: HttpPicklistRepository,
		type: 'class',
	},
	{
		id: LocalCacheRepository.name,
		class: LocalCacheRepository,
		type: 'class',
	},
] as Injectable[];

export function bindCoreDependencies(container: Container): Container {
	dependencies.forEach((dependency) => {
		const actionByInjectableType: {
			[K in InjectableType]: () => void
		} = {
			'constant': () => container.bind(dependency.id).toConstantValue(dependency.class),
			'class': () => container.bind(dependency.id).to(dependency.class).inSingletonScope(),
		};

		actionByInjectableType[dependency.type]();
	});

	return container;
}
