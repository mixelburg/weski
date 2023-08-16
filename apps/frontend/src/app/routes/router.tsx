import { FC, lazy, memo, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import FullscreenLoader from '@/app/utils/loaders/FullscreenLoader';


const LzyIndex = lazy(() => import('@/app/pages/Index'))

const AppRouter: FC = () => {
  return <Suspense fallback={<FullscreenLoader loading={true} />}>
    <Routes>
      <Route path='/' element={<LzyIndex />}/>
    </Routes>
  </Suspense>
}

export default memo(AppRouter)
