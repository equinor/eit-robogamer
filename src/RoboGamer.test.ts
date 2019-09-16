import { expect } from 'chai';
import 'mocha';
import RoboGamer from './RoboGamer';

describe('RoboGamer', () => {
    // just a test to include all sources
    it("main exist", () => {
        expect(RoboGamer.main).not.undefined;
    })
});