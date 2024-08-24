import React from 'react'
import { List, Card, Typography } from 'antd'
import { GithubOutlined, StarOutlined } from '@ant-design/icons'

import './styles.css'
import { Project } from 'types/Project'

const { Paragraph } = Typography

interface ProjectItemProps {
  project: Project
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => (
  <List.Item className="listItem">
    <Card
      title={
        <Paragraph
          ellipsis={{ rows: 1, expandable: false }}
          className="projectTitle"
        >
          {project.name}
        </Paragraph>
      }
      className="projectCard"
      actions={[
        <span key="stars">
          <StarOutlined /> {project.stargazers_count}
        </span>,
        <a
          key="github"
          href={project.html_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubOutlined /> View on GitHub
        </a>,
      ]}
    >
      <Paragraph
        ellipsis={{ rows: 3, expandable: false }}
        className="projectDescription"
      >
        {project.description}
      </Paragraph>
    </Card>
  </List.Item>
)

export default ProjectItem
