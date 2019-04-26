import React from 'react';
import { getBorder, showFrameworkObservable } from '../shared/show-framework';
import { myAccount } from '../shared/account';
import './my-account.css'

export default class MyAccount extends React.Component {
  constructor() {
    super();
    this.state = {
      frameworkInspector: false
    };
  }
  componentWillMount() {
    this.subscription = showFrameworkObservable.subscribe(newValue => this.setState({frameworkInspector: newValue}));
  }
  render() {
    return (
      <div style={this.state.frameworkInspector ? {border: getBorder('react')} : {}}>
        {this.state.frameworkInspector &&
          <div>(built with React)</div>
        }
        <div className="container">
         <div className="my-account-data">
           <span className="patrimonio">Patrimônio</span>
           <span className="patrimonio-value"><i>R$</i> {this.toBrazilianRealFormat(myAccount.getPatrimonio())}</span>
           <hr></hr>
           <span className="saldo">Saldo</span>
           <span className="saldo-value">R${this.toBrazilianRealFormat(myAccount.getSaldo())}</span>
         </div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    this.subscription.dispose();
  }

  toBrazilianRealFormat(usdFormat) {
    return usdFormat.toLocaleString('pt-BR')
  }
}


