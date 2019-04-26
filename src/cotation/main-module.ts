import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';

import { Component, NgZone, Inject } from '@angular/core';
import { showFrameworkObservable, getBorder } from '../shared/show-framework';
import { Asset, currentAsset } from '../shared/asset';
import './cotation.css'
try {
  enableProdMode();
} catch (err) {
  console.info('EnableProdMode already set')
}


@Component({
  selector: 'mfe-cotation',
  template: `
        <div [style.border]="border">
            <div *ngIf="showFramework">
                (built with Angular)
            </div>
            <div class="container cotation">    
                <div class="add-cotation row">
                    <input #ativo placeholder="Insira o código do ativo" (keyup.enter)="pushAsset(ativo.value) && ativo.value = ''"/> 
                    <button class="btn" (click)="pushAsset(ativo.value) && ativo.value = ''">+</button>
                </div>
                <div class="asset" *ngFor="let cotation of cotations" (click)="buyOrSell(cotation)">
                    <span class="close" (click)="removeAsset(cotation)">x</span>
                    <span class="cotation-code">{{cotation}}</span>
                    <div></div>
                    <span class="cotation-value">{{getCotationValue(cotation)}}</span>
                </div>
            </div>
        </div>
  `
})
export class MfeCotationComponent {
  public border: String;
  public showFramework: Boolean;
  subscription: any;
  ngZone: any;

  private assetService = new Asset();

  public cotations = this.assetService.getMyFavAssets();

  constructor(@Inject(NgZone) ngZone: NgZone) {
    this.showFramework = false;
    this.ngZone = ngZone;
  }

  ngOnInit() {
    this.subscription = showFrameworkObservable.subscribe(showFramework => {
      this.ngZone.run(() => {
        this.border = showFramework ? getBorder('angular') : ``;
        this.showFramework = showFramework;
      });
    });
  }

  pushAsset(assetCode) {
    if (!this.assetService.existAsset(assetCode)) {
      alert("Ativo Inexistente")
      return false;
    } else if(this.cotations.some((asset) => asset == assetCode)) {
      alert("Ativo Já Cadastrado")
      return false;
    }

    this.cotations.push(assetCode);
    return true;
  }

  removeAsset(assetCode) {
    let index = this.cotations.indexOf(assetCode);

    if (index > -1) {
      this.cotations.splice(index, 1);
    }
  }

  getCotationValue(assetCode) {
    return "R$" + this.assetService.getAssetValue(assetCode).toLocaleString('pt-BR');
  }

  buyOrSell(assetCode) {
    currentAsset.next(assetCode);
  }

  ngOnDestroy() {
    this.subscription.dispose();
    this.assetService.setMyFavAssets(this.cotations)
  }
}


@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [MfeCotationComponent],
  bootstrap: [MfeCotationComponent]
})
export default class MainModule {
}

