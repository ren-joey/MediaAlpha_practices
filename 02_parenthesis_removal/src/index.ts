/* eslint-disable @typescript-eslint/no-explicit-any */

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

const parenthesisRemoval = (expression: string): string => {
    const stack: any[] = [];
    const operators: any[] = [];
    const len = expression.length;
    const del = new Array(len).fill(0);

    for (let i = 0; i < len; i += 1) {
        const c = expression[i];
        if (/[a-zA-Z]/.test(c)) continue;
        if (c === ')') {
            let addSub = false;
            if (expression[stack[stack.length - 1]] === '(') {
                del[i] = 1;
                del[stack.pop() as number] = 1;
            } else {
                while (expression[stack[stack.length - 1]] !== '(') {
                    const d = expression[stack.pop() as number];
                    operators.pop();
                    if (d !== '*' && d !== '/') addSub = true;
                }

                const ind = stack.pop() as number;
                if (operators.length === 0) {
                    del[i] = 1;
                    del[ind] = 1;
                    continue;
                }
                const d = expression[operators[operators.length - 1]];
                if (d === '+' || ((d === '*' || d === '-') && !addSub)) {
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
    return ans;
};

export default parenthesisRemoval;