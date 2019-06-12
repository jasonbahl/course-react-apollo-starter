export const typeDefs = `
type Query {
  tasks( filters:TaskFilters ): [Task]
  taskCategories: [TaskCategory]
}

input TaskFilters { 
  category: ID
  status: TaskStatusEnum
}

type Mutation {
 toggleTaskStatus(id: ID! currentStatus: TaskStatusEnum!): ToggleTaskPayload
 createTask(title:String! categoryId:ID!): CreateTaskPayload 
 deleteTask(id:ID!): DeleteTaskPayload
}

type DeleteTaskPayload {
  deletedId: ID
}

type CreateTaskPayload {
  task: Task
}

type ToggleTaskPayload {
  task: Task
}

type Task {
 id: ID!
 title: String!
 category: TaskCategory
 taskStatus: TaskStatusEnum
}

enum TaskStatusEnum {
  INCOMPLETE
  COMPLETE
  ALL
}

type TaskCategory {
  id: ID!
  name: String!
  color: String
}
`;
