const priority: {[s: string]: number} = {
    '+': 1,
    '-': 2,
    '*': 3,
    '/': 3
};

const isOperator = (s: string): boolean => priority[s] !== undefined;

const replaceRange = (s: string, start: number, end: number, substitute: string) => {
    return s.substring(0, start) + substitute + s.substring(end);
};

const algebraReplace = (s: string): [expression: string, list: string[]] => {
    const list: string[] = [];
    const negativeNumbers: number[][] = [];

    let operators: number[] = [];
    let operands: number[] = [];

    for (let i = 0; i < s.length; i += 1 ) {
        const c = s[i];
        if(c !== '(' && c !== ')') {
            if (c === '+' || c === '-' || c === '*' || c === '/') {

                // If there are 2 operators along with some operands
                // assume the second operator will definitely is '-'
                if (operands.length > 0 && operators.length >= 2) {
                    const substr = s.substring(operators[1], operands[operands.length - 1] + 1);

                    // Dealing with the -(N) case
                    const count: number = [...substr].reduce((sum, c) => {
                        if (c === '(') return sum + 1;
                        else if (c === ')') return sum - 1;
                        return sum;
                    }, 0);
                    negativeNumbers.push(
                        [
                            operators[1],
                            operands[operands.length - 1] + count
                        ]
                    );
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
                operands.push(i);
            }
        }
    }

    // Append the remained negative operands into array
    if (operands.length > 0 && operators.length >= 2) {
        negativeNumbers.push([operators[1], operands[operands.length - 1]]);
    }

    // Replace all negative operands into "_" (except the first one)
    for (let i = negativeNumbers.length - 1; i >= 0; i -= 1) {
        const nums = negativeNumbers[i];
        let substr = s.substring(nums[0], nums[nums.length - 1] + 1);

        // Remove the parenthesis in -(N) directly
        substr = substr.replaceAll(/[()]/g, '');
        list.unshift(substr);
        s = replaceRange(s, nums[0], nums[nums.length - 1] + 1, '_');
    }

    return [s, list];
};

const algebraRecovery = (s: string, list: string[]): string => {
    for (let i = s.length - 1; i >= 0; i -= 1) {
        if (s[i] === '_') {
            const exp = list.pop();
            if (s[i-1] === '(' && s[i-2] === '(' && s[i+1] === ')') s = replaceRange(s, i-1, i+2, `${exp}`);
            if (i !== 0 && s[i-1] !== '(') s = replaceRange(s, i, i+1, `(${exp})`);
            else s = replaceRange(s, i, i+1, `${exp}`);
        }
    }

    return s;
};

export {
    priority,
    isOperator,
    algebraReplace,
    algebraRecovery
};