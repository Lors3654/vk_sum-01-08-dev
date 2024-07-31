const { fromFormToServer } = require('./fromFormToServer');

describe('fromFormToServer', () => {
    test('Отечественный юридический контрагент', () => {
        const personInForm = {
            isForeign: false,
            isJuridical: true,
            title: 'ООО "Ромашка"',
            tin: '1234567890',
        };
        const result = fromFormToServer(personInForm);
        expect(result).toEqual({
            type: 'juridical',
            tin: '1234567890',
            name: null,
            foreign_tin: null,
            company_title: 'ООО "Ромашка"',
        });
    });

    test('Отечественный физический контрагент', () => {
        const personInForm = {
            isForeign: false,
            isJuridical: false,
            title: 'Иван Иванов',
            tin: '0987654321',
        };
        const result = fromFormToServer(personInForm);
        expect(result).toEqual({
            type: 'physical',
            tin: '0987654321',
            name: 'Иван Иванов',
            foreign_tin: null,
            company_title: null,
        });
    });

    test('Иностранный юридический контрагент', () => {
        const personInForm = {
            isForeign: true,
            isJuridical: true,
            title: 'International AAA',
            tin: 'A1234567',
        };
        const result = fromFormToServer(personInForm);
        expect(result).toEqual({
            type: 'foreign_juridical',
            tin: null,
            name: null,
            foreign_tin: 'A1234567',
            company_title: 'International AAA',
        });
    });

    test('Иностранный физический контрагент', () => {
        const personInForm = {
            isForeign: true,
            isJuridical: false,
            title: 'Adam Smith',
            tin: 'Z1234567',
        };
        const result = fromFormToServer(personInForm);
        expect(result).toEqual({
            type: 'foreign_physical',
            tin: null,
            name: 'Adam Smith',
            foreign_tin: 'Z1234567',
            company_title: null,
        });
    });

    test('Отечественный юридический контрагент с пустыми полями', () => {
        const personInForm = {
            isForeign: false,
            isJuridical: true,
            title: '',
            tin: '',
        };
        const result = fromFormToServer(personInForm);
        expect(result).toEqual({
            type: 'juridical',
            tin: '',
            name: null,
            foreign_tin: null,
            company_title: '',
        });
    });

    test('Иностранный физический контрагент с пустыми полями', () => {
        const personInForm = {
            isForeign: true,
            isJuridical: false,
            title: '',
            tin: '',
        };
        const result = fromFormToServer(personInForm);
        expect(result).toEqual({
            type: 'foreign_physical',
            tin: null,
            name: '',
            foreign_tin: '',
            company_title: null,
        });
    });
});