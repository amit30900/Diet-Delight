import { createSlice } from '@reduxjs/toolkit'

export const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        temp: null,
        mealplan: null,
        question: null,
        consultant: null,
    },
    reducers: {
        setTemp: (state, action) => {
            state.temp = action.payload
        },
        resetTemp: (state) => {
            state.temp = null
        },
        setMealPlan: (state, action) => {
            state.mealplan = action.payload
        },
        resetMealPlan: (state) => {
            state.mealplan = null
        },
        setQuestion: (state, action) => {
            state.question = action.payload
        },
        resetQuestion: (state) => {
            state.question = null
        },
        setConsultant: (state, action) => {
            state.consultant = action.payload
        },
        resetConsultant: (state) => {
            state.consultant = null
        }
    }
});

export const {
    setTemp,
    resetTemp,
    setMealPlan,
    resetMealPlan,
    setQuestion,
    resetQuestion,
    setConsultant,
    resetConsultant } = adminSlice.actions;

export const selectTemp = state => state.admin.temp;
export const selectMealPlan = state => state.admin.mealplan;
export const selectQuestion = state => state.admin.question;
export const selectConsultant = state => state.admin.consultant;

export default adminSlice.reducer;