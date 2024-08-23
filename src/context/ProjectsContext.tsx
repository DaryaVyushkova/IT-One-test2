import React, { createContext, useState, useContext, ReactNode } from "react";
import { message } from "antd";
import { fetchGitHubPages } from "api/gitHubApi/gitHubApi";
import { Project } from "types/Project";

interface ProjectsContextType {
  projects: Project[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  loadProjects: (page: number, searchTerm?: string) => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);

export const ProjectsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const loadProjects = async (page: number, searchTerm: string = "") => {
    setLoading(true);
    setError(null);
    try {
      const { items, total_count } = await fetchGitHubPages(page, searchTerm);
      setProjects(items);
      setTotalPages(Math.ceil(total_count / 20));
      setCurrentPage(page);
    } catch (err) {
      setError("Failed to fetch projects");
      message.error(`Failed to fetch projects ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        loading,
        error,
        currentPage,
        totalPages,
        loadProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};
