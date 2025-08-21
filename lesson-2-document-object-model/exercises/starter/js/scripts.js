const questOneAnswer = document.querySelector('.title')
const questTwoAnswer = document.querySelector("img[alt='panda developer']")
const questThreeAnswer = document.querySelectorAll('.intro ul')
const questFourAnswer = document.querySelector('.sloth').parentElement
const questFiveAnswer = document.querySelector("div[data-questNum = 'five'] p")

function executeQuery(query) {
    try {
        return new Function('return ' + query)();
    } catch (error) {
        console.error("Invalid query:", error);
        return null;
    }
}

function sanitizeQuery(input) {
    // Remove anything that's not alphanumeric, spaces, or specific allowed characters
    const sanitized = input.replace(/[^a-zA-Z0-9\s\.\[\]"'=()-]/g, '');
    // previous sanitized variable would not allow the dash in data-questNum so the question always failed

    // Ensure the query starts with 'document.querySelector' or 'document.querySelectorAll'
    if (!sanitized.startsWith('document.querySelector') && !sanitized.startsWith('document.querySelectorAll')) {
        return null;
    }

    // Limit the length of the query
    return sanitized.slice(0, 100);
}

const handleAnswerSubmission = async (event) => {
    if (event.target.nodeName != 'BUTTON') {
        return
    } else {
        console.log(event.target.parentElement.querySelector('input')?.value)
        const answerValue = event.target.parentElement.querySelector('input')?.value
        const sanitizedQuery = await sanitizeQuery(answerValue)
        const answerElement = await executeQuery(sanitizedQuery)
        const answerSubmission = `${answerValue}`
        if (!answerSubmission) {
            return
        }
        const questionCard = event.target.closest('.questionCard')
        const questionNumber = event.target.closest('.questionCard').getAttribute('data-questNum')
        switch (questionNumber) {
            case 'one':
                questionCard.style.backgroundColor = (answerElement === questOneAnswer) ? 'green' : 'red'
                questionCard.style.color = 'beige'
                event.target.textContent = (answerElement === questOneAnswer) ? `That's right! ` : `Try again`
                break;
            case 'two':
                questionCard.style.backgroundColor = (answerElement === questTwoAnswer) ? 'green' : 'red'
                questionCard.style.color = 'beige'
                event.target.textContent = (answerElement === questTwoAnswer) ? `That's right! ` : `Try again`
                break;
            case 'three':
                if (!(answerElement instanceof NodeList)) {
                    // Handle the case where the result is not a NodeList
                    questionCard.style.backgroundColor = 'red';
                    questionCard.style.color = 'beige';
                    event.target.textContent = 'Try again'
                    return;
                }
                const correctAnswer = Array.from(questThreeAnswer);
                const userAnswer = Array.from(answerElement);

                const isCorrect =
                    correctAnswer.length === userAnswer.length &&
                    correctAnswer.every((node, index) => node.isEqualNode(userAnswer[index]));

                questionCard.style.backgroundColor = isCorrect ? 'green' : 'red';
                questionCard.style.color = 'beige'
                event.target.textContent = (isCorrect) ? `That's right! ` : `Try again`
                break;
            case 'four':
                questionCard.style.backgroundColor = (answerElement === questFourAnswer) ? 'green' : 'red'
                questionCard.style.color = 'beige'
                event.target.textContent = (answerElement === questFourAnswer) ? `That's right! ` : `Try again`
                break;
            case 'five':
                questionCard.style.backgroundColor = (answerElement === questFiveAnswer) ? 'green' : 'red'
                questionCard.style.color = 'beige'
                event.target.textContent = (answerElement === questFiveAnswer) ? `That's right! ` : `Try again`
                break;
        }
    }

}

const questionListener = async () => {
    const questionContainer = document.querySelector('#questions')

    questionContainer.addEventListener('pointerdown', handleAnswerSubmission)
}

questionListener();

