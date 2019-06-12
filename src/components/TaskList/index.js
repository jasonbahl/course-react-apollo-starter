import React from "react"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import { List } from "antd"
import TaskItem, { TaskItemFragment } from "../TaskItem"

export const TASKS_QUERY = gql`
  query TASKS_QUERY($filters: TaskFilters) {
    tasks(filters: $filters) {
      id
      ...TaskItem
    }
  }
  ${TaskItemFragment}
`

const TaskList = ({ filters }) => (
  <Query
    query={TASKS_QUERY}
    variables={{ filters: filters }}
    fetchPolicy="network-only"
  >
    {({ loading, error, data }) => {
      if (error) {
      }

      return (
        <List
          loading={loading}
          style={{ background: `white` }}
          bordered
          dataSource={data && data.tasks ? data.tasks : []}
          renderItem={task => (
            <List.Item key={task.id}>
              <TaskItem filters={filters} task={task} />
            </List.Item>
          )}
        />
      )
    }}
  </Query>
)

export default TaskList
