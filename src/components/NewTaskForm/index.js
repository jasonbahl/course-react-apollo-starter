import React, { Component } from "react"
import { Input, Button } from 'antd'
import TaskCategorySelect from '../TaskCategorySelect'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { TASKS_QUERY } from '../TaskList'

const CREATE_TASK_MUTATION = gql`
mutation CREATE_TASK( $title:String! $categoryId:ID! ){
  createTask(title:$title, categoryId:$categoryId){
    task {
      id
      title
    }
  }
}
`;

class NewTaskForm extends Component {

    state = {
      title: '',
      category: ''
    };

    render() {

        const { title, category } = this.state;

        return (
            <Mutation
                mutation={CREATE_TASK_MUTATION}
                onCompleted={ () => {
                    this.setState({
                        title: '',
                        category: ''
                    })
                }}
            >
                {createTask => (
                    <form onSubmit={e => {
                        e.preventDefault();
                        createTask({
                            variables: {
                                title,
                                categoryId: category
                            },
                            refetchQueries:[ { query: TASKS_QUERY } ]
                        })
                    } }>
                        <h3>Create Task:</h3>
                        <Input
                            style={{ width: '70%' }}
                            onChange={ e => {
                                this.setState({
                                    title: e.target.value
                                })
                            } }
                            value={this.state.title}
                            placeholder="Something"
                        />
                        <TaskCategorySelect
                            value={
                                this.state.category
                            }
                            handleChange={ value => {
                                this.setState({
                                    category: value
                                })
                            } }
                        />
                        <Button htmlType="submit" type="primary">Create Task</Button>
                    </form>
                )}
            </Mutation>

        )
    }

}

export default NewTaskForm
