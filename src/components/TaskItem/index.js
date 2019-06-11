import React, { Fragment } from "react"
import { Row, Col, Button, Icon, Tag } from "antd"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"

export const TaskItemFragment = gql`
  fragment TaskItem on Task {
    id
    title
    taskStatus
    category {
      id
      name
      color
    }
  }
`

const TOGGLE_TASK_STATUS_MUTATION = gql`
  mutation ToggleTaskStatus($id: ID!, $taskStatus: TaskStatusEnum!) {
    toggleTaskStatus(id: $id, currentStatus: $taskStatus) {
      task {
        id
        taskStatus
      }
    }
  }
`

class TaskItem extends React.Component {
  render() {
    const {
      task: { id, title, category, taskStatus },
    } = this.props
    const titleStyle = "COMPLETE" === taskStatus ? "line-through" : "none"
    const toggleButtonText =
      "COMPLETE" === taskStatus ? "Mark Incomplete" : "Mark Complete"
    const toggleButtonType = "COMPLETE" === taskStatus ? "danger" : "primary"

    return (
      <Fragment>
        <Col xs={12} md={12}>
          <h3 style={{ textDecoration: titleStyle }}>{title}</h3>
          <Tag color={category.color}>{category.name}</Tag>
        </Col>
        <Col xs={12} md={12}>
          <Row type="flex" justify="end">
            <Mutation mutation={TOGGLE_TASK_STATUS_MUTATION}>
              {toggleTaskStatus => (
                <Button
                  onClick={() =>
                    toggleTaskStatus({
                      variables: {
                        id,
                        taskStatus,
                      },
                    })
                  }
                  type={toggleButtonType}
                  style={{ marginRight: "5px" }}
                >
                  {toggleButtonText}
                </Button>
              )}
            </Mutation>
            <Button onClick={() => alert(`Delete Task ${id}`)} type="danger">
              <Icon type="delete" /> Delete
            </Button>
          </Row>
        </Col>
      </Fragment>
    )
  }
}

export default TaskItem
