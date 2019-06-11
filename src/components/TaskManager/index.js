import React, { Component } from "react"
import NewTaskForm from "../NewTaskForm"
import TaskFilters from "../TaskFilters"
import TaskList from "../TaskList"

class TaskManager extends Component {
  state = {
    filters: {},
  }

  render() {
    return (
      <div>
        <NewTaskForm />
        <TaskFilters />
        <TaskList />
      </div>
    )
  }
}

export default TaskManager
