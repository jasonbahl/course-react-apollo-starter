import React, { Component } from "react"
import NewTaskForm from "../NewTaskForm"
import TaskFilters from "../TaskFilters"
import TaskList from "../TaskList"
import { Divider } from "antd"

class TaskManager extends Component {
  state = {
    filters: {
      category: undefined,
      status: "ALL",
    },
  }

  render() {
    const { filters } = this.state
    return (
      <div>
        <NewTaskForm filters={filters} />
        <Divider />
        <TaskFilters
          handleCategoryChange={value => {
            const filters = this.state.filters
            const newFilters = { ...filters, ...{ category: value } }
            this.setState({ filters: newFilters })
            console.log(newFilters)
          }}
          handleStatusChange={value => {
            const filters = this.state.filters
            const newFilters = { ...filters, ...{ status: value } }
            this.setState({ filters: newFilters })
            console.log(newFilters)
          }}
          filters={filters}
        />
        <Divider />
        <TaskList filters={filters} />
      </div>
    )
  }
}

export default TaskManager
