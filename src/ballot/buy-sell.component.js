import Vue from 'vue';
import { myAccount } from '../shared/account';
import { Asset } from '../shared/asset';

export default {
  template: `
    <div class="buy-sell container">
      <div class="text-alignment">
        <p>Poder de {{currentTransaction == 'Comprar' ? 'Compra' : 'Venda' }}: <span>{{currentTransaction == 'Comprar' ? ("R$" + poderTransacao.toLocaleString('pt-BR')) : poderTransacao | brazilian-real}}</span></p>
      </div>
      <div class="text-alignment">
        <button @click="changeTransaction('Comprar')" class="btn white btn-transaction" :class="{ 'active-buy': currentTransaction == 'Comprar'}">Compra</button>
        <button @click="changeTransaction('Vender')" class="btn white btn-transaction" :class="{ 'active-sell': currentTransaction == 'Vender'}">Venda</button>
      </div>
      <form id="buy-sell" v-on:submit.prevent="executeTransaction">
        <div class="input-field row">
          <div>
            <label class="active" for="valor">Valor</label>
            <input name="valor" v-model="transactionValue">
          </div>
          <div>
            <label for="quantidade">Quantidade</label>
            <input name="quantidade" v-model="transactionQtd">
          </div>
        </div>
        <div class="row">
          <button class="btn execute-transaction" :class="{ 'buy': currentTransaction == 'Comprar', 'sell': currentTransaction == 'Vender'}">{{ currentTransaction }}</button>
        </div>
      </form>
    </div>
  `,
  replace: true,
  props: {
    assetValue: Number,
    assetCode: String,
  },
  data: function () {
    return {
      transactionValue: this.assetValue,
      transactionQtd: 100,
      currentTransaction: 'Comprar'
    }
  },
  computed: {
    poderTransacao: function () {
      return this.currentTransaction == 'Comprar' ? myAccount.getSaldo() :
        new Asset().getPoderVenda(this.assetCode  )
    }
  },
  filters: {
    brazilianReal: function (str) {
      return str && this && this.currentTransaction == 'Comprar' ? ("R$" + str.toLocaleString('pt-BR')) : str;
    }
  },
  methods: {
    changeTransaction: function (transaction) {
      this.currentTransaction = transaction;
    },
    executeTransaction: function () {
      if (this.transactionQtd !== 0 && this.transactionValue !== 0) {
        if(this.currentTransaction == 'Comprar') {
          if(this.poderTransacao < (this.transactionQtd * this.transactionValue)) {
            alert("Saldo Insuficiente");
            return;
          }
        } else {
          if(this.poderTransacao < this.transactionQtd){
            alert("Você não possui ações suficiente de " + this.assetCode);
            return;
          }
        }
    
        if (confirm(`Tem certeza que deseja ${this.currentTransaction} ${this.transactionQtd} ações de ${this.assetCode} a ${this.transactionValue} cada?`)) {
          alert("Transação executada com sucesso");

          if(this.currentTransaction == 'Comprar') {
            new Asset().addAssetToWallet(this.assetCode, this.transactionQtd, this.transactionValue);
          } else {
            new Asset().removeAssetToWallet(this.assetCode, this.transactionQtd, this.transactionValue);
          }
        }
      }
    }
  }
};