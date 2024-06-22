import * as z from 'zod';
import { 
  FC, 
  useRef,
  useState,
  useEffect, 
  useCallback,
} from 'react';
import { zodResolver, } from '@hookform/resolvers/zod';
import {
  useForm,
  Controller,
  SubmitHandler,
} from 'react-hook-form';
import { useSnackbar, } from 'notistack';
import { useRecoilValue, } from 'recoil';
import { useTranslation, } from 'react-i18next';
import { useNavigate, } from 'react-router-dom';
import { useService, } from '@redtea/react-inversify';

import East from '@mui/icons-material/East';
import UnverifiedUser from '@mui/icons-material/GppBad';
import VerifiedUser from '@mui/icons-material/VerifiedUser';

import {
  Chip,
  Button,
  TextField,
  Typography,
} from '@theme/main';

import { User } from '@contexts/shared/domain/models';
import { AccountSecurityPort } from '@contexts/user/application/ports/AccountSecurityPort';

import { profileState } from '@apps/Main/state/atoms';
import {
  Security,
  SecuritySchema,
} from '@apps/Main/schemas/SecuritySchema';

import {
  SECURITY_STEP,
  CommonStepProps,
} from '..';

import StepContainer from './StepContainer';

type SecurityStepProps = object & CommonStepProps;

