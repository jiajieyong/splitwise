export interface IExpense {
    amountPaid: number;
    payer: String;
    participants: String[];
}

export const tricount= (expenses: IExpense[]) => {    
    const balances = new Map();

    // Step 1: Calculate net balance for each person
    expenses.forEach(({amountPaid, payer, participants}: IExpense)=> {
        const sharedAmount = amountPaid / participants.length;
        
        participants.forEach((person) => {
            balances.set(person, (balances.get(person) || 0) + sharedAmount);
        });
        balances.set(payer, (balances.get(payer) || 0) - amountPaid);
    })

    // Step 2: Find out who owes and who is owed
    const positiveBalances = new Map(Array.from(balances).filter(([person, balance]) => balance > 0));
    const negativeBalances = new Map(Array.from(balances).filter(([person, balance]) => balance < 0));

    // Step 3: Determine transactions needed to settle debts
    const transactions = [];

    for (const [debtor, debitAmt] of Array.from(negativeBalances)) {
        let remainingDebt = Math.abs(debitAmt);

        for (const [creditor, creditAmt] of Array.from(positiveBalances)) {
            const settledAmount = Math.min(remainingDebt, creditAmt);
            if (settledAmount > 0) {
                transactions.push({from: creditor, to: debtor, amount: settledAmount});
                positiveBalances.set(creditor, creditAmt - settledAmount);
                remainingDebt -= settledAmount
            }
            if (remainingDebt === 0) break;
        }
    }

    // Print transactions
    transactions.forEach(transaction => {
        console.log(`${transaction.from} needs to pay $${transaction.amount} to ${transaction.to}`);
    });

    return transactions;
}