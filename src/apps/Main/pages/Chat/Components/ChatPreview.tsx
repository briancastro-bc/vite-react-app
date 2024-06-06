import {
  FC,
  memo,
  MouseEvent,
  useCallback,
  useRef,
} from 'react';

import { User } from '@shared/domain/models';
import { Typography } from '@root/src/apps/Shared/Theme/main';

type SelectedUserProps = Pick<User, 'id' | 'givenName' | 'familyName' | 'photo'>

type ChatPreviewProps = object & {
  user: SelectedUserProps;
  lastMessage: string;
  action: (...args: Array<unknown>) => any;
};

const ChatPreview: FC<ChatPreviewProps> = ({
  user,
  lastMessage,
  action,
}) => {
  const chatPreviewRef = useRef<HTMLDivElement | null>(null);

  const overflowText: (lenght: number) => string = useCallback((lenght) => {
    return lastMessage.slice(0, lenght);
  }, [lastMessage,]);

  const handlePreviewClick: (event: MouseEvent, userId: string) => void = (
    event,
    userId
  ) => {
    action(event, userId)
  };

  return (
    <div
      ref={chatPreviewRef}
      className='h-24 w-full px-2 py-4 flex items-center gap-x-4 hover:bg-juridica-gray-100 hover:cursor-pointer'
      onClick={(e) => handlePreviewClick(e, user.id)}>
      <div className='w-12 h-12 rounded-full border border-juridica-gray-200'>

      </div>
      <div className='flex flex-col h-full items-start gap-y-1'>
        <Typography
          variant='h4'
          className='text-base leading-4 font-primary font-semibold text-juridica-gray-800'> {(user && user?.givenName) ?? ''} {(user && user?.familyName) ?? ''} </Typography>
        <Typography
          variant='body1'
          className='max-w-[228px] text-sm leading-4 font-primary'>
          {overflowText(60)}...
        </Typography>
      </div>
    </div>
  );
};

const MemorizeChatPreview = memo(ChatPreview);

export default MemorizeChatPreview;