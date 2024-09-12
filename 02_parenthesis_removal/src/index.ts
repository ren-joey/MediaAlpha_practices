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

interface Hash { [s: string]: string };

const replaceRange = (s: string, start: number, end: number, substitute: string) => {
    return s.substring(0, start) + substitute + s.substring(end);
};

const algebraReplace = (s: string): [expression: string, hash: Hash] => {
    const hash: Hash = {};
    let stack: number[] = [];
    let detected = false;
    const negativeNumbers: number[][] = [];
    let charCode: number = 65;

    for (let i = 0; i < s.length; i += 1 ) {
        const c = s[i];
        if (c === '-' && (stack.length === 1 || i === 0)) {
            stack = [i];
            detected = true;
        }
        else if (!detected && (c === '+' || c === '-' || c === '*' || c === '/')) {
            stack = [i];
        }
        else if (/[0-9]/.test(c) && detected === true) stack.push(i);
        else if (/[A-Za-z]/.test(c)) {
            detected = false;
            stack = [];
        }
        else if (detected) {
            negativeNumbers.push([...stack]);
            detected = false;
            stack = [];
        }
    }

    for (let i = negativeNumbers.length - 1; i >= 0; i -= 1) {
        const nums = negativeNumbers[i];
        const algebra = String.fromCharCode(charCode);
        hash[algebra] = s.substring(nums[0], nums[nums.length - 1] + 1);
        s = replaceRange(s, nums[0], nums[nums.length - 1] + 1, algebra);
        charCode += 1;
    }

    return [s, hash];
};

const parenthesisRemoval = (s: string): string => {
    const [expression, hash] = algebraReplace(s);
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

                console.log(addSub ? 'T' : 'F');

                const ind = stack.pop() as number;
                if (operators.length === 0) {
                    del[i] = 1;
                    del[ind] = 1;
                    continue;
                }

                const d = expression[operators[operators.length - 1]];
                console.log(d);
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
        if (hash[ans[i]]) {
            if (i !== 0) ans = replaceRange(ans, i, i+1, `(${hash[ans[i]]})`);
            else ans = replaceRange(ans, i, i+1, `${hash[ans[i]]}`);
        }
    }

    return ans;
};

export default parenthesisRemoval;