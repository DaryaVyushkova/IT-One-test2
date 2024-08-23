import { Project } from "./Project";
export interface ProjectsContextType {
  projects: Project[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  loadProjects: (page: number, search?: string) => Promise<void>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
