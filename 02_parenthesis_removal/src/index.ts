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

const replaceRange = (s: string, start: number, end: number, substitute: string) => {
    return s.substring(0, start) + substitute + s.substring(end);
};

const algebraReplace = (s: string): [expression: string, list: string[]] => {
    const list: string[] = [];
    const negativeNumbers: number[][] = [];

    let operators: number[] = [];
    let operands: number[] = [];
    let leadingOperator = true;

    for (let i = 0; i < s.length; i += 1 ) {
        const c = s[i];
        if(c !== '(' && c !== ')') {
            if (c === '+' || c === '-' || c === '*' || c === '/') {

                // If there is a operator and still the first operator
                if (operators.length === 1 && leadingOperator) {
                    leadingOperator = false;

                    // Check if the operator is "-" and are there already have operands
                    if (s[operators[0]] === '-' && operands.length > 0) {
                        negativeNumbers.push([operators[0], operands[operands.length - 1]]);
                    }
                    operands = [];
                    operators = [i];
                }

                // If there are 2 operators along with some operands
                // assume the second operator will definitely is '-'
                else if (operands.length > 0 && operators.length >= 2) {
                    negativeNumbers.push([operators[1], operands[operands.length - 1]]);
                    operands = [];
                    operators = [i];

                // If there already has operands and operator, mean the operator belongs a new operand.
                } else if (operands.length > 0) {
                    operands = [];
                    operators = [i];

                // If there are no operands, directly push the operator
                } else operators.push(i);

            // Push any operands directly
            } else {
                leadingOperator = false;
                operands.push(i);
            }
        }
    }

    if (operands.length > 0 && operators.length >= 2) {
        negativeNumbers.push([operators[1], operands[operands.length - 1]]);
    }

    for (let i = negativeNumbers.length - 1; i >= 0; i -= 1) {
        const nums = negativeNumbers[i];
        list.unshift(s.substring(nums[0], nums[nums.length - 1] + 1));
        s = replaceRange(s, nums[0], nums[nums.length - 1] + 1, '_');
    }

    console.log(s);

    return [s, list];
};

const parenthesisRemoval = (s: string): string => {
    const [expression, list] = algebraReplace(s);
    const stack: any[] = [];
    const operators: any[] = [];
    const len = expression.length;
    const del = new Array(len).fill(0);

    for (let i = 0; i < len; i += 1) {
        const c = expression[i];
        if (/[a-zA-Z]/.test(c)) continue;
        if (c === ')') {
            if (expression[stack[stack.length - 1]] === '(') {
                del[i] = 1;
                del[stack.pop() as number] = 1;
            } else {
                let addSub = false;
                let hasOperator = false;
                let innerPrior = false;
                while (expression[stack[stack.length - 1]] !== '(') {
                    const d = expression[stack.pop() as number];
                    operators.pop();
                    if (d !== '*' && d !== '/') addSub = true;
                    else { innerPrior = true; }
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
                    (d === '+' || ((d === '*' || d === '-' || d === '/') && !addSub))
                    || ((d === '*' || d === '/') && innerPrior && addSub)
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

    for (let i = ans.length - 1; i >= 0; i -= 1) {
        if (ans[i] === '_') {
            const exp = list.pop();
            if (i !== 0 && ans[i-1] !== '(') ans = replaceRange(ans, i, i+1, `(${exp})`);
            else ans = replaceRange(ans, i, i+1, `${exp}`);
        }
    }

    return ans;
};

export default parenthesisRemoval;