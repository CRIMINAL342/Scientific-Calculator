const display = document.getElementById('display');
let expression = '';

function updateDisplay() {
  display.textContent = expression || '0';
}

function appendNumber(num) {
  // Prevent multiple decimals in a number
  if (num === '.' && /(\.\d*)?$/.test(expression.split(/[\+\-\*\/\(\)]/).pop())) return;
  expression += num;
  updateDisplay();
}

function appendOperator(op) {
  if (expression.length && !isOperator(expression.slice(-1))) {
    expression += op;
    updateDisplay();
  }
}

function appendFunction(func) {
  if (func === '^') {
    // Use ** for exponentiation in JS
    if (expression.length && !isOperator(expression.slice(-1))) {
      expression += '**';
    }
  } else {
    expression += func;
  }
  updateDisplay();
}

function isOperator(char) {
  return ['+', '-', '*', '/', '.'].includes(char);
}

function clearDisplay() {
  expression = '';
  updateDisplay();
}

function deg2rad(degrees) {
  return degrees * (Math.PI / 180);
}

function calculateResult() {
  try {
    // Replace math functions with JS Math equivalents, handling degrees for trig functions
    let exp = expression
      .replace(/sin\(([^)]+)\)/g, 'Math.sin(deg2rad($1))')
      .replace(/cos\(([^)]+)\)/g, 'Math.cos(deg2rad($1))')
      .replace(/tan\(([^)]+)\)/g, 'Math.tan(deg2rad($1))')
      .replace(/log10\(/g, 'Math.log10(')
      .replace(/sqrt\(/g, 'Math.sqrt(');

    // Evaluate the expression
    let result = eval(exp);
    if (result === undefined || isNaN(result) || !isFinite(result)) throw new Error();
    expression = result.toString();
  } catch {
    expression = 'Error';
  }
  updateDisplay();
}
