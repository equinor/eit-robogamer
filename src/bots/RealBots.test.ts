import { expect } from 'chai';
import 'mocha';

import { Bot } from './RealBots';

describe('RealBots', () => {
    describe("Bot", () => {
        describe('powerToByte', () => {
            it('-1 => 0', () => {
                expect(Bot.powerToByte(-1)).equals(0);
            })
            it('-0.75 => 23', () => {
                expect(Bot.powerToByte(-0.75)).equals(23);
            })
            it('-0.5 => 45', () => {
                expect(Bot.powerToByte(-0.5)).equals(45);
            })
            it('-0.25 => 68', () => {
                expect(Bot.powerToByte(-0.25)).equals(68);
            })
            it('0 => 90', () => {
                expect(Bot.powerToByte(0)).equals(90);
            })
            it('0.25 => 113', () => {
                expect(Bot.powerToByte(0.25)).equals(113);
            })
            it('0.5 => 135', () => {
                expect(Bot.powerToByte(0.5)).equals(135);
            })
            it('0.75 => 158', () => {
                expect(Bot.powerToByte(0.75)).equals(158);
            })
            it('1 => 180', () => {
                expect(Bot.powerToByte(1)).equals(180);
            })
        })
    })
});