import { FC, } from 'react';

import DeviceDetector from '@apps/Shared/Layout/DeviceDetector';

import ChatMobile from './mobile/ChatMobile';
import ChatDesktop from './desktop/ChatDesktop';

type ChatProps = object;

const Chat: FC<ChatProps> = () => {
  return (
    <DeviceDetector 
      mobileComponent={<ChatMobile />}
      desktopComponent={<ChatDesktop />}/>
  )
};

export default Chat;