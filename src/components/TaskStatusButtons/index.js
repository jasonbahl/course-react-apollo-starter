import React from "react"
import { Button } from "antd"

const TaskStatusButtons = ({ id, status }) => (
    <Button
        style={{ marginLeft: `15px` }}
        icon="save"
        type={status === `INCOMPLETE` ? `danger` : `primary`}
        onClick={() => {
            alert( 'update task status' )
        }}
    >
        {status === `INCOMPLETE` ? `Mark Completed` : `Mark Incomplete`}
    </Button>
)

export default TaskStatusButtons
