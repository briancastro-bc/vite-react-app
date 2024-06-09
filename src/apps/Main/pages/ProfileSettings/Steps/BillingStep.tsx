import {
  FC,
} from 'react';
import { useTranslation, } from 'react-i18next';

import { CommonStepProps, } from '..';

import StepContainer from '../Components/StepContainer';

type BillingStepProps = object & CommonStepProps;

const BillingStep: FC<BillingStepProps> = ({
  onActionTriggered,
}) => {
  const { t, } = useTranslation();

  return (
    <section className='w-full h-auto overflow-y-auto'>
      <div className='h-full p-6 flex flex-col gap-y-8'>
        <StepContainer
          title={t('profileSettings.steps.4.billing.subtitle')}
          subtitle={t('profileSettings.steps.4.billing.description')}>
          Billing steps
        </StepContainer>
      </div>
    </section>
  );
};

export default BillingStep;