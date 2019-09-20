import React, { Component } from 'react'
import { getList, addToList, deleteItem, updateItem } from './ListFunctions'
import { breakStatement } from '@babel/types'

class List extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      task: '',
      phone: '',
      editDisabled: false,
      items: []
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.getAll()
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
    this.setState({ editDisabled: true })
  }

  getAll = () => {
    getList().then(data => {
      this.setState(
        {
            id: '',
            task: '',
            phone: '',
            items: [...data]
        },
        () => {
          console.log(this.state.items)
        }
      )
    })
  }

  onSubmit = e => {
    e.preventDefault()
    this.setState({ editDisabled: false })
    addToList(this.state.task,this.state.phone).then(() => {
      this.getAll()
    })
  }

  onUpdate = e => {
    e.preventDefault()
    this.setState({ editDisabled: false })
    updateItem(this.state.id, this.state.task, this.state.phone).then(() => {
      this.getAll()
    })
  }

  onEdit = (id, task, phone, e) => {
    e.preventDefault()
    this.setState({
      id: id,
      task: task,
      phone, phone
    })
  }

  onDelete = (val, e) => {
    e.preventDefault()
    deleteItem(val)

    var data = [...this.state.items]
    data.filter(function(item, index) {
      if (item[0] === val) {
        data.splice(index, 1)
      }
      return true
    })
    this.setState({ items: [...data] })
  }

  render() {
    return (
      <div className="col-md-12">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="exampleInputTask">Task Name</label>

                <input
                  type="text"
                  className="form-control"
                  name="task"
                  id="exampleInputTask"
                  value={this.state.task}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="exampleInputPhone">Phone no</label>

                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  id="exampleInputPhone"
                  value={this.state.phone}
                  onChange={this.onChange}
                />
              </div>
              <div className="col-md-2"><br></br>
                <button
                  className="btn btn-primary"
                  onClick={this.onUpdate.bind(this)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={this.onSubmit.bind(this)}
            className="btn btn-success btn-block"
          >
            Submit
          </button>
        </form>
        <table className="table">
          <tbody>
            {this.state.items.map((item, index) => (
              <tr key={index}>
                <td className="text-left">{item[1]}</td>
                <td className="text-center">{item[2]}</td>
                <td className="text-right">
                  <button
                    href=""
                    className="btn btn-info mr-1"
                    disabled={this.state.editDisabled}
                    onClick={this.onEdit.bind(this, item[0], item[1], item[2])}
                  >
                    Edit
                  </button>
                  <button
                    href=""
                    className="btn btn-danger"
                    onClick={this.onDelete.bind(this, item[0])}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default List