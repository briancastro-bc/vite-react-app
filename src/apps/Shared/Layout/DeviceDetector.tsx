import { 
  FC, 
  ReactNode, 
} from 'react';
import { useMediaQuery, } from 'react-responsive';

type DeviceDetectorProps = object & {
  mobileComponent: ReactNode;
  desktopComponent: ReactNode;
};

const DeviceDetector: FC<DeviceDetectorProps> = ({
  mobileComponent,
  desktopComponent,
}) => {
  const isMobileDevice: boolean = useMediaQuery({ 
    maxWidth: +import.meta.env.VITE_MOBILE_SCREEN, 
  });

  return (
    <>
      {isMobileDevice && mobileComponent}
      {!isMobileDevice && desktopComponent}
    </>
  );
};

export default DeviceDetector;