import {
  memo,
  FC,
  useRef,
  MouseEvent,
  ComponentPropsWithRef,
} from 'react';

type NavigationLinkProps = object & ComponentPropsWithRef<'a'> & {
  icon: string;
  active?: boolean;
};

const isActiveStyle: (active?: boolean) => string = (active) => {
  return active ? 'bg-juridica-100 border-juridica-200 text-juridica-600' : 'text-juridica-gray-500';
};

const NavigationLink: FC<NavigationLinkProps> = ({
  icon,
  active,
  children,
  onClick,
  ...props
}) => {
  if (typeof children !== 'string') {
    throw new Error('children must be an string');
  }

  const elementRef = useRef<HTMLAnchorElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!onClick) return;

    event.preventDefault();
    event.stopPropagation();

    onClick(event);
  };

  return (
    <a
      ref={elementRef}
      className={`flex items-center gap-x-2 px-4 py-4 rounded-lg border border-transparent font-bold text-base hover:cursor-pointer hover:bg-juridica-100 hover:text-juridica-400 ${isActiveStyle(active)}`}
      onClick={handleClick}
      {...props}>
      <span className='h-6 w-6 flex items-center justify-center'>
        <i className={`text-xl ${icon}`} />
      </span>
      <span>
        {children}
      </span>
    </a>
  );
};

const MemorizeNavigationLink = memo(NavigationLink);

export default MemorizeNavigationLink;