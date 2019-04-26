import Vue from 'vue/dist/vue.min.js';
import singleSpaVue from 'single-spa-vue';
import BuySellComponent from './buy-sell.component.js';
import { showFrameworkObservable, getBorder } from '../shared/show-framework';
import { currentAsset, Asset } from '../shared/asset';
import './ballot.styles.css';

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: '#ballot',
    template: `
      <div id="ballot" class="container">
        <div v-bind:style="{border: border}" v-if="assetName && assetValue">
          <div v-if="showFramework">(built with Vue.js)</div>
          <div class="row text-alignment">
            <span class="asset-code">{{ assetName }}</span>
            <span class="asset-value">{{ assetValue | brazilian-real }}</span>
          </div>
          <hr></hr>
          <buy-sell :asset-value="assetValue" :asset-code="assetName">
          </buy-sell>
        </div>
        <div class="no-asset" v-else>Nenhum Ativo Selecionado</div>
      </div>
    `,
    components: {
      'buy-sell': BuySellComponent,
    },
    data: {
      showFramework: false,
      border: '',
      assetName: '',
      assetValue: 0
    },
    beforeMount: function () {
      let assetService = new Asset();

      this.subscription = showFrameworkObservable.subscribe(showFramework => {
        this.showFramework = showFramework;
        this.border = showFramework ? getBorder('vue') : ``;
      });
      this.assetsSubscription = currentAsset.subscribe((asset) => {
        this.assetName = asset;
        this.assetValue = assetService.getAssetValue(asset);
      });
    },
    beforeDestroy: function () {
      this.subscription.dispose();
    },
    filters: {
      brazilianReal: function (str) {
        return str ? ("R$" + str.toLocaleString('pt-BR')) : "";
      }
    },
  }
});

export const bootstrap = [
  vueLifecycles.bootstrap,
];

export const mount = [
  vueLifecycles.mount,
];

export const unmount = [
  vueLifecycles.unmount,
];