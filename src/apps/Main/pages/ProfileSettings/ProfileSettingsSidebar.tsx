/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  memo,
  useRef,
  useEffect,
  FC,
  useState,
} from 'react';

const TIMEOUT_DELAY = 400;

type SidebarPosition = 'left' | 'right';

type ProfileSettingsSidebarProps = object & {
  show?: boolean;
  position?: SidebarPosition;
  /**
   * @param concealable si la barra lateral se puede ocultar.
   */
  concealable?: boolean;
};

const defineSidebarPosition = (value: SidebarPosition) => {
  const position = value === 'left' ? 'left-0' : value === 'right' ? 'right-0' : 'left-0';
  return position;
}

const ProfileSettingsSidebar: FC<ProfileSettingsSidebarProps> = ({
  show = true,
  position = 'left',
}) => {
  const sidebarRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isSidebarOpen, setIsSidebarOpen,] = useState<boolean>(false);

  const handleMinimizeSidebar = () => {
    clearTimeout(timeoutRef.current!);

    timeoutRef.current = setTimeout(() => {
      setIsSidebarOpen(false);
    }, TIMEOUT_DELAY);
  };

  useEffect(() => {
    setIsSidebarOpen(show);
  }, [show])

  return (isSidebarOpen && (
    <aside className={`absolute h-full w-80 bg-white overflow-hidden shadow-md ${defineSidebarPosition(position)}`} ref={sidebarRef}>
      <div className='h-full flex flex-col'>
        <div className='flex flex-col gap-y-4 p-4'>
          <div className='flex items-center justify-between'>
            <i className='bx bx-user'/>
            <i className='bx bx-x' />
          </div>
          <h3 className='text-lg font-bold'>
            Account & Settings
          </h3>
        </div>
      </div>
    </aside>
  ));
};

const MemorizeProfileSettingsSidebar = memo(ProfileSettingsSidebar);

export default MemorizeProfileSettingsSidebar;