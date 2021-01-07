import { expect } from 'chai';
import 'mocha';
import { parseArgs } from './Cli';
import { Mode } from './models/Options';

describe('Cli', () => {
    it('-r', () => {
        const option = parseArgs(['node','fake.js','-r', 'test.js']);
        expect(option.red).equals('test.js');
    })

    it('-b', () => {
        const option = parseArgs(['node','fake.js','-b', 'test.js']);
        expect(option.blue).equals('test.js');
    })

    it('--real', () => {
        const option = parseArgs(['node','fake.js','--real']);
        expect(option.mode).equals(Mode.Real);
    })

    it('--sim', () => {
        const option = parseArgs(['node','fake.js','--sim']);
        expect(option.mode).equals(Mode.Sim);
    })
});