// VIEWS
const ASK_NEW_TEACHER_QUESTION = "ASK_NEW_TEACHER_QUESTION"
const ASK_NEW_STUDENT_QUESTION = "ASK_NEW_STUDENT_QUESTION"
const VIEW_STUDENT_QUESTIONS = "VIEW_STUDENT_QUESTIONS"
const VIEW_QUESTION_RESPONSES = "VIEW_QUESTION_RESPONSES"
const VIEW_INITIAL = "VIEW_INITIAL"


const initialState = { 
    currentView: 'initial',
    currentText: '',
    userType: 'instructor'
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ASK_NEW_TEACHER_QUESTION:
            return Object.assign({}, state, {currentView: 'teacherNewQuestion' });
        case ASK_NEW_STUDENT_QUESTION:
            return Object.assign({}, state, {currentView: 'studentNewQuestion' });
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

export function teacherNewQuestion() {
    return { type: ASK_NEW_TEACHER_QUESTION }
}

export function studentNewQuestion() {
    return { type: ASK_NEW_STUDENT_QUESTION }
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



