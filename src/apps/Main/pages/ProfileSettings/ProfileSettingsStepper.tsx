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
  ...args
}) => {
  const steps = Children.toArray(children);

  return (
    <div {...args}>
      {steps?.length > 0 ? steps[currentStep] : steps[0]}
    </div>
  );
};

const MemorizeProfileSettingsStepper = memo(ProfileSettingsStepper);

export default MemorizeProfileSettingsStepper;