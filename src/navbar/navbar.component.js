import React from 'react';
import FrameworkInspector from './framework-inspector.component.js';
import { showFrameworkObservable } from '../shared/show-framework';
import { currentAsset } from '../shared/asset';

export default class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      frameworkInspector: false,
    };
  }

  componentDidMount() {
    this.subscription = showFrameworkObservable.subscribe(newValue => this.setState({frameworkInspector: newValue}));
    currentAsset.subscribe((changeAsset) => {
      if(changeAsset) {
        this.navigateTo("/boleta");
      }
    })
  }

  render() {
    return (
      <div>
        {this.state.frameworkInspector &&
          <div style={{position: 'fixed', top: 0, left: 0, zIndex: 10000}}>
            (built with React)
          </div>
        }
        <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper orange">
            <a className="brand-logo activator" href="#">
              <i />
              Micro Front End
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {menuItems.call(this)}
            </ul>
          </div>
        </nav>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    this.subscription.dispose();
  }

  navigateTo = url => window.history.pushState(null, null, url)
}

function menuItems() {
  return (
    <div>
      <FrameworkInspector />
      <li>
        <a onClick={() => this.navigateTo("/")}>
          Minha Conta
        </a>
      </li>
      <li>
        <a onClick={() => this.navigateTo("/cotacao")}>
          Cotações
        </a>
      </li>
      <li>
        <a onClick={() => this.navigateTo("/boleta")}>
          Boleta
        </a>
      </li>
      {/* <li>
        <a onClick={() => this.navigateTo("/posicao")}>
          Posição
        </a>
      </li> */}
    </div>
  )
}
