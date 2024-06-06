import { 
  memo, 
  FC, 
  ComponentProps, 
  Children,
} from 'react';

type ProfileSettingsStepperProps = object & ComponentProps<'div'> & {
  currentStep?: number;
};

const ProfileSettingsStepper: FC<ProfileSettingsStepperProps> = ({
  children,
  currentStep = 0,
}) => {
  const steps = Children.toArray(children);

  return (
    <>
      {steps?.length > 0 ? steps[currentStep] : steps[0]}
    </>
  );
};

const MemorizeProfileSettingsStepper = memo(ProfileSettingsStepper);

export default MemorizeProfileSettingsStepper;