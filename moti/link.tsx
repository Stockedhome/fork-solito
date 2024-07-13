'use client'
import { MotiPressableProps, MotiPressable } from 'moti/interactions'
import { forwardRef } from 'react'
import type { View } from 'react-native'

import { useLink } from '../link/use-custom-link'

export type MotiLinkProps = Parameters<typeof useLink>[0] &
  Omit<
    MotiPressableProps,
    // you can't pass any props that will be overridden by useLink
    | keyof Parameters<typeof useLink>[0]
    | keyof Pick<ReturnType<typeof useLink>, 'href' | 'accessibilityRole'>
  >

export const MotiLink = forwardRef<View, MotiLinkProps>((props, ref) => {
  const { onPress, ...linkProps } = useLink(props)

  return (
    <MotiPressable
      {...props}
      {...linkProps}
      onPress={(e?: any) => {
        // we let users pass an onPress prop, in case they want to preventDefault()
        props.onPress?.()

        onPress?.(e)
      }}
      ref={ref}
    />
  )
})

MotiLink.displayName = 'MotiLink'
