import { database } from "../shared/database";
import { BehaviorSubject } from 'rxjs';

export class Asset {
    constructor() {

    }

    existAsset(asset){
        return database[asset] !== undefined;
    }

    getAssetValue(asset) {
        return database[asset];
    }

    getMyFavAssets() {
        return myFavAssets;
    }

    setMyFavAssets(assets) {
        myFavAssets = assets;
    }

    addAssetToWallet(assetCode, qtd, value) {
        let savedInfo = sessionStorage.getItem("MFE-" + assetCode);
        let assetData;
        if (savedInfo) {
            assetData = JSON.parse(savedInfo);
            assetData.qtd += qtd;
            assetData.value += (qtd * value);
        } else {
            assetData = { qtd, value };
        }

        sessionStorage.setItem("MFE-" + assetCode, JSON.stringify(assetData));

        var event = new CustomEvent('buy', { 'detail': (qtd * value) });
        dispatchEvent(event);
    }

    removeAssetToWallet(assetCode, qtd, value) {
        let savedInfo = sessionStorage.getItem("MFE-" + assetCode);
        let assetData;
        if (savedInfo) {
            assetData = JSON.parse(savedInfo);
            assetData.qtd -= qtd;
            assetData.value -= (qtd * value);
        } else {
            assetData = { qtd, value };
        }

        sessionStorage.setItem("MFE-" + assetCode, JSON.stringify(assetData));

        var event = new CustomEvent('sell', { 'detail': (qtd * value) });
        dispatchEvent(event);
    }

    getPoderVenda(assetCode) {
        let savedInfo = sessionStorage.getItem("MFE-" + assetCode);
        let assetData;
        if (!savedInfo) {
            return 0
        }

        assetData = JSON.parse(savedInfo);
        return assetData.qtd;
    }
}

export const currentAsset = new BehaviorSubject("");

let myFavAssets = ["ITUB3", "SANB4", "PETR4", "ITSA4", "FLRY3", "CIEL3"];