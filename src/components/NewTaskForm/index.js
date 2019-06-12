import React, { Component } from "react"
import { Input, Button } from "antd"
import TaskCategorySelect from "../TaskCategorySelect"
import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import { TASKS_QUERY } from "../TaskList"
import { TaskItemFragment } from "../TaskItem"

const CREATE_TASK_MUTATION = gql`
  mutation CREATE_TASK($title: String!, $categoryId: ID!) {
    createTask(title: $title, categoryId: $categoryId) {
      task {
        ...TaskItem
      }
    }
  }
  ${TaskItemFragment}
`

class NewTaskForm extends Component {
  state = {
    title: "",
    category: undefined,
  }

  render() {
    const { title, category } = this.state
    const { filters } = this.props

    return (
      <Mutation
        mutation={CREATE_TASK_MUTATION}
        onCompleted={() => {
          this.setState({
            title: "",
            category: undefined,
          })
        }}
        update={(
          cache,
          {
            data: {
              createTask: { task },
            },
          }
        ) => {
          const query = {
            query: TASKS_QUERY,
            variables: { filters },
          }

          const { tasks } = cache.readQuery(query);

          const newTasks = [...[task], ...tasks];

          cache.writeQuery({
            query: TASKS_QUERY,
            variables: { filters },
            data: {
              tasks: newTasks,
            },
          })
        }}
      >
        {createTask => (
          <form
            onSubmit={e => {
              e.preventDefault()
              createTask({
                variables: {
                  title,
                  categoryId: category,
                },
              })
            }}
          >
            <h3>Create Task:</h3>
            <Input
              style={{ width: "70%" }}
              onChange={e => {
                this.setState({
                  title: e.target.value,
                })
              }}
              value={this.state.title}
              placeholder="Something"
            />
            <TaskCategorySelect
              value={this.state.category}
              handleChange={value => {
                this.setState({
                  category: value,
                })
              }}
            />
            <Button htmlType="submit" type="primary">
              Create Task
            </Button>
          </form>
        )}
      </Mutation>
    )
  }
}

export default NewTaskForm
