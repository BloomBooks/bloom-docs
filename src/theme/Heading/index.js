/*
This file and its corresponding styles.module.css were generated
by running `yarn swizzle @docusaurus/theme-classic Heading --eject`
which docusaurus considers an unsafe operation.
Basically, we have duplicated their code and won't get fixes when
they release new versions. But we are already a major version 
behind, so I think we're fine until we upgrade to v3.
At that time, of course, we'll want to get rid of this.

The fix we made here was to add translate="no"
to prevent auto-translate by the browser from marring the links.
Basically, we applied https://github.com/facebook/docusaurus/pull/11360.
*/

import React from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import {useThemeConfig} from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
export default function Heading({as: As, id, ...props}) {
  const {
    navbar: {hideOnScroll},
  } = useThemeConfig();
  // H1 headings do not need an id because they don't appear in the TOC.
  if (As === 'h1' || !id) {
    return <As {...props} id={undefined} />;
  }
  const anchorTitle = translate(
    {
      id: 'theme.common.headingLinkTitle',
      message: 'Direct link to {heading}',
      description: 'Title for link to heading',
    },
    {
      heading: typeof props.children === 'string' ? props.children : id,
    },
  );
  return (
    <As
      {...props}
      className={clsx(
        'anchor',
        hideOnScroll
          ? styles.anchorWithHideOnScrollNavbar
          : styles.anchorWithStickyNavbar,
        props.className,
      )}
      id={id}>
      {props.children}
      <Link
        className="hash-link"
        to={`#${id}`}
        aria-label={anchorTitle}
        title={anchorTitle}
        translate="no">
        &#8203;
      </Link>
    </As>
  );
}
