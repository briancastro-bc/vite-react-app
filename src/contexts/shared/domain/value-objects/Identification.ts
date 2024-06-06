export const IDENTIFICATION_TYPE = {
  CC: {
    name: 'Cédula de Ciudadanía',
    codeName: 'CC',
  },
  CE: {
    name: 'Cédula de Extranjería',
    codeName: 'CE',
  },
  PA: {
    name: 'Pasaporte',
    codeName: 'PA',
  },
  RC: {
    name: 'Registro Civil de Nacimiento',
    codeName: 'RC',
  },
  CD: {
    name: 'Carnet Diplomático',
    codeName: 'CD',
  },
  DE: {
    name: 'Documento Extranjero',
    codeName: 'DE',
  },
  NIP: {
    name: 'Número de Identificación Personal',
    codeName: 'NIP',
  },
} as const;

export type IdentificationType = (typeof IDENTIFICATION_TYPE)[keyof typeof IDENTIFICATION_TYPE];
