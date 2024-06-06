import { atom, } from 'recoil';

import { User } from '@contexts/shared/domain/models';

const PROFILE_KEY = 'profileSettings:profile';

export const profileState = atom<Partial<User>>({
  key: PROFILE_KEY,
  default: {},
});

const STEPPER_KEY = 'profileSettings:stepper';

export const stepperState = atom<{
  currentStep: number;
}>({
  key: STEPPER_KEY,
  default: {
    currentStep: 0,
  },
});