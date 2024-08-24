import React, { lazy, Suspense } from 'react'
import { Spin } from 'antd'
import { Provider } from 'react-redux'

import './styles.css'
import { store } from './app/store'

const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Suspense fallback={<Spin size="large" className="global-spinner" />}>
        <ProjectsPage />
      </Suspense>
    </Provider>
  )
}

export default App
