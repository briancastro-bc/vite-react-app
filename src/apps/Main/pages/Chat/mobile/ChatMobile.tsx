import {
  FC,
} from 'react';

import Message from '@mui/icons-material/Inbox';

import {
  Button,
} from '@theme/main';

type ChatMobileProps = object;

const ChatMobile: FC<ChatMobileProps> = () => {
  return (
    // <span className='z-50 absolute bottom-0 right-0 mr-4 mb-4 rounded-md p-3 shadow-md border border-juridica-gray-100 bg-white'>
    //   <Message className='text-xl text-juridica-500' />
    // </span>
    <Button
      variant='outlined'
      className='z-50 absolute bottom-0 right-0 mr-4 mb-4 rounded-md p-2 min-w-[50px] shadow-md border border-juridica-100'
      size='small'>
      <Message />
    </Button>
  );
};

export default ChatMobile;