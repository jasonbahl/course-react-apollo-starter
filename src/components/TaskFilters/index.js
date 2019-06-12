import React, { Fragment } from "react"
import TaskCategorySelect from "../TaskCategorySelect"
import { Col, Row, Radio } from "antd"

const TaskFilters = props => (
  <Fragment>
    <Row type="flex" justify="start">
      <h3>Filters:</h3>
    </Row>
    <Row type="flex" justify="end">
      <Col xs={24} md={12}>
        <TaskCategorySelect
          value={props.filters.category}
          handleChange={value => props.handleCategoryChange(value)}
        />
      </Col>
      <Col xs={24} md={12}>
        <Row type="flex" justify="end">
          <Radio.Group
            onChange={e => props.handleStatusChange(e.target.value)}
            defaultValue=""
            value={props.filters.status}
          >
            <Radio.Button value={"ALL"}>ALL</Radio.Button>
            <Radio.Button value={"INCOMPLETE"}>Incomplete</Radio.Button>
            <Radio.Button value={"COMPLETE"}>Complete</Radio.Button>
          </Radio.Group>
        </Row>
      </Col>
    </Row>
  </Fragment>
)

export default TaskFilters
