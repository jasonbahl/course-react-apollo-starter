import React, { Component } from "react"
import NewTaskForm from '../NewTaskForm'
import TaskFilters from '../TaskFilters'
import TaskList from '../TaskList'

const TaskManager = () => {
    return(
        <div>
            <NewTaskForm/>
            <TaskFilters/>
            <TaskList/>
        </div>
    );
};

export default TaskManager;
