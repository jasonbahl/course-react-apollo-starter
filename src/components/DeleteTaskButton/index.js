import React from "react"
import { Button } from "antd"


const DeleteTaskButton = ({ filters, id }) => (
    <Button
        style={{ marginLeft: `15px` }}
        icon="delete"
        type="danger"
        onClick={() => {
            alert( 'Delete Task...' );
        }}
    >
        Delete
    </Button>
)

export default DeleteTaskButton
