import { expect } from 'chai';
import 'mocha';
import Point from './Point';

describe('model/Point', () => {
    describe('angle', () => {
        [
            [0,0,180],
            [1,0,180],
            [1,1,225],
            [0,1,270],
            [-1,1,315],
            [-1,0,360],
            [-1,-1,45],
            [0,-1,90],
            [1,-1,135],
        ].forEach(values => {
            const point = new Point(values[0], values[1]);
            const degrees = values[2];
            it(`${point.x},${point.y} => ${degrees}`, () => {
                expect(point.asAngle().degrees).equals(degrees);
            })
        })
    });
    describe('sub', () => {
        [
            [0,0,0,0,0,0],
            [4,3,2,3,2,0],
            [1,2,4,3,-3,-1],
            [1,2,4,1,-3,1],
        ].forEach(values => {
            const p1 = new Point(values[0], values[1]);
            const p2 = new Point(values[2], values[3]);
            const result = new Point(values[4], values[5]);
            it(`${p1} - ${p2} = ${result}`, () => {
                expect(p1.sub(p2)).eql(result);
            })
        })
    });
    describe('distance', () => {
        [
            [0,0,0],
            [1,1,1.41],
            [1,2,2.236],
            [2,2,2.828],
        ].forEach(values => {
            const p1 = new Point(values[0], values[1]);
            const result = values[2];
            it(`${p1}.distance() => ${result}`, () => {
                expect(p1.distance()).closeTo(result, 0.01);
            })
        })
    });
});