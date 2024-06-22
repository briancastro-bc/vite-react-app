import { FC, } from 'react';
import { Outlet, } from 'react-router-dom';

type VerificationProps = object;

const VerificationLayout: FC<VerificationProps> = () => {
  return (
    <section className='relative h-screen w-full overflow-hidden'>
      <div className='h-full w-full flex items-center justify-center'>
        <Outlet/>
      </div>
    </section>
  );
}

export default VerificationLayout;