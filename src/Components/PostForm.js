import React from 'react';
import {connect} from "react-redux";
import {createPost, showAlert} from "../redux/action";
import {Alert} from "./Alert";

class PostForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: ''
    }
  }

  submitHandler = event => {
    event.preventDefault()
    const {title} = this.state;

    if (!title.trim()) {
      return this.props.showAlert(`Post's name cannot be empty`)
    }

    const newPost = {
      title, id: Date.now().toString()
    }

    this.props.createPost(newPost)
    this.setState({title: ''})
  }

  changeInputHandler = event => {
    this.setState(prev => ({...prev, ...{[event.target.name]: event.target.value
      }}))
  }

  render() {
    return (
      <form onSubmit={this.submitHandler}>

        {this.props.alert && <Alert text={this.props.alert}/>}

        <div className="mb-3">
          <label
            htmlFor="title"
            className="form-label">
            Post title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={this.state.title}
            name='title'
            onChange={this.changeInputHandler}
          />
        </div>
        <button className='btn btn-success' type='submit'>Create</button>
      </form>
    )
  }
}
const stateToProps = state => ({
  alert: state.app.alert
})

const mapDispatchToProps = {
  createPost, showAlert
}

export default connect(stateToProps, mapDispatchToProps)(PostForm);