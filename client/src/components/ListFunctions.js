import axios from 'axios'

export const getList = () => {
  return axios
    .get('http://localhost:3333/api/tasks', {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      var data = []
      Object.keys(res.data).forEach(function(key) {
        var val = res.data[key]
        data.push([ val.id, val.task_name, val.phone_no ])
      })

      return data
    })
}

export const addToList = (task,phone) => {
  return axios
    .post(
      'http://localhost:3333/api/task',
      {
        task: task,
        phone: phone
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
    .then(function(response) {
      console.log(response)
    })
}

export const deleteItem = term => {
  axios
    .delete(`http://localhost:3333/api/task/${term}`, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(function(response) {
      console.log(response)
    })
    .catch(function(error) {
      console.log(error)
    })
}

export const updateItem = (id, task, phone) => {
  return axios
    .put(
      `http://localhost:3333/api/task/${id}`,
      {
        task: task,
        phone: phone
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
    .then(function(response) {
      console.log(response)
    })
}