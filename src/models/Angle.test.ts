import { expect } from 'chai';
import 'mocha';
import Angle from './Angle';

describe('model/Angle', () => {
    describe('degrees', () => {
        it('0', () => {
            expect(new Angle(0).degrees).equals(0);
        })
        it('90', () => {
            expect(new Angle(Math.PI*0.5).degrees).equals(90);
        })
        it('180', () => {
            expect(new Angle(Math.PI).degrees).equals(180);
        })
        it('270', () => {
            expect(new Angle(Math.PI*1.5).degrees).equals(270);
        })
        it('360', () => {
            expect(new Angle(Math.PI*2).degrees).equals(360);
        })
    })
    describe('fromDegrees', () => {
        it('0', () => {
            expect(Angle.fromDegrees(0).radians).equals(0);
        })
        it('90', () => {
            expect(Angle.fromDegrees(90).radians).equals(Math.PI * 0.5);
        })
        it('180', () => {
            expect(Angle.fromDegrees(180).radians).equals(Math.PI);
        })
        it('270', () => {
            expect(Angle.fromDegrees(270).radians).equals(Math.PI * 1.5);
        })
        it('360', () => {
            expect(Angle.fromDegrees(360).radians).equals(Math.PI * 2);
        })
    })

    describe('range', () => {
        it('-90', () => {
            expect(Angle.fromDegrees(-90).degrees).equals(270);
        })
        it('-180', () => {
            expect(Angle.fromDegrees(-180).degrees).equals(180);
        })
        it('-10000', () => {
            expect(Angle.fromDegrees(-10000).degrees).closeTo(80,0.00001);
        })
        it('+90', () => {
            expect(Angle.fromDegrees(360+90).degrees).equals(90);
        })
        it('+180', () => {
            expect(Angle.fromDegrees(360+180).degrees).equals(180);
        })
        it('10000', () => {
            expect(Angle.fromDegrees(10000).degrees).closeTo(280,0.00001);
        })
    })
    
    describe('sub', () => {
        [
            [180, 90, 90],
            [300, 100, 200],
            [0, 90, 270],
            [0, 360, 0],
            [10, 80, 290],
        ].forEach(values => {
            const a1 = Angle.fromDegrees(values[0]);
            const a2 = Angle.fromDegrees(values[1]);
            const result = Angle.fromDegrees(values[2]);
            it(`${a1} - ${a2} = ${result}`, () => {
                const value = a1.sub(a2);
                expect(value.degrees).closeTo(result.degrees,0.0001);
            })
        })
    })

    describe('right', () => {
        [
            [0, -1],
            [90, -0.5],
            [180, 0],
            [270, 0.5],
        ].forEach(values => {
            const a1 = Angle.fromDegrees(values[0]);
            const e = values[1];
            it(`${a1}.right => ${e}`, () => {
                const value = a1.right;
                expect(value).closeTo(e,0.0001);
            })
        })
    })
});