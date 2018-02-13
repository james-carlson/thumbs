// VIEWS
const DISPLAY_NEW_QUESTION_BOX = "DISPLAY_NEW_QUESTION_BOX"
const TOGGLE_STUDENT_QUESTIONS = "TOGGLE_STUDENT_QUESTIONS"
const VIEW_STUDENT_QUESTIONS = "VIEW_STUDENT_QUESTIONS"
const VIEW_QUESTION_RESPONSES = "VIEW_QUESTION_RESPONSES"
const VIEW_INITIAL = "VIEW_INITIAL"


const initialState = {
    currentView: 'initial',
    displayNewQuestionBox: false,
    displayStudentQuestions: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case DISPLAY_NEW_QUESTION_BOX:
            return Object.assign({}, state, {currentView: 'teacherNewQuestion', displayNewQuestionBox: !state.displayNewQuestionBox });
        case TOGGLE_STUDENT_QUESTIONS:
            return {...state, displayStudentQuestions: !state.displayStudentQuestions};
        case VIEW_STUDENT_QUESTIONS:
            return Object.assign({}, state, {currentView: 'allStudentQuestions' });
        case VIEW_QUESTION_RESPONSES:
            return Object.assign({}, state, {currentView: 'questionResponses' });
        case VIEW_INITIAL:
            return Object.assign({}, state, {currentView: 'initial' });
        default:
            return state;
    }
}

export function toggleDisplayNewQuestionBox() {
    return { type: DISPLAY_NEW_QUESTION_BOX }
}

export function toggleStudentQuestionsDisplay() {
    return { type: TOGGLE_STUDENT_QUESTIONS }
}

export function viewStudentQuestion() {
    return { type: VIEW_STUDENT_QUESTIONS }
}

export function viewQuestionResponses() {
    return { type: VIEW_QUESTION_RESPONSES }
}

export function viewInitial() {
    return { type: VIEW_INITIAL }
}



