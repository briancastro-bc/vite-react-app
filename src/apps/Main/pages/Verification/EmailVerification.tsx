import * as z from 'zod';
import { 
  FC, 
  useRef,
  useState,
  useCallback,
} from 'react';
import { useRecoilValue, } from 'recoil';
import { 
  useForm, 
  Controller, 
  SubmitHandler, 
} from 'react-hook-form';
import { useSnackbar, } from 'notistack';
import { useNavigate, } from 'react-router-dom';
import { useTranslation, } from 'react-i18next';
import { useService, } from '@redtea/react-inversify';
import { zodResolver, } from '@hookform/resolvers/zod';

import {
  Button,
  TextField,
} from '@theme/main';

import { User, } from '@contexts/shared/domain/models';
import { AccountSecurityPort, } from '@contexts/user/application/ports/AccountSecurityPort';

import { profileState } from '@apps/Main/state/atoms';
import { 
  VerificationType, 
  VerificationSchema, 
} from '@apps/Main/schemas/VerificationSchema';

import VerificationCard from './Components/VerificationCard';

type EmailVerificationProps = object;

const EmailVerification: FC<EmailVerificationProps> = () => {
  const navigate = useNavigate();
  const { t, } = useTranslation();

  const snackbarRef = useRef<number | string | null>(null);

  const [loading, setLoading,] = useState<boolean>(false);

  const {
    closeSnackbar,
    enqueueSnackbar,
  } = useSnackbar();

  const profile = useRecoilValue<Partial<User>>(profileState);

  const accountSecurityUseCase = useService<AccountSecurityPort>('AccountSecurityUseCase');

  const {
    control,
    formState: {
      isValid,
      isValidating,
    },
    handleSubmit,
  } = useForm<VerificationType>({
    resolver: zodResolver(VerificationSchema),
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<VerificationType> = useCallback(async (values) => {
    setLoading(true);
    const { code, } = values;

    if (!code) {
      if (snackbarRef.current) closeSnackbar(snackbarRef.current);

      snackbarRef.current = enqueueSnackbar(t('verification.errors.emptyCode'), {
        variant: 'error',
      });

      setLoading(false);
      return;
    }

    const success = await accountSecurityUseCase.verifyEmail(code);
    if (!success) {
      if (snackbarRef.current) closeSnackbar(snackbarRef.current);

      snackbarRef.current = enqueueSnackbar(t('verification.errors.unsuccessfully'), {
        variant: 'error',
      });

      setLoading(false);
      return;
    }

    setLoading(false);

    if (snackbarRef.current) closeSnackbar(snackbarRef.current);

    snackbarRef.current = enqueueSnackbar(t('verification.success'), {
      variant: 'success',
    });

    navigate('/profile-settings');
  }, [accountSecurityUseCase,]);

  return (
    <div className='h-full flex items-center justify-center py-6'>
      <VerificationCard
        title={t('verification.email.title')}
        description={t('verification.email.description', { 
          name: profile?.givenName,
          email: profile?.email,
        })}>
        <div className='grow flex flex-col py-6'>
          <Controller
            render={({ field, fieldState, }) => (
              <TextField 
                {...field}
                variant='outlined'
                label={t('verification.email.label')} 
                placeholder={t('verification.email.placeholder')}
                error={fieldState?.invalid && (fieldState?.isDirty || fieldState?.isTouched)}
                helperText={fieldState?.error && fieldState?.error?.message} 
                required={VerificationSchema.shape.code instanceof z.ZodOptional } />
            )}
            control={control}
            name='code'/>
            <div className='w-full mt-4 flex flex-col gap-y-2'>
              <Button
                disabled={!isValid || isValidating || loading}
                loading={loading}
                variant='contained'
                onClick={handleSubmit(onSubmit)}
                className='w-full'>
                {t('common.buttons.verify')}
              </Button>
              <Button
                variant='outlined'
                onClick={() => navigate('/profile-settings')}
                className='w-full'>
                {t('common.buttons.goback')}
              </Button>
            </div>
        </div>
      </VerificationCard>
    </div>
  );
};

export default EmailVerification;