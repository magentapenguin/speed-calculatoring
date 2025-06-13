const buttons = document.querySelectorAll('.btn');
const screen = document.getElementById('screen') as HTMLDivElement;
let screenValue = '';
let isError = false;
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const buttonText = button.textContent;
        const buttonAction = button.getAttribute('data-action');
        if (buttonAction === 'clear') {
            screenValue = '';
            isError = false;
        }
        else if (buttonAction === 'eval') {
            if (!isError && screenValue) {
                try {
                    screenValue = eval(screenValue.replaceAll('×', '*').replaceAll('÷', '/')).toString();
                } catch (error) {
                    screenValue = error instanceof Error ? error.message : 'Error';
                    isError = true;
                }
            }
        } else if (buttonAction === 'del') {
            if (isError) {
                screenValue = '';
                isError = false;
            }
            screenValue = screenValue.slice(0, -1);
        }
        else {
            if (!isError) {
                screenValue += buttonText;
            }
        }
        if (screen) {
            screen.textContent = screenValue;
        }
    });
});

// Handle keyboard input
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key === 'Enter') {
        const evalButton = document.querySelector('.btn[data-action="eval"]');
        evalButton?.click();
    } else if (key === 'Backspace') {
        const delButton = document.querySelector('.btn[data-action="del"]');
        delButton?.click();
    } else if (key === 'Escape') {
        const clearButton = document.querySelector('.btn[data-action="clear"]');
        clearButton?.click();
    } else if ('0123456789+-*/.'.includes(key)) {
        // Replace '×' with '*' and '÷' with '/' for keyboard compatibility
        const keyMap: Record<string,string> = {
            '*': '×',
            '/': '÷',
        };
        const button = Array.from(buttons).find(btn => btn.textContent === keyMap[key] || btn.textContent === key);
        if (button) {
            button.click();
        }
    }
});