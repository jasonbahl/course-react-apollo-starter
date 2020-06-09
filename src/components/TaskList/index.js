import React, {Fragment} from "react"
import {List} from "antd"
import TaskItem from '../TaskItem'

const tasks = [
    {
        "name": "Example Task",
        "category": "3",
        "id": "1qyo3hovkb733wxo",
        "status": "INCOMPLETE",
        "createdDate": "2020-06-08T22:46:12.348Z"
    },
    {
        "name": "GraphQL Rocks",
        "category": "3",
        "id": "asdfasdfa",
        "status": "INCOMPLETE",
        "createdDate": "2020-06-08T22:46:12.348Z"
    }
];

const TaskList = () => {
    return (
        <Fragment>
            <List
                style={{
                    background: `white`,
                }}
                loading={false}
                dataSource={tasks}
                renderItem={task => {
                    return (
                        <List.Item>
                            <TaskItem task={task}/>
                        </List.Item>
                    )
                }}
            />
        </Fragment>
    )
}

export default TaskList;
