import React from "react"
import { MockedProvider } from "react-apollo/test-utils"
import TaskItem from "./index.js"
import TestRenderer from "react-test-renderer"
import wait from "waait"
import {TASKS_QUERY} from "../TaskList";

const mocks = [
    {
        request: {
            query: TASKS_QUERY,
            variables: {
                filters: null,
            },
        },
        result: {
            data: {
                tasks: [
                    {
                        id: 1,
                        title: "New Task",
                        taskStatus: "COMPLETE",
                        category: {
                            id: 1,
                            name: "Home",
                            color: "red",
                        },
                    },
                    {
                        id: 2,
                        title: "Another New Task",
                        taskStatus: "COMPLETE",
                        category: {
                            id: 1,
                            name: "Home",
                            color: "red",
                        },
                    },
                ],
            },
        },
    },
]

it('renders without crashing', () => {
    TestRenderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
            <TaskItem/>
        </MockedProvider>
    );
});
