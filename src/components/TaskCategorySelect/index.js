import React from "react"
import { Select, Tag } from "antd"
import { Query } from "react-apollo"
import gql from "graphql-tag"

const Option = Select.Option

const ALL_CATEGORIES_QUERY = gql`
  query ALL_CATEGORIES {
    taskCategories {
      name
      id
      color
    }
  }
`

const TaskCategorySelect = props => {
  const { handleChange, value } = props

  return (
    <Query query={ALL_CATEGORIES_QUERY}>
      {({ loading, error, data }) => {
        if (error) {
          console.log(`Error ${error.message}`)
        }

        return (
          <Select
            allowClear
            disabled={loading}
            showSearch
            style={{ width: 200 }}
            placeholder="Select Category"
            value={value}
            onChange={value => {
              handleChange(value)
            }}
          >
            {data.taskCategories &&
              data.taskCategories.map(({ id, name, color }) => (
                <Option key={id} value={id}>
                  <Tag color={color}>{name}</Tag>
                </Option>
              ))}
          </Select>
        )
      }}
    </Query>
  )
}

export default TaskCategorySelect
