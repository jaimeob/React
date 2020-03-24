const initialData = {
  tasks: {
    'task-1' : {id: 'task-1', content: 'hola mundo 1'},
    'task-2' : {id: 'task-2', content: 'hola mundo 2'},
    'task-3' : {id: 'task-3', content: 'hola mundo 3'},
    'task-4' : {id: 'task-4', content: 'hola mundo 4'},
    'task-5' : {id: 'task-5', content: 'hola mundo 5'},
    'task-6' : {id: 'task-6', content: 'hola mundo 6'},
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: '',
      taskIds: ['task-1','task-2','task-3','task-4','task-5','task-6'],
    },
    'column-2': {
      id: 'column-2',
      title: '',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2'],
}

export default initialData;