import React from "react"
import { MockedProvider } from "react-apollo/test-utils"
import TaskList from "./index.js"
import { TASKS_QUERY } from "./index"
import TestRenderer from "react-test-renderer"
import wait from "waait"

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

it("renders without crashing", () => {
  TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={true}>
      <TaskList />
    </MockedProvider>
  )
})

it("has the loading class when the data has not been returned", () => {
  const testRenderer = TestRenderer.create(
    <MockedProvider mocks={[]} addTypename={true}>
      <TaskList />
    </MockedProvider>
  )
  const tree = testRenderer.toJSON()
  expect(tree.props.className.includes("ant-list-loading")).toBe(true)
})

it("does not have a loading class when data has been returned", async () => {
  const testRenderer = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={true}>
      <TaskList />
    </MockedProvider>
  )
  await wait(1)
  const tree = testRenderer.toJSON()
  expect(tree.props.className.includes("ant-list-loading")).toBe(false)
})
