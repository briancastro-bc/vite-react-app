import { 
  FC,
  ReactNode, 
  PropsWithChildren,
} from 'react';
import { useMediaQuery, } from 'react-responsive';

type DeviceDetectorProps = object & PropsWithChildren & {
  mobileComponent: FC | ReactNode;
  desktopComponent: FC | ReactNode;
};

const DeviceDetector: FC<DeviceDetectorProps> = ({
  mobileComponent,
  desktopComponent,
  children,
}) => {
  const isMobileDevice: boolean = useMediaQuery({ 
    maxWidth: +import.meta.env.VITE_MOBILE_SCREEN, 
  });

  return (
    <>
      {isMobileDevice && mobileComponent}
      {!isMobileDevice && desktopComponent}
      {children && children}
    </>
  );
};

export default DeviceDetector;