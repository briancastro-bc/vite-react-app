import { 
  memo, 
  useRef, 
  FC, 
  PropsWithChildren,
} from 'react';

import Mailbox from '@assets/images/mailbox.svg';

import { Typography, } from '@theme/main';

type VerificationCardProps = object & PropsWithChildren & {
  title: string;
  description: string;
};

const VerificationCard: FC<VerificationCardProps> = ({
  title,
  description,
  children,
}) => {
  const articleRef = useRef<HTMLElement | null>(null);

  return (
    <article
      ref={articleRef}
      className='w-full max-w-[680px] min-w-[520px] h-full max-h-[720px] rounded-xl bg-white border border-juridica-gray-100 shadow-md'>
      <div className='h-full w-full p-8'>
        <div className='flex flex-col gap-y-4 justify-center items-center pb-6 border-b border-b-juridica-gray-100'>
          <div className='w-48 h-auto'>
            <img className='h-full w-full' src={Mailbox} alt='Email ilustration' />
          </div>
          <Typography
            variant='h2'
            className='font-primary-alt text-3xl font-bold text-juridica-500'>
            {title}
          </Typography>
          <Typography
            variant='body1'
            className='font-primary text-base font-medium text-juridica-gray-700 text-center'>
            {description}
          </Typography>
        </div>
        {children}
      </div>
    </article>
  );
};

const MemorizeVerificationCard = memo(VerificationCard);

export default MemorizeVerificationCard;