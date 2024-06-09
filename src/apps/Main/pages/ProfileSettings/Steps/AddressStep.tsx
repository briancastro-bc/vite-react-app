import {
  FC,
} from 'react';
import { useTranslation, } from 'react-i18next';

import { CommonStepProps, } from '..';

import StepContainer from '../Components/StepContainer';

type AddressStepProps = object & CommonStepProps;

const AddressStep: FC<AddressStepProps> = ({
  onActionTriggered,
}) => {
  const { t, } = useTranslation();

  return (
    <section className='w-full h-auto overflow-y-auto'>
      <div className='h-full p-6 flex flex-col gap-y-8'>
        <StepContainer
          title={t('profileSettings.steps.3.address.subtitle')}
          subtitle={t('profileSettings.steps.3.address.description')}>
          Address steps
        </StepContainer>
      </div>
    </section>
  );
};

export default AddressStep;