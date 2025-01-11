import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    courseSectionData:[],
    courseEntireData:[],
    completedLectures:[],
    totalNumberOfLectures:0,
}

const viewCourseSlice = createSlice({
    name:"viewCourse",
    initialState,
    reducers:{
        setCourseSectionData: (state,action) =>{
            state.courseSectionData = action.payload
        },
        setCourseEntireData: (state,action) =>{
            state.courseEntireData = action.payload
        },
        setCompletedLectures: (state,action) =>{
            state.completedLectures = action.payload
        },
        setTotalNumberOfLectures: (state,action) =>{
            state.totalNumberOfLectures = action.payload
        },
        updateCompletedLectures: (state, action) => {
            state.completedLectures = [...state.completedLectures, action.payload]
        },
    },
})

export const {
setCourseSectionData,
setCourseEntireData,
setTotalNumberOfLectures,
setCompletedLectures,
updateCompletedLectures,
} = viewCourseSlice.actions

export default viewCourseSlice.reducer