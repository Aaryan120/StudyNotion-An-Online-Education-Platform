import React, { useState } from 'react'
import {Chart, registerables} from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

function InstructorChart({courses}) {
    const [currChart,setCurrChart] = useState("students");

    const getRandomColors = (numColors) =>{
        const colors = [];
        for(let i = 0;i<numColors;++i){
            const color = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`
            colors.push(color);
        }
        return colors;
    }

    const chartDataForStudents = {
        labels: courses.map((course) => course.courseName),
        datasets:[
            {
                data:courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor:getRandomColors(courses.length),
            }
        ]
    }

    const chartDataForIncome = {
        labels: courses.map((course) => course.courseName),
        datasets:[
            {
                data:courses.map((course) => course.totalRevenueGenerated),
                backgroundColor:getRandomColors(courses.length),
            }
        ]
    }

    const options ={
        maintainAspectRatio: false,
    }
  return (
    <div className='p-7 bg-richblack-700/80 w-full md:w-[70%] h-[400px] rounded-md text-white'>
        <div>
            <p className='text-xl font-semibold mb-4'>Visualize</p>
        </div>
        <div className='flex gap-x-5 transition duration-300 mb-4 md:mb-2'>
            <button
            className={`px-2 py-1 ${currChart === 'students' ? "text-yellow-25 bg-richblack-600": " text-yellow-25/70"} rounded-md transition duration-300`}
            onClick={() => setCurrChart("students")}>
                Student
            </button>
            <button 
            className={`px-2 py-1 ${currChart === 'income' ? "text-yellow-25 bg-richblack-600": " text-yellow-25/70"} transition duration-300 rounded-md`}
            onClick={() => setCurrChart("income")}>
                Income
            </button>
        </div>
        <div className='h-[250px]  flex justify-center items-center w-full'>
            <Pie
            data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
            options={options}
            />
        </div>
    </div>
  )
}

export default InstructorChart