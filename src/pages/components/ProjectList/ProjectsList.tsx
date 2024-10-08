import React from 'react'
import { List } from 'antd'

import { Project } from 'types/Project'

import PageNavigator from 'components/PageNavigator'
import ProjectItem from './components/ProjectItem'

import './styles.css'

interface ProjectListProps {
  projects: Project[]
  currentPage: number
  totalPages: number
  loading: boolean
  onPageChange: (page: number) => void
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  currentPage,
  totalPages,
  onPageChange,
  loading,
}) => {
  return (
    <div>
      <List
        dataSource={projects}
        renderItem={(project) => <ProjectItem project={project} />}
        loading={loading}
      />
      {projects.length > 0 && (
        <PageNavigator
          className={'pagination'}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  )
}

export default React.memo(ProjectList)
