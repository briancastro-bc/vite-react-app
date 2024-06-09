import {
  FC,
} from 'react';
import { useTranslation, } from 'react-i18next';

import { CommonStepProps, } from '..';

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
          title={t('profileSettings.steps.2.preferences.subtitle')}
          subtitle={t('profileSettings.steps.2.preferences.description')}>
          Preferences steps
        </StepContainer>
      </div>
    </section>
  );
};

export default PreferencesStep;