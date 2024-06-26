interface Suffix {
  raw: string;
  formatted: string;
}

export interface PhoneSuffix {
  root: string;
  suffixes: Array<Suffix>;
}

export interface Country {
  name: string;
  isoAlpha2: string;
  isoAlpha3: string;
  flag: string;
  flagIcon?: string;
  phoneSuffixes: Array<PhoneSuffix>;
}