import { FC, } from 'react';

import DeviceDetector from '@apps/Shared/Layout/DeviceDetector';

import ProfileSettingsMobile from './mobile/ProfileSettingsMobile';
import ProfileSettingsDesktop from './desktop/ProfileSettingsDesktop';

type ProfileSettingsProps = object;

const ProfileSettings: FC<ProfileSettingsProps> = () => {
  return (
    <DeviceDetector 
      mobileComponent={<ProfileSettingsMobile />}
      desktopComponent={<ProfileSettingsDesktop />} />
  );
};

export default ProfileSettings;