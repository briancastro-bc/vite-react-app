import { FC, } from 'react';
import { Link, } from 'react-router-dom';

const Home: FC<object> = () => {
  return (
    <>
    Home
    <Link to={'/profile-settings'}>Profile settings</Link>
    </>
  )
};

export default Home;