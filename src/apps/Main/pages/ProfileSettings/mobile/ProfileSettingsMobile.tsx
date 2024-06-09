import { 
  FC,
  useRef,
  useState,
  useEffect,
} from 'react';
import { format, } from 'date-fns';
import { useRecoilState } from 'recoil';
import { useTranslation, } from 'react-i18next';
import { Controller, useForm, } from 'react-hook-form';

import Clock from '@mui/icons-material/Schedule'
import Calendar from '@mui/icons-material/CalendarToday';

import {
  MenuItem,
  TextField,
  Typography,
} from '@theme/main';

import { stepperState } from '@apps/Main/state/atoms';

import { 
  ActionType, 
  PROFILE_STEP,
  SECURITY_STEP,
  PREFERENCES_STEP,
  ADDRESS_STEP,
  BILLING_STEP,
} from '..';
import ProfileSettingsStepper from '../ProfileSettingsStepper';

const INTERVAL_DELAY_IN_MS = 800;

const STEPS = [
  PROFILE_STEP,
  SECURITY_STEP,
  PREFERENCES_STEP,
  ADDRESS_STEP,
  BILLING_STEP,
];

type ProfileSettingsMobileProps = object;

const ProfileSettingsMobile: FC<ProfileSettingsMobileProps> = () => {
  const { t, } = useTranslation();

  const intervalRef = useRef<number | null>(null);

  const [now, setNow,] = useState<number | null>(null);

  const [stepper, setStepper,] = useRecoilState(stepperState);

  const handleActionTriggered: (
    action: ActionType,
    stepNumber?: number,
  ) => void = (action, stepNumber) => {
    const actions: { 
      [K in ActionType]: () => void 
    } = {
      'next': () => setStepper((previousState) => ({
        ...previousState,
        currentStep: previousState.currentStep + 1,
      })),
      'previous': () => setStepper((previousState) => ({
        ...previousState,
        currentStep: previousState.currentStep - 1,
      })),
      'step': () => setStepper((previousState) => ({
        ...previousState,
        currentStep: stepNumber ?? 0
      })),
    };

    return actions[action]();
  };

  const stepForm = useForm<{ step: number, }>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      step: PROFILE_STEP,
    },
  });

  useEffect(() => {
    setNow(Date.now());

    intervalRef.current = window.setInterval(() => {
      setNow(Date.now());
    }, INTERVAL_DELAY_IN_MS);

    return () => {
      clearInterval(intervalRef.current!)
    };
  }, []);

  useEffect(() => {
    const subscription = stepForm.watch((value) => 
      setStepper((previousState) => ({
        ...previousState,
        currentStep: value.step ?? 0,
      }))
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [stepForm.watch]);

  const currentDate = format(now ?? new Date(), 'dd MMM yyyy');
  const currentTime = format(now ?? new Date(), 'hh:mm aaaa');

  return (
    <section className='h-screen w-full overflow-hidden'>
      <div className='h-full flex flex-col'>
        <div className='p-4 flex flex-col gap-y-3'>
          <Typography
            variant='h2'
            className='text-xl font-bold font-primary text-juridica-gray-900'>
            {t('profileSettings.title')}
          </Typography>
          <div className='flex items-center gap-x-6'>
            <div className='flex items-center gap-x-1 text-xs text-juridica-gray-700'>
              <Calendar fontSize='small'/>
              <span className='font-primary-alt text-inherit font-medium'>
                {currentDate}
              </span>
            </div>
            <div className='flex items-center gap-x-1 text-xs text-juridica-gray-700'>
              <Clock />
              <span className='font-primary-alt text-inherit font-medium'>
                {currentTime}
              </span>
            </div>
          </div>
          <div className='pt-[12px]'>
            <Controller
              render={({ field, }) => (
                <TextField
                  {...field}
                  select
                  variant='outlined'
                  color='primary'
                  SelectProps={{
                    className: 'font-primary-alt text-sm',
                  }}>
                    {STEPS && STEPS?.length > 0 && STEPS.map((step) => (
                      <MenuItem className='font-primary-alt text-[15px]' key={step} value={step}>
                        {t(`profileSettings.steps.${step}.title`)}
                      </MenuItem>
                    ))}
                  </TextField>
              )}
              control={stepForm.control}
              name='step' />
          </div>
        </div>
        <div className='grow h-full overflow-y-auto'>
          <ProfileSettingsStepper currentStep={stepper.currentStep}>
            <h1>Step 1</h1>
            <h1>Step 2</h1>
            <h1>Step 3</h1>
            <h1>Step 4</h1>
          </ProfileSettingsStepper>
        </div>
      </div>
    </section>
  )
};

export default ProfileSettingsMobile;