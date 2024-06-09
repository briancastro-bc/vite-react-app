import * as z from 'zod';
import { FC, } from 'react';
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
  Security,
  SecuritySchema,
} from '@apps/Main/schemas/SecuritySchema';

import { 
  SECURITY_STEP, 
  CommonStepProps, 
} from '..';

import StepContainer from '../Components/StepContainer';

type SecurityStepProps = object & CommonStepProps;

const SecurityStep: FC<SecurityStepProps> = ({
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
  } = useForm<Security>({
    resolver: zodResolver(SecuritySchema),
  })

  const onSubmit: SubmitHandler<Security> = (values) => {
    console.log(values);

    onActionTriggered('step', SECURITY_STEP);
  }

  return (
    <section className='w-full h-auto overflow-y-auto'>
      <div className='h-full p-6 flex flex-col gap-y-8'>
        <StepContainer
          title={t('profileSettings.steps.1.security.subtitle')}
          subtitle={t('profileSettings.steps.1.security.description')}>
          <div className='grow h-full flex flex-col p-6 border border-juridica-gray-100 shadow-sm rounded-lg gap-y-8'>
            <div className='grow w-full grid grid-cols-3 gap-x-6 pb-6 border-b'>
              <div className='flex flex-col self-start min-w-96 w-96 gap-y-2'>
                <Typography
                  variant='h3'
                  className='text-base font-bold font-primary'>
                  {t('profileSettings.steps.1.password.title')}
                </Typography>
              </div>
              <div className='col-span-2 grid grid-cols-3 gap-x-6 gap-y-4'>
                <div className='col-span-2'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                      {...field}
                      type='password'
                      variant='outlined'
                      color='primary'
                      label={t('profileSettings.steps.1.password.newPassword.label')}
                      placeholder={t('profileSettings.steps.1.password.newPassword.placeholder')}
                      error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                      helperText={fieldState?.error && fieldState?.error?.message} 
                      required={SecuritySchema.shape.newPassword instanceof z.ZodOptional } />
                    )} 
                    control={control}
                    name='newPassword'
                    defaultValue={''} />
                </div>
                <div className='col-span-2'>
                  <Controller
                    render={({ field, fieldState, }) => (
                      <TextField
                      {...field}
                      type='password'
                      variant='outlined'
                      color='primary'
                      label={t('profileSettings.steps.1.password.newPasswordConfirmation.label')}
                      placeholder={t('profileSettings.steps.1.password.newPasswordConfirmation.placeholder')}
                      error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                      helperText={fieldState?.error && fieldState?.error?.message} 
                      required={SecuritySchema.shape.newPasswordConfirmation instanceof z.ZodOptional } />
                    )} 
                    control={control}
                    name='newPasswordConfirmation'
                    defaultValue={''} />
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

export default SecurityStep;