import React from 'react';
import { showFrameworkObservable } from '../shared/show-framework';

export default class FrameworkInspector extends React.Component {
  constructor() {
    super();
    this.state = {
      frameworkInspectorOn: false,
    };
  }
  render() {
    return (
      <li className={this.state.frameworkInspectorOn ? 'active' : ''}>
        <a onClick={() => {
          toggleFrameworkInspector.call(this);
        }}>
          Framework inspector
        </a>
      </li>
    )
  }
}

function toggleFrameworkInspector() {
  showFrameworkObservable.onNext(!this.state.frameworkInspectorOn);
  this.setState({frameworkInspectorOn: !this.state.frameworkInspectorOn});
}
