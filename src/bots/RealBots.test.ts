import { expect } from 'chai';
import 'mocha';

import { Bot } from './RealBots';

describe('RealBots', () => {
    describe("Bot", () => {
        describe('powerToByte', () => {
            [
                [-1, 0],
                [-0.75, 18],
                [-0.5, 35],
                [-0.25, 53],
                [-0.000001, 70],
                [0, 90],
                [0.000001, 110],
                [0.25, 128],
                [0.5, 145],
                [0.75, 163],
                [1, 180],
            ].forEach(v => {
                const power = v[0];
                const byte = v[1];
                it(`${power} => ${byte}`, () => {
                    expect(Bot.powerToByte(power)).equals(byte);
                });
            });
        })
    })
});