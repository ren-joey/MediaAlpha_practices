/* eslint-disable @typescript-eslint/no-explicit-any */

import { algebraRecovery, algebraReplace } from "./utils";

/**
 *
 * Parenthesis removal function. Given a string containing an expression, return the expression with unnecessary parenthesis removed.
 *     For example:
 *     f("1*(2+(3*(4+5)))") ===> "1*(2+3*(4+5))"
 *     f("2 + (3 / -5)") ===> "2 + 3 / -5"
 *     f("x+(y+z)+(t+(v+w))") ===> "x+y+z+t+v+w"
 *
 * Please write a function that removes unnecessary parenthesis for any given string. You can write this in any language but please provide it in an executable format with instructions.
 *
 * You could just attach the code into an email or any other way that is convenient for you and please provide unit testing functionality. Please feel free to reach out if you have any questions about the programming questions.
 *
 * @param expression
 * @returns
 */

const parenthesisRemoval = (s: string): string => {

    // Replace negative operands with "_" (except the first one)
    const [expression, list] = algebraReplace(s);
    const stack: any[] = [];
    const operators: any[] = [];
    const len = expression.length;
    const del = new Array(len).fill(0);

    for (let i = 0; i < len; i += 1) {
        const c = expression[i];
        if (/[a-zA-Z0-9]/.test(c)) continue;

        // If the character is ")"
        if (c === ')') {

            // start check the characters in the stack
            if (expression[stack[stack.length - 1]] === '(') {
                del[i] = 1;
                del[stack.pop() as number] = 1;
            } else {
                let hasLower = false;
                let hasOperator = false;
                // const innerPrior = true;

                // Keep popping the elements, until it meets a "("
                // Which means all popped elements are at the same level
                while (expression[stack[stack.length - 1]] !== '(') {
                    const d = expression[stack.pop() as number];
                    operators.pop();
                    // has "-,+" or negative operands "_"
                    if (d !== '*' && d !== '/') hasLower = true;
                    // else { innerPrior = true; } // Add a priority cache
                    if (d === '+' || d === '-' || d === '*' || d === '/') hasOperator = true;
                }

                const ind = stack.pop() as number;
                if (operators.length === 0) {
                    del[i] = 1;
                    del[ind] = 1;
                    continue;
                }

                const d = expression[operators[operators.length - 1]];

                if (
                    // Check if the operator priority outside the parenthesis is lower then the operator inside the parenthesis
                    // If outside operator is "+"
                    (d === '+'
                        // If outside operator is "*,-,/" and inside is "*,/" and no any
                        || ((d === '-' || d === '*' || d === '/') && !hasLower))
                    // || ((d === '*' || d === '/') && innerPrior && hasLower)
                    // If there is no any operator inside the parenthesis
                    || !hasOperator
                ) {
                    del[i] = 1;
                    del[ind] = 1;
                }
            }
        } else if (c === '(') {
            stack.push(i);
        } else {
            stack.push(i);
            operators.push(i);
        }
    }

    let ans = "";
    for (let k = 0; k < len; k += 1) {
        if (!del[k]) ans += expression[k];
    }

    return algebraRecovery(ans, list);
};

export {
    parenthesisRemoval
};