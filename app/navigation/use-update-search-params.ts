import { useCallback } from 'react'
import { useRouter } from './use-router'
import { useNavigation } from '../../router/use-navigation'
import { Platform } from 'react-native'
import { UseUpdateSearchParamsReturns } from './use-update-search-params.types'
import { usePathname } from './use-pathname'
import { useSearchParams } from 'next/navigation'

export default function useUpdateSearchParams<
  Type extends Record<string, string | null> = Record<string, string | null>
>(): UseUpdateSearchParamsReturns<Type> {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return useCallback(
    (params: Partial<Type>, options) => {
      const next = new URLSearchParams(searchParams?.toString())

      let shouldReplace = false
      Object.entries(params as {[k: string]: string}).forEach(([key, value]) => {
        if (next.has(key)) {
          shouldReplace = true
        }
        if (value == null) {
          next.delete(key)
        } else {
          next.set(key, value)
        }
      })
      const action =
        router[options?.webBehavior ?? (shouldReplace ? 'replace' : 'push')]

      const stringifiedNext = next.toString();
      action(`${pathname}${stringifiedNext ? `?${stringifiedNext}` : ''}`)
    },
    [router]
  )
}
