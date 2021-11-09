import { MouseEvent } from 'react';
import NextLink from 'next/link';
import { Button, Link, LinkProps } from '@chakra-ui/react';
import ReactGA from 'react-ga';
import { anonymizeLink } from '@/utils/anonymizeLink';

type OmitTExternalLink = Omit<LinkProps, 'as' | 'ref' | 'onClick'>;

function handleClickExternalLink(event: MouseEvent<HTMLAnchorElement>) {
  const { target, href } = event.currentTarget;

  const anonymizedHref = anonymizeLink(href);

  // don't prevent default, don't redirect if it's a new tab
  if (target === '_blank' || event.ctrlKey || event.metaKey) {
    ReactGA.outboundLink({ label: anonymizedHref }, () => {
      console.debug('Fired outbound link event', anonymizedHref);
    });
  } else {
    event.preventDefault();
    // send a ReactGA event and then trigger a location change
    ReactGA.outboundLink({ label: anonymizedHref }, () => {
      window.location.href = anonymizedHref;
    });
  }
}

const ExternalLink = ({
  target = '_blank',
  rel = 'noopener noreferrer',
  href,
  ...rest
}: OmitTExternalLink) => {
  return (
    <NextLink href={href} passHref>
      <Link target={target} rel={rel} onClick={handleClickExternalLink} {...rest} />
    </NextLink>
  );
};

export default ExternalLink;
