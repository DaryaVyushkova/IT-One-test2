import axios from "axios";
import { Project } from "types/Project";

const PER_PAGE = 10;
const GITHUB_API_URL = "https://api.github.com/search/repositories";
const MAX_RESULTS = 1000;

const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
});

export const fetchGitHubPages = async (
  page: number = 1,
  searchTerm: string = ""
) => {
  const query = `language:typescript ${searchTerm}`;
  try {
    const response = await githubApi.get<{
      items: Project[];
      total_count: number;
    }>("", {
      params: {
        q: query,
        sort: "stars",
        order: "desc",
        per_page: PER_PAGE,
        page,
      },
    });

    const totalCount = Math.min(response.data.total_count, MAX_RESULTS);
    return { ...response.data, total_count: totalCount };
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    throw error;
  }
};
