import { expect } from 'chai';
import 'mocha';
import BotPos from './BotPos';
import Point from '../models/Point';
import Angle from '../models/Angle';


describe('bots/BotPos', () => {
    it('x', () => {
        const bp = new BotPos(new Point(1,2), new Angle(3));
        expect(bp.x).equals(1);
    });
    it('y', () => {
        const bp = new BotPos(new Point(1,2), new Angle(3));
        expect(bp.y).equals(2);
    });
    it('radians', () => {
        const bp = new BotPos(new Point(1,2), new Angle(3));
        expect(bp.radians).equals(3);
    });

    it('empty', () => {
        expect(new BotPos()).eql(new BotPos(new Point(0,0), new Angle(0)))
    })
});