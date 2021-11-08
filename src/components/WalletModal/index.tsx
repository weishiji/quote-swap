import { useState, useEffect } from 'react';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import ReactGA from 'react-ga';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
  IconButton,
} from '@chakra-ui/react';
import { FaChevronLeft } from 'react-icons/fa';

import MetamaskIcon from '@/assets/images/metamask.png';
import { ApplicationModal } from '@/actions/application';
import { useModalOpen, useWalletModalToggle } from '@/hooks/application';
import usePrevious from '@/hooks/usePrevious';
import { useWalletConnectMonitoringEventCallback } from '@/hooks/useMonitoringEventCallback';
import { SUPPORTED_WALLETS } from '@/constants/wallet';
import { OVERLAY_READY } from '@/connectors/Fortmatic';
import { fortmatic, injected, portis } from '@/connectors';
import { isMobile } from '@/utils/userAgent';
import notification from '@/utils/notification';
import AccountDetails from '@/components/AccountDetails';

import Option from './Option';
import PendingView from './PendingView';

const WALLET_VIEWS = {
  OPTIONS: 'options',
  ACCOUNT: 'account',
  PENDING: 'pending',
};

interface IWalletModalProps {
  pendingTransactions: string[]; // hashes of pending
  confirmedTransactions: string[]; // hashes of confirmed
  ENSName?: string;
}

const WalletModal = ({
  pendingTransactions,
  confirmedTransactions,
  ENSName,
}: IWalletModalProps) => {
  const { active, account, connector, activate, error } = useWeb3React();
  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);
  const [pendingWallet, setPendingWallet] = useState<AbstractConnector | undefined>();
  const [pendingError, setPendingError] = useState<boolean>();
  const walletModalOpen = useModalOpen(ApplicationModal.WALLET);
  const toggleWalletModal = useWalletModalToggle();
  const previousAccount = usePrevious(account);
  const logMonitoringEvent = useWalletConnectMonitoringEventCallback();

  // close on connection, when logged out before
  useEffect(() => {
    if (account && !previousAccount && walletModalOpen) {
      toggleWalletModal();
    }
  }, [account, previousAccount, toggleWalletModal, walletModalOpen]);

  // always reset to account view
  useEffect(() => {
    if (walletModalOpen) {
      setPendingError(false);
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [walletModalOpen]);

  // close modal when a connection is successful
  const activePrevious = usePrevious(active);
  const connectorPrevious = usePrevious(connector);
  useEffect(() => {
    if (
      walletModalOpen &&
      ((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))
    ) {
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [setWalletView, active, error, connector, walletModalOpen, activePrevious, connectorPrevious]);

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    let name = '';
    Object.keys(SUPPORTED_WALLETS).map((key) => {
      if (connector === SUPPORTED_WALLETS[key].connector) {
        return (name = SUPPORTED_WALLETS[key].name);
      }
      return true;
    });
    // log selected wallet
    ReactGA.event({
      category: 'Wallet',
      action: 'Change Wallet',
      label: name,
    });
    setPendingWallet(connector); // set wallet for pending view
    setWalletView(WALLET_VIEWS.PENDING);

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined;
    }

    connector &&
      activate(connector, undefined, true)
        .then(async () => {
          const walletAddress = await connector.getAccount();
          logMonitoringEvent({ walletAddress });
        })
        .catch((error) => {
          notification.error({
            title: 'Error',
            description: error.message,
          });
          if (error instanceof UnsupportedChainIdError) {
            activate(connector); // a little janky...can't use setError because the connector isn't set
          } else {
            setPendingError(true);
          }
        });
  };

  // close wallet modal if fortmatic modal is active
  useEffect(() => {
    fortmatic.on(OVERLAY_READY, () => {
      toggleWalletModal();
    });
  }, [toggleWalletModal]);

  const getOptions = () => {
    const isMetamask = window.ethereum && window.ethereum.isMetaMask;
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key];
      // check for mobile options
      if (isMobile) {
        //disable portis on mobile for now
        if (option.connector === portis) {
          return null;
        }

        if (!window.web3 && !window.ethereum && option.mobile) {
          return (
            <Option
              onClick={() => {
                option.connector !== connector && !option.href && tryActivation(option.connector);
              }}
              id={`connect-${key}`}
              key={key}
              active={option.connector && option.connector === connector}
              color={option.color}
              link={option.href}
              header={option.name}
              subHeader={null}
              icon={option.iconURL}
            />
          );
        }
        return null;
      }

      // overwrite injected when needed
      if (option.connector === injected) {
        // don't show injected if there's no injected provider
        if (!(window.web3 || window.ethereum)) {
          if (option.name === 'MetaMask') {
            return (
              <Option
                id={`connect-${key}`}
                key={key}
                color={'#E8831D'}
                header={<>Install Metamask</>}
                subHeader={null}
                link={'https://metamask.io/'}
                icon={MetamaskIcon}
              />
            );
          } else {
            return null; //dont want to return install twice
          }
        }
        // don't return metamask if injected provider isn't metamask
        else if (option.name === 'MetaMask' && !isMetamask) {
          return null;
        }
        // likewise for generic
        else if (option.name === 'Injected' && isMetamask) {
          return null;
        }
      }
      // return rest of options
      return (
        !isMobile &&
        !option.mobileOnly && (
          <Option
            id={`connect-${key}`}
            onClick={() => {
              option.connector === connector
                ? setWalletView(WALLET_VIEWS.ACCOUNT)
                : !option.href && tryActivation(option.connector);
            }}
            key={key}
            active={option.connector === connector}
            color={option.color}
            link={option.href}
            header={option.name}
            subHeader={null}
            icon={option.iconURL}
          />
        )
      );
    });
  };

  const getModalContent = () => {
    if (account && walletView === WALLET_VIEWS.ACCOUNT) {
      return (
        <>
          <ModalHeader>Account</ModalHeader>
          <ModalCloseButton right={5} top={5} />
          <ModalBody pb={4}>
            <AccountDetails
              toggleWalletModal={toggleWalletModal}
              pendingTransactions={pendingTransactions}
              confirmedTransactions={confirmedTransactions}
              ENSName={ENSName}
              openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)}
            />
          </ModalBody>
        </>
      );
    }
    if (walletView === WALLET_VIEWS.PENDING) {
      return (
        <>
          <ModalHeader>
            <IconButton
              aria-label='Set Pending Error'
              icon={<FaChevronLeft />}
              onClick={() => {
                setPendingError(false);
                setWalletView(WALLET_VIEWS.ACCOUNT);
              }}
              variant='ghost'
            />
          </ModalHeader>
          <ModalCloseButton right={5} top={5} />
          <ModalBody pb={4}>
            <PendingView
              connector={pendingWallet}
              error={pendingError}
              setPendingError={setPendingError}
              tryActivation={tryActivation}
            />
          </ModalBody>
        </>
      );
    }
    return (
      <>
        <ModalHeader>Connect a Wallet</ModalHeader>
        <ModalCloseButton right={5} top={5} />
        <ModalBody pb={4}>
          <VStack spacing={4}>{getOptions()}</VStack>
        </ModalBody>
      </>
    );
  };

  return (
    <Modal isOpen={walletModalOpen} onClose={toggleWalletModal} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius='md' w={{ base: '85%', sm: 'md' }} my={4}>
        {getModalContent()}
      </ModalContent>
    </Modal>
  );
};

export default WalletModal;
