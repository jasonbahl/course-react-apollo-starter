// import { PubSub } from "graphql-subscriptions"
// import { CategoryModel, TasksModel } from "./models"

// const pubsub = new PubSub()
// const TASK_CREATED = "taskCreated"
// const TASK_DELETED = "taskDeleted"
// const TASK_UPDATED = "taskUpdated"

import { TasksModel, CategoryModel } from './models'

export const resolvers = {
    Query:  {
        tasks: async () => {
            const filters = {};
            const res = await TasksModel.getTasks(filters);
            return res.tasks;
        },
        taskCategories: async () => {
            return await CategoryModel.getCategories();
        }
    },
    Mutation: {
       toggleTaskStatus: async ( _, { id, currentStatus } ) => {
            const status = currentStatus === 'INCOMPLETE' ? 'COMPLETE' : 'INCOMPLETE';
            const task = await TasksModel.updateTask( id, { status });
            return {task}
       }
    },
    Task: {
        taskStatus: (task, args, context, info) => {
            return task.status;
        },
        category: async (task, args, context, info) => {
            return await CategoryModel.getCategoryById(task.category)
        }
    }
};
