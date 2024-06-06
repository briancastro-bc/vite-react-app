import { 
  FC, 
  useRef, 
  useState, 
  useEffect, 
} from 'react';
import { 
  useRecoilState,
} from 'recoil';
import { format, } from 'date-fns';
import { useTranslation, } from 'react-i18next';

import { stepperState, } from '@apps/Main/state/atoms';

import { 
  ActionType, 
  PROFILE_STEP,
  SECURITY_STEP,
  PREFERENCES_STEP,
  ADDRESS_STEP,
  BILLING_STEP,
} from '..';

import NavigationLink from '../Components/NavigationLink';

import ProfileSettingsStepper from '../ProfileSettingsStepper';
import PublicProfileStep from '../Steps/PublicProfileStep';
import { Typography } from '@root/src/apps/Shared/Theme/main';

const INTERVAL_DELAY_IN_MS = 1000; 

type ProfileSettingsDesktopProps = object;

const ProfileSettingsDesktop: FC<ProfileSettingsDesktopProps> = () => {
  const { t, } = useTranslation();

  const sidebarRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<number | null>(null);

  const [now, setNow,]  = useState<number | null>(null);

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

  useEffect(() => {
    setNow(Date.now());

    intervalRef.current = window.setInterval(() => {
      setNow(Date.now());
    }, INTERVAL_DELAY_IN_MS);

    return () => {
      clearInterval(intervalRef.current!);
    };
  }, [])

  const currentDate = format(now ?? new Date(), 'hh:mm aaaa dd MMM yyyy');

  return (
    <section className='relative w-full h-screen overflow-hidden'>
      <aside className='absolute h-full w-80 bg-white overflow-hidden border-r border-r-juridica-gray-100 shadow-sm z-10' ref={sidebarRef}>
        <div className='h-full flex flex-col'>
          <div className='flex flex-col px-6 py-4'>
            <div className='flex flex-col gap-y-2'>
              <Typography 
                variant='h2'
                className='text-2xl font-bold font-primary-alt'>
                {t('profileSettings.title')}
              </Typography>
              <span className='text-sm text-juridica-gray-500 font-medium'>
                {currentDate}
              </span>
            </div>
          </div>
          <nav className='grow h-full flex flex-col gap-y-2 px-6 mt-4'>
            <NavigationLink 
              icon='bx bx-user' 
              active={stepper.currentStep === PROFILE_STEP}
              onClick={() => handleActionTriggered('step', PROFILE_STEP)}>
              {t('profileSettings.steps.0.title')} 
            </NavigationLink>
            <NavigationLink 
              icon='bx bx-lock'
              active={stepper.currentStep === SECURITY_STEP}
              onClick={() => handleActionTriggered('step', SECURITY_STEP)}>
              {t('profileSettings.steps.1.title')} 
            </NavigationLink>
            <NavigationLink 
              icon='bx bx-star'
              active={stepper.currentStep === PREFERENCES_STEP}
              onClick={() => handleActionTriggered('step', PREFERENCES_STEP)}>
              {t('profileSettings.steps.2.title')} 
            </NavigationLink>
            <NavigationLink 
              icon='bx bx-home-smile'
              active={stepper.currentStep === ADDRESS_STEP}
              onClick={() => handleActionTriggered('step', ADDRESS_STEP)}>
              {t('profileSettings.steps.3.title')} 
            </NavigationLink>
            <NavigationLink 
              icon='bx bx-wallet'
              active={stepper.currentStep === BILLING_STEP}
              onClick={() => handleActionTriggered('step', BILLING_STEP)}>
              {t('profileSettings.steps.4.title')} 
            </NavigationLink>
          </nav>
        </div>
      </aside>
      <div 
        className='absolute h-full overflow-y-auto'
        style={{
          left: sidebarRef.current?.offsetWidth,
          width: `calc(100vw - ${sidebarRef.current?.offsetWidth}px)`
        }}>
        <ProfileSettingsStepper currentStep={stepper.currentStep}>
          <PublicProfileStep onActionTriggered={(...args) => handleActionTriggered(...args)} />
          <h2>Adios</h2>
        </ProfileSettingsStepper>
      </div>
    </section>
  );
};

export default ProfileSettingsDesktop;