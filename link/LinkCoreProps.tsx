'use client'
import React from 'react'
import type { ComponentProps } from 'react'
import { NextLink } from './next-link'
import type { useLink } from './use-custom-link';

export type LinkCoreProps = {
  children: React.ReactNode
} & Omit<
  ComponentProps<typeof NextLink>,
  'passHref' | 'replace' | 'legacyBehavior'
> & Parameters<typeof useLink>[0]
