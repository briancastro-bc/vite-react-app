import { 
  FC, 
  useRef, 
  useState, 
  useEffect,
  useCallback, 
} from 'react';
import { 
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';
import { format, } from 'date-fns';
import { useTranslation, } from 'react-i18next';
import { useSearchParams, } from 'react-router-dom';
import { useService, } from '@redtea/react-inversify';

import Lock from '@mui/icons-material/Lock';
import Star from '@mui/icons-material/Star';
import Home from '@mui/icons-material/Business';
import Person from '@mui/icons-material/Person';
import Manager from '@mui/icons-material/Work';
import ArrowBack from '@mui/icons-material/KeyboardBackspace'
import Wallet from '@mui/icons-material/AccountBalanceWallet';

import { User, } from '@contexts/shared/domain/models';
import { UserAccountPort, } from '@contexts/user/application/ports/UserAccountPort';

import { Button, Typography } from '@theme/main';

import { profileState, stepperState, } from '@apps/Main/state/atoms';

import { 
  ActionType, 
  PROFILE_STEP,
  SECURITY_STEP,
  PREFERENCES_STEP,
  ADDRESS_STEP,
  BILLING_STEP,
  AGENT_STEP,
} from '..';

import NavigationLink from '../Components/NavigationLink';

import ProfileSettingsStepper from '../ProfileSettingsStepper';
import ProfileStep from '../Components/ProfileStep';
import SecurityStep from '../Components/SecurityStep';
import PreferencesStep from '../Components/PreferencesStep';
import AddressStep from '../Components/AddressStep';
import BillingStep from '../Components/BillingStep';

const INTERVAL_DELAY_IN_MS = 900; 

type ProfileSettingsDesktopProps = object;

const ProfileSettingsDesktop: FC<ProfileSettingsDesktopProps> = () => {
  const { t, } = useTranslation();

  const [queryParams, setQueryParams,]  = useSearchParams();

  const intervalRef = useRef<number | null>(null);
  const sidebarRef = useRef<HTMLElement | null>(null);
  const stepperRef = useRef<HTMLDivElement | null>(null);

  const [now, setNow,] = useState<number | null>(null);
  const [loading, setLoading,] = useState<boolean>(false);

  const userAccountUseCase = useService<UserAccountPort>('UserAccountUseCase');

  const [stepper, setStepper,] = useRecoilState(stepperState);

  const profile = useRecoilValue<Partial<User>>(profileState);
  const setProfile = useSetRecoilState<Partial<User>>(profileState);

  const handleActionTriggered: (
    action: ActionType,
    stepNumber?: number,
  ) => void = (action, stepNumber) => {
    const actions: { 
      [K in ActionType]: () => void 
    } = {
      'next': () => setStepper((previousState) => {
        const nextStep = previousState.currentStep + 1;

        setQueryParams({ step: `${nextStep}` });

        return {
          ...previousState,
          currentStep: nextStep,
        };
      }),
      'previous': () => setStepper((previousState) => {
        const previousStep = previousState.currentStep - 1;

        setQueryParams({ step: `${previousStep}` });

        return {
          ...previousState,
          currentStep: previousStep,
        };
      }),
      'step': () => setStepper((previousState) => {
        const step = stepNumber ?? 0;

        setQueryParams({ step: `${step}`, });

        return {
          ...previousState,
          currentStep: stepNumber ?? 0
        };
      }),
    };

    return actions[action]();
  };

  useEffect(() => {
    const step = queryParams.get('step');
    if (!step) {
      setQueryParams({ step: `${PROFILE_STEP}`, });
      handleActionTriggered('step', PROFILE_STEP);
      return;
    }

    setQueryParams({ step });
    handleActionTriggered('step', +step);
  }, [queryParams,]);

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

  const getUserPersonalData = useCallback(async () => {
    const personalData = await userAccountUseCase.getPersonalInformation();
    if ('error' in personalData && 'success' in personalData) {
      throw new Error(personalData.error!);
    }

    return { ...personalData, };
  }, [userAccountUseCase]);

  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);

    if (isSubscribed)
      getUserPersonalData()
        .then((data) => {
          setProfile((previousState) => ({
            ...previousState,
            ...data,
          }));
        })
        .catch((err) => { throw err; })
        .finally(() => setLoading(false));

    return () => {
      isSubscribed = false;
    };
  }, [getUserPersonalData,])

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
              icon={<Person />}
              active={stepper.currentStep === PROFILE_STEP}
              onClick={() => handleActionTriggered('step', PROFILE_STEP)}>
              {t(`profileSettings.steps.${PROFILE_STEP}.title`)} 
            </NavigationLink>
            <NavigationLink 
              icon={<Lock />}
              active={stepper.currentStep === SECURITY_STEP}
              onClick={() => handleActionTriggered('step', SECURITY_STEP)}>
              {t(`profileSettings.steps.${SECURITY_STEP}.title`)} 
            </NavigationLink>
            <NavigationLink 
              icon={<Star />}
              active={stepper.currentStep === PREFERENCES_STEP}
              onClick={() => handleActionTriggered('step', PREFERENCES_STEP)}>
              {t(`profileSettings.steps.${PREFERENCES_STEP}.title`)} 
            </NavigationLink>
            <NavigationLink 
              icon={<Home />}
              active={stepper.currentStep === ADDRESS_STEP}
              onClick={() => handleActionTriggered('step', ADDRESS_STEP)}>
              {t(`profileSettings.steps.${ADDRESS_STEP}.title`)} 
            </NavigationLink>
            <NavigationLink 
              icon={<Wallet />}
              active={stepper.currentStep === BILLING_STEP}
              onClick={() => handleActionTriggered('step', BILLING_STEP)}>
              {t(`profileSettings.steps.${BILLING_STEP}.title`)} 
            </NavigationLink>
            {profile?.isAgent && (
              <NavigationLink 
                icon={<Manager />}
                active={stepper.currentStep === AGENT_STEP}
                onClick={() => handleActionTriggered('step', AGENT_STEP)}>
                {t(`profileSettings.steps.${AGENT_STEP}.title`)} 
              </NavigationLink>
            )}
          </nav>
        </div>
      </aside>
      <div 
        className='absolute h-full overflow-y-auto'
        style={{
          left: sidebarRef.current?.offsetWidth,
          width: `calc(100vw - ${sidebarRef.current?.offsetWidth}px)`
        }}>
        <div 
          className='z-50 fixed top-0 h-14 w-full border bg-white border-juridica-gray-100 rounded-b-lg'
          ref={stepperRef}>
          <div className='h-full px-6 flex items-center justify-between rounded-b-[inherit]'>
            <div>
              <Button
                variant='text'
                startIcon={<ArrowBack />}
                className='font-primary'>
                {t('common.buttons.goback')}
              </Button>
            </div>
          </div>
        </div>
        <div
          style={{
            position: 'relative',
            top: `${stepperRef.current?.offsetHeight}px`
          }}>
          {!loading && (
            <ProfileSettingsStepper currentStep={stepper.currentStep}>
              <ProfileStep onActionTriggered={handleActionTriggered} />
              <SecurityStep onActionTriggered={handleActionTriggered} />
              <PreferencesStep onActionTriggered={handleActionTriggered} />
              <AddressStep onActionTriggered={handleActionTriggered} />
              <BillingStep onActionTriggered={handleActionTriggered} />
            </ProfileSettingsStepper>
          )}
          {loading && (
            <h3>Cargando...</h3>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileSettingsDesktop;