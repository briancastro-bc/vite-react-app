import {
  FC,
} from 'react';
import { zodResolver, } from '@hookform/resolvers/zod';
import {
  useForm,
  Controller,
  SubmitHandler,
} from 'react-hook-form';
import { useTranslation, } from 'react-i18next';

import {
  Button,
  TextField,
  Typography,
} from '@theme/main';

import {
  Preferences,
  PreferencesSchema,
} from '@apps/Main/schemas/PreferencesSchema';

import { 
  PREFERENCES_STEP,
  CommonStepProps,
} from '..';

import StepContainer from '../Components/StepContainer';

type PreferencesStepProps = object & CommonStepProps;

const PreferencesStep: FC<PreferencesStepProps> = ({
  onActionTriggered,
}) => {
  const { t, } = useTranslation();

  return (
    <section className='w-full h-auto overflow-y-auto'>
      <div className='h-full p-6 flex flex-col gap-y-8'>
        <StepContainer
          title={t(`profileSettings.steps.${PREFERENCES_STEP}.preferences.subtitle`)}
          subtitle={t(`profileSettings.steps.${PREFERENCES_STEP}.preferences.description`)}>
          Preferences steps
        </StepContainer>
      </div>
    </section>
  );
};

export default PreferencesStep;