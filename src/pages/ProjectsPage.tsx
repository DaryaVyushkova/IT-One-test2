import React, { useState, useEffect, useCallback, useRef } from "react";
import { Layout, Spin } from "antd";
const { Header, Content } = Layout;

import { useDebounce } from "use-debounce";

import { ProjectsProvider, useProjects } from "context/ProjectsContext";
import FilterInput from "components/FilterInput";

import ProjectList from "./components/ProjectList";

import "./styles.css";

const ProjectsPageContent: React.FC = () => {
  const { projects, loading, error, currentPage, totalPages, loadProjects } =
    useProjects();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const prevSearchRef = useRef("");
  const isInitialMount = useRef(true);
  const listRef = useRef<HTMLDivElement>(null);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      loadProjects(page, debouncedSearch);
    },
    [loadProjects, debouncedSearch]
  );

  useEffect(() => {
    if (listRef.current && !isInitialMount.current) {
      listRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [projects]);

  useEffect(() => {
    if (isInitialMount.current) {
      loadProjects(1);
      isInitialMount.current = false;
    } else if (debouncedSearch !== prevSearchRef.current) {
      loadProjects(1, debouncedSearch);
      prevSearchRef.current = debouncedSearch;
    }
  }, [debouncedSearch, loadProjects]);

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <Layout className="layout">
      <Header className="header">
        <h1 className="headerTitle">Popular TypeScript Projects on GitHub</h1>
      </Header>
      <Content className={"projectListContainer"} ref={listRef}>
        <FilterInput
          className={"filterInput"}
          value={search}
          onChange={handleSearch}
          placeholder="Search projects by name"
        />
        <Spin spinning={loading} tip="Loading projects...">
          <ProjectList
            projects={projects}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Spin>
      </Content>
    </Layout>
  );
};

const ProjectsPage: React.FC = () => (
  <ProjectsProvider>
    <ProjectsPageContent />
  </ProjectsProvider>
);

export default ProjectsPage;
