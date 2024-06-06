const ACTION_TYPE = {
  NEXT: 'next',
  PREV: 'previous',
  STEP: 'step',
} as const;

export const PROFILE_STEP = 0;

export const SECURITY_STEP = 1;

export const PREFERENCES_STEP = 2;

export const ADDRESS_STEP = 3;

export const BILLING_STEP = 4;

export type ActionType = (typeof ACTION_TYPE)[keyof typeof ACTION_TYPE];

export type CommonStepProps = {
  onActionTriggered: (
    action: ActionType,
    stepNumber?: number,
  ) => void;
};