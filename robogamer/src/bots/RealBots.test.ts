import { expect } from 'chai';
import 'mocha';

import { Bot } from './RealBots';

describe('RealBots', () => {
    describe("Bot", () => {
        describe('powerToByte', () => {
            [
                [-1, 0],
                [-0.75, 20],
                [-0.5, 40],
                [-0.25, 60],
                [-0.000001, 80],
                [0, 90],
                [0.000001, 100],
                [0.25, 120],
                [0.5, 140],
                [0.75, 160],
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