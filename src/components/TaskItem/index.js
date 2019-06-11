import React, { Fragment } from 'react'
import { Row, Col, Button, Icon, Tag } from 'antd';
import gql from 'graphql-tag'

export const TaskItemFragment = gql`
fragment TaskItem on Task {
  id
  title
  taskStatus
  category {
    id
    name
    color
  }
}
`;


class TaskItem extends React.Component {
    render() {

        const { title, category } = this.props;
        return(
            <Fragment>
                <Col xs={12} md={12}>
                    <h3>{title}</h3>
                    <Tag color={category.color}>{category.name}</Tag>
                </Col>
                <Col xs={12} md={12}>
                    <Row type="flex" justify="end">
                        <Button
                            type="primary"
                            style={{marginRight: '5px'}}
                        >Mark Complete</Button>
                        <Button
                            type="danger"
                        >
                            <Icon type="delete" /> Delete
                        </Button>
                    </Row>
                </Col>
            </Fragment>
        );
    }
}

export default TaskItem
