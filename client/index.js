class Calc {
  constructor(prevOpTextElement, currentOpTextElement, expressionTextElement) {
    this.prevOpTextElement = prevOpTextElement;
    this.currentOpTextElement = currentOpTextElement;
    this.expressionTextElement = expressionTextElement;
    this.readyToReset = false;
    this.clear();
    this.renderHistory();
  }

  clear() {
    (this.currentOp = ''), (this.prevOp = ''), (this.op = undefined);
  }

  delete() {
    this.currentOp = this.currentOp.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOp.includes('.')) return;
    this.currentOp = this.currentOp.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOp === '') return;
    if (this.prevOp !== '') {
      this.compute();
    }
    this.op = operation;
    this.prevOp = this.currentOp;
    this.currentOp = '';
  }

  compute() {
    let computation, expression;
    const prev = parseFloat(this.prevOp);
    const current = parseFloat(this.currentOp);
    const op = this.op;

    if (isNaN(prev) || isNaN(current)) return;
    switch (op) {
      case '+':
        computation = prev + current;
        expression = this.buildExpression(prev, op, current, computation);
        this.postToHistory(expression);
        break;
      case '-':
        computation = prev - current;
        expression = this.buildExpression(prev, op, current, computation);
        this.postToHistory(expression);
        break;
      case '*':
        computation = prev * current;
        expression = this.buildExpression(prev, op, current, computation);
        this.postToHistory(expression);
        break;
      case '÷':
        computation = prev / current;
        expression = this.buildExpression(prev, op, current, computation);
        this.postToHistory(expression);
        break;
      default:
        return;
    }
    this.readyToReset = true;
    this.currentOp = computation;
    this.op = undefined;
    this.prevOp = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const intDigits = parseFloat(stringNumber.split('.')[0]);
    const deciDigits = stringNumber.split('.')[1];
    let intDisplay;

    if (isNaN(intDigits)) {
      intDisplay = '';
    } else {
      intDisplay = intDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (deciDigits != null) {
      return `${intDisplay}.${deciDigits}`;
    } else {
      return intDisplay;
    }
  }

  updateDisplay() {
    this.currentOpTextElement.innerText = this.getDisplayNumber(this.currentOp);
    if (this.op != null) {
      this.prevOpTextElement.innerText = `${this.getDisplayNumber(
        this.prevOp
      )} ${this.op}`;
    } else {
      this.prevOpTextElement.innerText = '';
    }
  }

  async getHistory() {
    const res = await fetch('/api/history');
    const data = await res.json();
    return data;
  }

  async renderHistory() {
    const data = await this.getHistory();
    this.expressionTextElement.innerHTML = '';
    data.map((element) => {
      this.expressionTextElement.innerHTML += `<li>${element.expression}</li>`;
    });
  }

  buildExpression(prev, op, current, computation) {
    let expressionObj = {
      expression: `${prev.toString()} ${op.toString()} ${current.toString()} = ${computation.toString()}`,
    };
    expressionObj = JSON.stringify(expressionObj);
    return expressionObj;
  }

  postToHistory(expression) {
    window.fetch('/api/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: expression,
    });
  }
}

const numButtons = document.querySelectorAll('[data-num]');
const opButtons = document.querySelectorAll('[data-op]');
const equalsButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-del]');
const acButton = document.querySelector('[data-ac]');
const prevOpTextElement = document.querySelector('[data-prev-op]');
const currentOpTextElement = document.querySelector('[data-current-op');
const expressionTextElement = document.querySelector('[data-expressions]');

const calculator = new Calc(
  prevOpTextElement,
  currentOpTextElement,
  expressionTextElement
);

numButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (
      calculator.prevOp === '' &&
      calculator.currentOp != '' &&
      calculator.readyToReset
    ) {
      calculator.currentOp = '';
      calculator.readyToReset = false;
    }
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

opButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

acButton.addEventListener('click', (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
