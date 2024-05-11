import { Container, BindingScopeEnum, } from 'inversify';

export type InjectableType = 'constant' | 'class';

export type Injectable = {
	id: string;
	class: any;
	type: InjectableType;
	scope?: typeof BindingScopeEnum;
}

const dependencies = [
	{
		id: 'baseUrl',
		class: import.meta.VITE_BACKEND_URL,
		type: 'constant',
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
