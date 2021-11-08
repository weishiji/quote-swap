import { useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';

const Web3Status = () => {
  const [status, setStatus] = useState('idle');
  const { account, connector, error } = useWeb3React();

  return <div>Web3Status</div>;
};

export default Web3Status;
