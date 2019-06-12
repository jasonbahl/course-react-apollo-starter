import React, { Component } from "react"
import NewTaskForm from "../NewTaskForm"
import TaskFilters from "../TaskFilters"
import TaskList from "../TaskList"

class TaskManager extends Component {
  state = {
    filters: {
        status: 'ALL',
        category: null,
    },
  };

  render() {
    const { filters } = this.state;
    return (
      <div>
        <NewTaskForm />
        <TaskFilters
            handleCategoryChange={ value => {
                const filters = this.state.filters;
                const newFilters = {...filters, ...{ category: value }};
                this.setState({ filters: newFilters });
                console.log( newFilters );
            } }
            handleStatusChange={ value => {
                const filters = this.state.filters;
                const newFilters = {...filters, ...{ status: value }};
                this.setState({ filters: newFilters });
                console.log( newFilters );
            }}
            filters={filters}
        />
        <TaskList
            filters={filters}
        />
      </div>
    )
  }
}

export default TaskManager
