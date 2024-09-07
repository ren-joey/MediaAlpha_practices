import { describe, expect, test } from '@jest/globals';
import parenthesesRemoval from '../src/index';

describe('test', () => {
    test('case 1', () => {
        expect(parenthesesRemoval('123')).toBe(0);
    });
});