const SecurityStep: FC<SecurityStepProps> = ({
  onActionTriggered,
}) => {
  const navigate = useNavigate();
  const { t, } = useTranslation();

  const snackbarRef = useRef<number | string | null>(null);

  const [loadingEmailVerification, setLoadingEmailVerification] = useState<boolean>(false);
  const [loadingPhoneVerification, setLoadingPhoneVerification] = useState<boolean>(false);

  const {
    closeSnackbar,
    enqueueSnackbar,
  } = useSnackbar();

  const accountSecurityUseCase = useService<AccountSecurityPort>('AccountSecurityUseCase');

  const profile = useRecoilValue<Partial<User>>(profileState);

  const {
    control,
    formState: {
      isValid,
      isValidating,
    },
    reset,
    handleSubmit,
  } = useForm<Security>({
    resolver: zodResolver(SecuritySchema),
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<Security> = (values) => {
    console.log(values);

    onActionTriggered('step', SECURITY_STEP);
  }

  const handleSendEmailVerificationCode: () => Promise<void> = useCallback(async () => {
    setLoadingEmailVerification(true);

    const sended = await accountSecurityUseCase.sendEmailVerificationCode();
    if (!sended) {
      if (snackbarRef.current) closeSnackbar(snackbarRef.current);

      snackbarRef.current = enqueueSnackbar(t(`profileSettings.steps.${SECURITY_STEP}.verification.errors.unsuccessfully`), {
        variant: 'error',
      });

      setLoadingEmailVerification(false);
      return;
    }

    if (snackbarRef.current) closeSnackbar(snackbarRef.current);

    snackbarRef.current = enqueueSnackbar(t(`profileSettings.steps.${SECURITY_STEP}.verification.success`), {
      variant: 'default',
    });

    setLoadingEmailVerification(false);
    navigate('/verify/email');
  }, [accountSecurityUseCase,]);

  const handleSendPhoneVerificationCode = useCallback(async () => {
    setLoadingPhoneVerification(true);

    const sended = await accountSecurityUseCase.sendPhoneVerificationCode();
    if (!sended) {
      if (snackbarRef.current) closeSnackbar(snackbarRef.current);

      snackbarRef.current = enqueueSnackbar(t(`profileSettings.steps.${SECURITY_STEP}.verification.errors.unsuccessfully`), {
        variant: 'error',
      });

      setLoadingPhoneVerification(false);
      return;
    }

    if (snackbarRef.current) closeSnackbar(snackbarRef.current);

    snackbarRef.current = enqueueSnackbar(t(`profileSettings.steps.${SECURITY_STEP}.verification.success`), {
      variant: 'default',
    });

    setLoadingPhoneVerification(false);
    navigate('/verify/phone');
  }, [accountSecurityUseCase,]);

  useEffect(() => {
    reset({
      ...profile,
    });

    return () => {};
  }, [profile, reset])

  return (
    <section className='w-full h-auto overflow-y-auto'>
      <div className='h-full p-6 flex flex-col gap-y-8'>
        <StepContainer
          title={t(`profileSettings.steps.${SECURITY_STEP}.security.subtitle`)}
          subtitle={t(`profileSettings.steps.${SECURITY_STEP}.security.description`)}>
          <div className='grow h-full flex flex-col p-6 border border-juridica-gray-100 shadow-sm rounded-lg gap-y-8'>
            <div className='grow w-full grid grid-cols-3 gap-x-6 pb-6 border-b'>
              <div className='flex flex-col self-start min-w-96 w-96 gap-y-2'>
                <Typography
                  variant='h3'
                  className='text-base font-bold font-primary'>
                  {t(`profileSettings.steps.${SECURITY_STEP}.password.title`)}
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
                        label={t(`profileSettings.steps.${SECURITY_STEP}.password.newPassword.label`)}
                        placeholder={t(`profileSettings.steps.${SECURITY_STEP}.password.newPassword.placeholder`)}
                        error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                        helperText={fieldState?.error && fieldState?.error?.message}
                        required={SecuritySchema.shape.newPassword instanceof z.ZodOptional} />
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
                        label={t(`profileSettings.steps.${SECURITY_STEP}.password.newPasswordConfirmation.label`)}
                        placeholder={t(`profileSettings.steps.${SECURITY_STEP}.password.newPasswordConfirmation.placeholder`)}
                        error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                        helperText={fieldState?.error && fieldState?.error?.message}
                        required={SecuritySchema.shape.newPasswordConfirmation instanceof z.ZodOptional} />
                    )}
                    control={control}
                    name='newPasswordConfirmation'
                    defaultValue={''} />
                </div>
              </div>
            </div>
            <div className='grow w-full grid grid-cols-3 gap-x-6 pb-6 border-b'>
              <div className='flex flex-col self-start max-w-96 w-full gap-y-2'>
                <Typography
                  variant='h3'
                  className='text-base font-bold font-primary'>
                  {t(`profileSettings.steps.${SECURITY_STEP}.verification.title`)}
                </Typography>
                <Typography
                  variant='body1'
                  className='text-sm font-primary'>
                  {t(`profileSettings.steps.${SECURITY_STEP}.verification.description`)}
                </Typography>
              </div>
              <div className='col-span-2 grid grid-cols-3 gap-x-6 gap-y-4'>
                <div className='col-span-3'>
                  {!profile?.emailVerified && (
                    <Chip
                      disabled={loadingEmailVerification}
                      className='text-base font-primary'
                      label={t(`profileSettings.steps.${SECURITY_STEP}.verification.emailUnverified`)}
                      size='medium'
                      variant='filled'
                      color='error'
                      onClick={handleSendEmailVerificationCode}
                      icon={<UnverifiedUser />} 
                      onDelete={() => {}}
                      deleteIcon={<East />} />
                  )}
                  {profile?.emailVerified && (
                    <Chip
                      className='text-base font-primary'
                      label={t(`profileSettings.steps.${SECURITY_STEP}.verification.emailVerified`)}
                      size='medium'
                      variant='outlined'
                      color='primary'
                      icon={<VerifiedUser />} />
                  )}
                </div>
                <div className='col-span-3'>
                  {!profile?.phoneVerified && (
                    <Chip
                      disabled={loadingPhoneVerification}
                      className='text-base font-primary'
                      label={t(`profileSettings.steps.${SECURITY_STEP}.verification.phoneUnverified`)}
                      size='medium'
                      variant='filled'
                      color='error'
                      onClick={handleSendPhoneVerificationCode}
                      icon={<UnverifiedUser />} 
                      onDelete={() => {}}
                      deleteIcon={<East />} />
                  )}
                  {profile?.phoneVerified && (
                    <Chip
                      className='text-base font-primary'
                      label={t(`profileSettings.steps.${SECURITY_STEP}.verification.phoneVerified`)}
                      size='medium'
                      variant='outlined'
                      color='primary'
                      icon={<VerifiedUser />} />
                  )}
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
      </div >
    </section >
  );
};

export default SecurityStep;