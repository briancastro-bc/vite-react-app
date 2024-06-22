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

import StepContainer from './StepContainer';

type PreferencesStepProps = object & CommonStepProps;

const PreferencesStep: FC<PreferencesStepProps> = ({
  onActionTriggered,
}) => {
  const { t, } = useTranslation();

  const {
    control,
    formState: {
      isValid,
      isValidating,
    },
    handleSubmit,
  } = useForm<Preferences>({
    resolver: zodResolver(PreferencesSchema),
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<Preferences> = (values) => {

    onActionTriggered('step', PREFERENCES_STEP);
  };

  return (
    <section className='w-full h-auto overflow-y-auto'>
      <div className='h-full p-6 flex flex-col gap-y-8'>
        <StepContainer
          title={t(`profileSettings.steps.${PREFERENCES_STEP}.preferences.subtitle`)}
          subtitle={t(`profileSettings.steps.${PREFERENCES_STEP}.preferences.description`)}>
          <div className='grow h-full flex flex-col p-6 border border-juridica-gray-100 shadow-sm rounded-lg gap-y-8'>
            <div className='grow w-full grid grid-cols-3 gap-x-6 pb-6 border-b'>
              <div className='flex flex-col self-start max-w-96 w-auto gap-y-2'>
                <Typography
                  variant='h3'
                  className='text-base font-bold font-primary'>
                  {t(`profileSettings.steps.${PREFERENCES_STEP}.formatted.title`)}
                </Typography>
                <Typography
                  variant='body1'
                  className='text-sm font-primary'>
                  {t(`profileSettings.steps.${PREFERENCES_STEP}.formatted.description`)}
                </Typography>
              </div>
              <div className='col-span-2 grid grid-cols-3 gap-x-6 gap-y-4'>
                <div className='col-span-3'>
                </div>
              </div>
            </div>
            <div className='grow w-full grid grid-cols-3 gap-x-6 pb-6 border-b'>
              <div className='flex flex-col self-start min-w-96 w-96 gap-y-2'>
                <Typography
                  variant='h3'
                  className='text-base font-bold font-primary'>
                  {t(`profileSettings.steps.${PREFERENCES_STEP}.location.title`)}
                </Typography>
                <Typography
                  variant='body1'
                  className='text-sm font-primary'>
                  {t(`profileSettings.steps.${PREFERENCES_STEP}.location.description`)}
                </Typography>
              </div>
              <div className='col-span-2 grid grid-cols-2 gap-x-6 gap-y-4'>
                <div className='col-span-2'>
                </div>
                <div className='col-span-1'>
                </div>
                <div className='col-span-1'>
                </div>
              </div>
            </div>
            <div className='grow w-full grid grid-cols-3 gap-x-6 pb-6 border-b'>
              <div className='flex flex-col self-start min-w-96 w-96 gap-y-2'>
                <Typography
                  variant='h3'
                  className='text-base font-bold font-primary'>
                  {t(`profileSettings.steps.${PREFERENCES_STEP}.complement.title`)}
                </Typography>
                <Typography
                  variant='body1'
                  className='text-sm font-primary'>
                  {t(`profileSettings.steps.${PREFERENCES_STEP}.complement.description`)}
                </Typography>
              </div>
              <div className='col-span-2 grid grid-cols-2 gap-x-6 gap-y-4'>
                <div className='col-span-1'>
                </div>
                <div className='col-span-1'>
                </div>
              </div>
            </div>
            <div className='grow w-full grid grid-cols-3 gap-x-6 pb-6 border-b'>
              <div className='flex flex-col self-start min-w-96 w-96 gap-y-2'>
                <Typography
                  variant='h3'
                  className='text-base font-bold font-primary'>
                  {t(`profileSettings.steps.${PREFERENCES_STEP}.zip.title`)}
                </Typography>
                <Typography
                  variant='body1'
                  className='text-sm font-primary'>
                  {t(`profileSettings.steps.${PREFERENCES_STEP}.zip.description`)}
                </Typography>
              </div>
              <div className='col-span-2 grid grid-cols-3 gap-x-6 gap-y-4'>
                <div className='col-span-2'>
                </div>
              </div>
            </div>
            <div className='mt-2'>
              <Button
                loading={isValidating}
                disabled={!isValid}
                size='large'
                variant='contained'
                onClick={handleSubmit(onSubmit)}>
                {t('common.buttons.save')}
              </Button>
            </div>
          </div>
        </StepContainer>
      </div>
    </section>
  );
};

export default PreferencesStep;