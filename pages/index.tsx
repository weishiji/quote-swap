import { Button } from '@chakra-ui/react';
import ExternalLink from '@/components/ExternalLink';
import { useWalletModalToggle } from '@/hooks/application';

const HomePage = () => {
  const onToggleWalletModal = useWalletModalToggle();

  return (
    <>
      <ExternalLink href='https://www.baidu.com'>跳转到百度</ExternalLink>
      <Button onClick={onToggleWalletModal}>Connect Wallet</Button>
    </>
  );
};

export default HomePage;
