export type UseUpdateSearchParamsReturns<
  Params extends Record<string, string | null>
> = (
  params: Partial<Params>,
  options?: {
    webBehavior?: 'replace' | 'push'
  }
) => void
