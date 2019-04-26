class Account {
    constructor() {
        this.saldo = 1000;
        this.patrimonio = 0;

        addEventListener('sell', (e) => {
            this.saldo += e.detail;
            this.patrimonio -= e.detail;
        });

        addEventListener('buy', (e) => {
            this.saldo -= e.detail;
            this.patrimonio += e.detail;
        });
    }

    getSaldo() {
        return this.saldo;
    }

    getPatrimonio() {
        return this.patrimonio;
    }
}

export const myAccount = new Account();