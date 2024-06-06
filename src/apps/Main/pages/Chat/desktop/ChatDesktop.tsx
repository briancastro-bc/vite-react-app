import {
  FC,
  useRef,
  useState,
} from 'react';
import { useTranslation, } from 'react-i18next';

import ArrowUp from '@mui/icons-material/KeyboardArrowUp';
import ArrowDown from '@mui/icons-material/KeyboardArrowDown';

import { 
  Typography, 
} from '@theme/main';

import ChatPreview from '../Components/ChatPreview';

const CHAT_HEIGHT = 748;

const CHAT_HEADER_HEIGHT = 58;

type ChatDesktopProps = object;

const ChatDesktop: FC<ChatDesktopProps> = () => {
  const { t, } = useTranslation();

  const chatRef = useRef<HTMLDivElement | null>(null);
  const chatHeaderRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen,] = useState<boolean>(false);

  return (
    <div
      className='z-50 fixed right-0 w-[420px] mr-6 bg-juridica-gray-50 border border-juridica-gray-200 shadow-sm rounded-lg overflow-hidden'
      style={{
        height: `${CHAT_HEIGHT+CHAT_HEADER_HEIGHT}px`,
        ...(isOpen && {
          bottom: 0,
        }),
        ...(!isOpen && {
          bottom: `${-CHAT_HEIGHT}px`,
        })
      }}
      ref={chatRef}>
      <div 
        className='flex items-center px-2 py-1 rounded-tr-[inherit] rounded-tl-[inherit] border-b border-b-juridica-gray-200 hover:bg-juridica-gray-100 hover:cursor-pointer'
        style={{
          height: `${CHAT_HEADER_HEIGHT}px`,
        }}
        ref={chatHeaderRef}
        onClick={() => setIsOpen(!isOpen)}>
        <div className='grow flex items-center gap-x-2'>
          <div className='h-8 w-8 rounded-full border border-juridica-gray-200'>
            {/* <img className='h-full w-full object-contain rounded-[inherit]' /> */}
          </div>
          <Typography
            variant='h3'
            className='font-primary text-lg leading-4 font-bold text-juridica-gray-800'>
            {t('chat.title')}
          </Typography>
        </div>
        <div 
          className='ml-auto w-8 h-8 flex items-center justify-center rounded-full hover:cursor-pointer transition-all duration-[300ms]'
          onClick={() => setIsOpen(!isOpen)}>
          {isOpen && (
            <ArrowDown />
          )}
          {!isOpen && (
            <ArrowUp className=''/>
          )}
        </div>
      </div>
      <div className='grow h-full overflow-y-auto'>
        <ChatPreview user={{
          id: '1235',
          givenName: 'Brian',
          familyName: 'Castro',
        }} 
        lastMessage={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id varius dolor, fermentum tempor tortor. Donec pretium purus sed quam venenatis, ut blandit ex pulvinar. Donec massa nunc, dictum in massa non, aliquet porttitor odio. Fusce fermentum tempus semper. Nam at mi convallis, congue magna et, facilisis elit. Duis a.'} 
        action={(...args) => console.log(args)}/>
      </div>
    </div>
  );
};

export default ChatDesktop;