import axios from 'axios'

export const register = newUser => {
  return axios
    .post('http://localhost:3333/users/register', {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = user => {
  return axios
    .post('http://localhost:3333/users/login', {
      email: user.email,
      password: user.password
    })
    .then(res => {
      localStorage.setItem('usertoken', res.data.token)
      //console.log(res)
      return res.data
    })
    .catch(err => {
      console.log('Invalid username and password, ' + err)
    })
}

export const getUser = id => {
  return axios
    .get(`http://localhost:3333/users/getuser/${id}`)
    .then(response => {
      return response
    })
    .catch(err => {
      return err
    })
}