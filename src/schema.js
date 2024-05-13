export const ALL_REGISTERED_SHORT_TASKS = gql`
query AllTasks {
  allRegisteredShortTasks {
    id
    expirationDate
    name
    isCompleted
    isPomodoro
    priority
    category
  }
}
`;

export const ALL_TASKS = gql`
query AllTasks {
  allRegisteredTasks {
    id
    limitDate
    name
    isCompleted
    priority
    category
  }
}
`;

export const ALL_CATEGORIES = gql`
query AllCategories {
  allCategories {
    label
  }
}
`;

export const ADD_TASK_MUTATION = gql`
mutation RegisterTask($input: AddTaskInput!) {
  registerTask(input: $input) {
    id
    limitDate
    name
    postedBy
  }
}
`;

export const ADD_SHORT_TASK_MUTATION = gql`
mutation RegisterTask($input: AddShortTaskInput!) {
  registerShortTask(input: $input) {
    id
    expirationDate
    name
    postedBy
  }
}
`;

export const REMOVE_EACH_TASK_MUTATION = gql`
mutation RemoveEachTask($input: RemoveEachTaskInput!) {
  removeEachTask(input: $input)
}
`;

export const CHANGE_IS_COMPLETED = gql`
mutation ChangeCompleted($input: ChangeCompletedInput!) {
  changeCompleted(input: $input)
}
`;




