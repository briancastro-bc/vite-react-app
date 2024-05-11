import { FC, } from 'react';
import { useTranslation, } from 'react-i18next';

type NotFoundProps = object;

const NotFound: FC<NotFoundProps> = () => {
  const { t, } = useTranslation();

  return (
    <section>
      {t('notFound.message')}   
    </section>
  );
};

export default NotFound;