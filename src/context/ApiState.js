import React, {useState} from 'react'
import {ApiContext} from "./ApiContext";
import axios from "axios";

export const ApiState = ({children}) => {
    const [members, setMembers] = useState([])
    const [judges, setJudges] = useState([])
    const [ratings, setRatings] = useState([])
    const [isStarted, setIsStarted] = useState(false)

    const startCompetition = async () => {
        try {
            const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/secretary/start_competition`)
            setIsStarted(true)
        } catch (e) {
            console.log(e)
        }
    }

    const getMembers = async() => {
        try {
            const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/secretary/members`)
            console.log(data)
            setMembers(data.data)
        } catch (e) {
            console.log(e)
        }
    }

    const getJudges = async() => {
        try {
            const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/secretary/judges`)
            setJudges(data.data)
        } catch (e) {
            console.log(e)
        }
    }

    const getRatings = async() => {
        try {
            console.log(2)
            const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/secretary/ratings`)
            setRatings(data.data)
        } catch (e) {
            console.log(e)
        }
    }

    const nextMember = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/secretary/next_member`)
            return res
        } catch (e) {
            console.log(e)
        }
    }

    const logoutJudge = async (login) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/secretary/judge_logout`, {login})
            return res
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <ApiContext.Provider value={{
            startCompetition,
            nextMember,
            logoutJudge,
            getMembers,
            getJudges,
            getRatings,
            members,
            ratings,
            judges,
            isStarted,
        }}>
            {children}
        </ApiContext.Provider>
    )
}
