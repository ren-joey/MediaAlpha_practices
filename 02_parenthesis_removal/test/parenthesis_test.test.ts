import { describe, expect, test } from '@jest/globals';
import parenthesisRemoval from '../src/index';

describe(`
Parenthesis removal function. Given a string containing an expression, return the expression with unnecessary parenthesis removed.

 *     For example:
 *     f("1*(2+(3*(4+5)))") ===> "1*(2+3*(4+5))"
 *     f("2 + (3 / -5)") ===> "2 + 3 / -5"
 *     f("x+(y+z)+(t+(v+w))") ===> "x+y+z+t+v+w"

Please write a function that removes unnecessary parenthesis for any given string. You can write this in any language but please provide it in an executable format with instructions.
`, () => {

    // You can append expression test cases here
    const testCases = [
        ['', ''],
        ['1', '1'],
        ['A+B', 'A+B'],
        ['A+(B+(C))', 'A+B+C'],
        ['(A*(B+C))', 'A*(B+C)'],
        ['1*(2+(3*(4+5)))', '1*(2+3*(4+5))'],
        ['x+(y+z)+(t+(v+w))', 'x+y+z+t+v+w'],
        ['x*(12+(16+y))', 'x*(12+16+y)']
    ];

    testCases.forEach((c, idx) => {
        test(`case ${idx+1}: ${c[0]} => ${c[1]}`, () => {
            expect(parenthesisRemoval(c[0])).toBe(c[1]);
        });
    });
});


