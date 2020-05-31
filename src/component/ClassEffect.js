import React, { Component } from 'react'

export class ClassEffect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      count: 0
    }
  }

  componentDidMount() {
    document.title = `クリック数: ${this.state.count} 回`
  }

  componentDidUpdate() {
    document.title = `クリック数: ${this.state.count} 回`
  }

  render() {

    return (
      <div>
        <p>クリック数：</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>カウント +1</button>
      </div>
    )
  }
}

export default ClassEffect
