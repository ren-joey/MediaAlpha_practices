import { describe, expect, test } from '@jest/globals';
// import { parenthesisRemoval } from '../src';
import { parenthesisRemoval } from '../src/solution2';

const getOperator = (): string => {
    const i = Math.floor(Math.random() * 3);
    if (i === 0) return '+';
    else if (i === 1) return '-';
    else if (i === 2) return '*';
    return '/';
};

const getOperand = (max: number): string => {
    let res = '';
    // const nOrA = Math.round(Math.random());
    const nOrA = true;
    const negative = Math.round(Math.random());
    const upOrLow = Math.round(Math.random());
    let charCode = Math.floor(Math.random() * 26);
    if (!nOrA) {
        if (upOrLow) {
            charCode += 65;
        } else {
            charCode += 97;
        }
        res = String.fromCharCode(charCode);
    }
    else {
        res = Math.floor(Math.random() * max).toString();
    }

    if (negative) {
        res = '(-' +  res + ')';
    }
    return res;
};

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
        ['(A*(-B+C))', 'A*(-B+C)'],
        ['(A/(-B+C))', 'A/(-B+C)'],
        ['(A/((-B)*C))', 'A/(-B*C)'],
        ['(A*((-B)/C))', 'A*(-B/C)'],
        ['(-A*(-5577+856)/((-B)*C))', '-A*(-5577+856)/(-B*C)'],
        ['(-A*((-852+(-1524))*(-B)/C))', '-A*(-852+(-1524))*(-B)/C'],
        ['-A*(-5577+856)/((-B)*C)', '-A*(-5577+856)/(-B*C)'],
        ['-A*((-852+(-1524))*(-B)/C)', '-A*(-852+(-1524))*(-B)/C'],
        ['1*(2+(3*(4+5)))', '1*(2+3*(4+5))'],
        ['x+(y+z)+(t+(v+w))', 'x+y+z+t+v+w'],
        ['x*(12+(16+y))', 'x*(12+16+y)'],
        [
            '(((((((((((((x+(y+z))))))))))))))+(t+(v+w)+(v+w)+(v+w)+(v+w)+(v+w)+(v+w)+(v+w)+(v+w)+(v+w)+(v+w)+(v+w)+(v+w)+(v+w)+(v+w))',
            'x+y+z+t+v+w+v+w+v+w+v+w+v+w+v+w+v+w+v+w+v+w+v+w+v+w+v+w+v+w+v+w'
        ],
        [
            '(((((((((((((-x*(y+z))))))))))))))+(t+(v+w)+(v+w)+(v+w)+(v+w)+(v+w)+(v+w)+(v+w)+(v+w)+(v+w)+(v+w)+(v+w-(-876*(-954+(-954))))+(v+w)+(v+w)+(v+w))',
            '-x*(y+z)+t+v+w+v+w+v+w+v+w+v+w+v+w+v+w+v+w+v+w+v+w+v+w-(-876*(-954+(-954)))+v+w+v+w+v+w'
        ],
        ['-(2)-(2+3)', '-2-(2+3)'],
        ['2*(3/5)', '2*3/5'],
        ['(2*3)/5', '2*3/5'],
        ['-B+((-A)*9)+((2*3)/(5*8))', '-B+(-A*9)+2*3/5*8'],
        ['-B*((-A)-9)+((2*3)/(5*8))', '-B*(-A-9)+2*3/5*8'],
        ['2/(3)', '2/3'],
        ['2*(3)', '2*3'],
        ['2*(3*(-5*(-7/8))/6)', '2*3*(-5*(-7/8))/6'],
        ['2*(3*(5*(7/8))/6)', '2*3*5*7/8/6'],
        ['1+(-1)+((-16)+((-18)*(-20)))', '1+(-1)+(-16+(-18*(-20)))'],
        ['1+(-1)', '1+(-1)'],
        ['A+(-1)', 'A+(-1)'],
        ['(6-4)*(-8)', '(6-4)*(-8)'],
        ['((2*((2+3)-(4*6))+(8+(7*4))))', '2*(2+3-4*6)+8+7*4'],
        ['((((-9)-3*2)*(-8)+6+1+6)*9)*3', '((-9-3*2)*(-8)+6+1+6)*9*3'],
        ['(C*E)/A', 'C*E/A'],
        ['-A-(B*(C-D-E))', '-A-B*(C-D-E)'],
        ['A-(B/C-D+(E-(F-G/H/I*J+((K+((L/M*N*O+P-((Q*((R-S-T*(U/((V-W/(X/Y/Z)))))))))))))))', 'A-(B/C-D+E-(F-G/H/I*J+K+L/M*N*O+P-Q*(R-S-T*U/(V-W/X/Y/Z))))']
    ];

    testCases.forEach((c, idx) => {
        test(`case ${idx+1}: ${c[0]} => ${c[1]}`, () => {
            expect(parenthesisRemoval(c[0])).toBe(c[1]);
        });
    });

    const testCaseGenerator = (times: number, operators: number, max_operand: number) => {

        for (let i = 0; i < times; i += 1) {
            const os = Math.round(Math.random() * operators);
            let exp = getOperand(max_operand);

            for (let j = 0; j < os; j += 1) {
                exp = exp + getOperator() + getOperand(max_operand);
                if (Math.round(Math.random())) {
                    exp = '(' + exp + ')';
                }
            }

            const removed = parenthesisRemoval(exp);
            test(`case ${i+1}: ${exp} => ${removed}`, () => {
                const before = eval(exp);
                const after = eval(removed);
                expect(before).toBe(after);
            });
        }
    };

    testCaseGenerator(1000, 30, 100);
    // testCaseGenerator(1000, 100, 100);
    // testCaseGenerator(1000, 1000, 1000);
    // testCaseGenerator(1000, 10000, 10000);
});


