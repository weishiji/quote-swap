import Davatar, { Image } from '@davatar/react';
import { useMemo } from 'react';

import { useActiveWeb3React } from '@/hooks/web3';

const Identicon = () => {
  const { account, library } = useActiveWeb3React();

  const supportsENS = useMemo(() => {
    return ([1, 3, 4, 5] as Array<number | undefined>).includes(library?.network?.chainId);
  }, [library]);

  return (
    <>
      {account && supportsENS ? (
        <Davatar address={account} size={24} provider={library} />
      ) : (
        // eslint-disable-next-line jsx-a11y/alt-text
        <Image address={account} size={24} />
      )}
    </>
  );
};

export default Identicon;
