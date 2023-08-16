import { useEffect, useRef, useState } from 'react'
import useAPI from '@/app/hooks/useApi'


const useAPIOnLoad = <T, U>(serverFunc: () => Promise<U>, setFunc: (val: U) => void, deps: any[] = []) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>(false)
  const [wrappedFunc] = useAPI(serverFunc)
  const prevDeps = useRef<any>(null)

  const exec = (async (setLoading = true) => {
    try {
      if (setLoading)
        setIsLoading(true)
      const result = await wrappedFunc()
      setFunc(result)
    } catch (e: any) {
      setError(e)
    } finally {
      if (setLoading)
        setIsLoading(false)
    }
  })
  useEffect(() => {
    if (JSON.stringify(prevDeps.current) !== JSON.stringify(deps)) {
      const utilExec = async () => {
        try {
          setIsLoading(true)
          const result = await wrappedFunc()
          setFunc(result)
        } catch (e: any) {
          setError(e)
        } finally {
          setIsLoading(false)
        }
      }
      utilExec().then()
      prevDeps.current = deps
    }
  }, [...deps])

  return {
    isLoading,
    error,
    reload: exec,
  }
}

export default useAPIOnLoad
