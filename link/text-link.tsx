'use client'
import { P } from 'dripsy'

import { LinkCore } from './core'
import { LinkCoreProps } from './LinkCoreProps'

type TextLinkProps = LinkCoreProps & { textProps?: Parameters<typeof P>[0] }

function TextLink({ textProps, ...props }: TextLinkProps) {
  return (
    <LinkCore
      {...props}
      Component={P as any} // react-native vs react ReactNode, smh
      componentProps={{ selectable: false, ...textProps }}
    />
  )
}

export { TextLink }
export type { TextLinkProps }
