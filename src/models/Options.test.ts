import { expect } from 'chai';
import 'mocha';
import Option, { Mode } from './Options';

describe('Option', () => {
    it('Default', () => {
        expect(Option.default.red).equals('./localTeam.js');
        expect(Option.default.blue).equals('./opponents/random.js');
        expect(Option.default.mode).equals(Mode.Sim);
    });

    it('setRed', () => {
        const option = Option.default.setRed('test.js');
        expect(option.red).equals('test.js');
    })

    it('setBlue', () => {
        const option = Option.default.setBlue('test.js');
        expect(option.blue).equals('test.js');
    })

    it('setReal', () => {
        const option = Option.default.setReal();
        expect(option.mode).equals(Mode.Real);
    })

    it('setSim', () => {
        const option = Option.default.setReal().setSim();
        expect(option.mode).equals(Mode.Sim);
    })
});