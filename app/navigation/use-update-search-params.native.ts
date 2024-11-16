import { useCallback } from 'react'
import { useRouter } from './use-router'
import { useNavigation } from '../../router/use-navigation'
import { Platform } from 'react-native'
import { UseUpdateSearchParamsReturns } from './use-update-search-params.types'

export default function useUpdateSearchParams__Native<
  Type extends Record<string, string | null> = Record<string, string | null>
>(): UseUpdateSearchParamsReturns<Type> {
  const navigation = useNavigation()

  return useCallback(
    (params) => {
      navigation?.setParams(params)
    },
    [navigation]
  )
}
