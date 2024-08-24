import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchGitHubPages } from 'api/gitHubApi/gitHubApi'
import { Project } from 'types/Project'

interface ProjectState {
  projects: Project[]
  loading: boolean
  error: string | null
  currentPage: number
  totalPages: number
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
}

export const loadProjects = createAsyncThunk(
  'projects/loadProjects',
  async ({ page, searchTerm }: { page: number; searchTerm?: string }) => {
    return await fetchGitHubPages(page, searchTerm)
  }
)

const projectSlice = createSlice({
  name: 'projectSlice',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProjects.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        loadProjects.fulfilled,
        (
          state,
          action: PayloadAction<{ items: Project[]; total_count: number }>
        ) => {
          state.loading = false
          state.projects = action.payload.items
          state.totalPages = Math.ceil(action.payload.total_count / 20)
        }
      )
      .addCase(loadProjects.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch projects'
      })
  },
})
export const { setCurrentPage } = projectSlice.actions

export default projectSlice.reducer
