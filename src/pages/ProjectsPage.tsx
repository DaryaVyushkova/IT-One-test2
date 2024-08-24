import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Layout } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

const { Header, Content } = Layout

import { useDebounce } from 'use-debounce'

import FilterInput from 'components/FilterInput'

import ProjectList from './components/ProjectList'

import './styles.css'
import { AppDispatch, RootState } from 'app/store'
import { loadProjects, setCurrentPage } from 'features/projects/projectsSlice'

const ProjectsPageContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()

  const { projects, loading, error, currentPage, totalPages } = useSelector(
    (state: RootState) => state.projects
  )

  const [search, setSearch] = useState('')
  const [debouncedSearch] = useDebounce(search, 500)
  const prevSearchRef = useRef('')
  const isInitialMount = useRef(true)
  const listRef = useRef<HTMLDivElement>(null)

  const handleSearch = useCallback((value: string) => {
    setSearch(value)
  }, [])

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(loadProjects({ page, searchTerm: debouncedSearch }))
      dispatch(setCurrentPage(page))
      if (listRef.current) {
        listRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    },
    [dispatch, debouncedSearch]
  )

  useEffect(() => {
    if (isInitialMount.current) {
      dispatch(loadProjects({ page: 1 }))
      isInitialMount.current = false
    } else if (debouncedSearch !== prevSearchRef.current) {
      dispatch(loadProjects({ page: 1, searchTerm: debouncedSearch }))
      prevSearchRef.current = debouncedSearch
    }
  }, [debouncedSearch, loadProjects])

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  return (
    <Layout className="layout">
      <Header className="header">
        <h1 className="headerTitle">Popular TypeScript Projects on GitHub</h1>
      </Header>
      <Content className={'projectListContainer'} ref={listRef}>
        <FilterInput
          className={'filterInput'}
          value={search}
          onChange={handleSearch}
          placeholder="Search projects by name"
        />
        <ProjectList
          loading={loading}
          projects={projects}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Content>
    </Layout>
  )
}

const ProjectsPage: React.FC = () => <ProjectsPageContent />

export default ProjectsPage
