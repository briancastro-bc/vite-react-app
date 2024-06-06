import { 
  memo, 
  FC, 
  PropsWithChildren, 
} from 'react';

import { 
  Typography, 
} from '@theme/main';

type StepContainerProps = object & PropsWithChildren & {
  title?: string;
  subtitle?: string;
};

const StepContainer: FC<StepContainerProps> = ({
  title,
  subtitle,
  children,
}) => {
  if (!children)  {
    throw new Error('Children must be pass');
  }

  return (
    <article className='min-h-72 h-auto flex flex-col'>
      <div className='flex flex-col gap-y-2 mb-6'>
        {title && (
          <Typography
            variant='h2'
            className='font-primary-alt text-xl font-bold text-juridica-gray-950'>
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography
            variant='body1'
            className='font-primary text-sm font-medium text-juridica-gray-600'>
            {subtitle}
          </Typography>
        )}
      </div>
      {children && (
        <>{children}</>
      )}
    </article>
  )
};

const MemorizeStepContainer = memo(StepContainer);

export default MemorizeStepContainer;