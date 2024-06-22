import { FC, } from 'react';
import { useSnackbar, } from 'notistack';
import { useTranslation, } from 'react-i18next';
import { useService, } from '@redtea/react-inversify';

import { AccountSecurityPort } from '@contexts/user/application/ports/AccountSecurityPort';
 
type ConfirmPasswordProps = object & {
  open: boolean;
  callback: (...args: Array<any>) => any;
};

const ConfirmPassword: FC<ConfirmPasswordProps> = () => {
  const { t, } = useTranslation();

  const accountSecurityUseCase = useService<AccountSecurityPort>('AccountSecurityUseCase');

  return (
    <></>
  );
};

export default ConfirmPassword;