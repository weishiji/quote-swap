import { Button, useColorMode } from '@chakra-ui/react';
import ExternalLink from '@/components/ExternalLink';

const HomePage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <ExternalLink href='https://www.baidu.com'>跳转到百度</ExternalLink>
      <Button onClick={toggleColorMode}>{colorMode}</Button>
    </>
  );
};

export default HomePage;
