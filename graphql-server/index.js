import { ApolloServer } from 'apollo-server';
import { CategoryModel, TasksModel } from "./models"

const typeDefs = `
  type Query {
    tasks: [Task]
    task(id: ID!): Task
  }
    
  type Task {
    name: String
    category: TaskCategory
    status: TaskStatus
    taskId: ID
  }

  type TaskCategory {
    name: String
    id: ID
    color: String
    priority: Int
  }

  enum TaskStatus {
    COMPLETE
    INCOMPLETE
  }

  type Mutation {
    createTask(input: CreateTaskInput!): CreateTaskPayLoad
  }
  type CreateTaskPayLoad {
    task: Task
  }
  input CreateTaskInput {
    name: String!
    categoryId: ID
  }
`;

const resolvers = {
    Query: {
        task: async (root, { id }) => {
            return await TasksModel.getTaskById(id);
        },
        tasks: async (root, filters = {}) => {
            const res = await TasksModel.getTasks(filters);
            return res.tasks;
        }
    }
};

const GRAPHQL_PORT = process.env.PORT || 3010;
const REST_PORT = process.env.REST_PORT || 3020;
export const REST_SERVER_URL = `http://localhost:${REST_PORT}`;

const context = {
    restUrl: REST_SERVER_URL,
    isLoggedIn: false,
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
});

server.listen({
    port: GRAPHQL_PORT,
}).then( ({ url }) => {
    console.log(`graphql server url: ${url}`);
} );
