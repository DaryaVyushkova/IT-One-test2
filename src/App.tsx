import React, { lazy, Suspense } from "react";
import { Spin } from "antd";

import "./styles.css";

const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));

const App: React.FC = () => {
  return (
    <Suspense fallback={<Spin size="large" className="global-spinner" />}>
      <ProjectsPage />
    </Suspense>
  );
};

export default App;
