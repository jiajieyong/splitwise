import { IExpense, tricount } from './splitwise';

const expenses: IExpense[] = [
    {amountPaid: 12, payer: "alex", participants: [ "alex","joana","lina","mischel","gonzalo","andre"]},
    {amountPaid: 10, payer: "joana", participants: [ "alex","joana","lina","mischel","andre"]},
    {amountPaid: 10, payer: "lina", participants: [ "alex","joana","lina","mischel","gonzalo"]}
];

describe('#balancing', () => {
    describe('Given a list of expenses', () => {
        it('should return a balanced account', () => {
            expect(tricount(expenses)).toEqual([
                { from: 'mischel', to: 'alex', amount: 6 },
                { from: 'gonzalo', to: 'joana', amount: 4 },
                { from: 'andre', to: 'lina', amount: 4 }
            ]);
        })
    });
}); 