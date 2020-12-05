import React, {useContext, useEffect, Fragment} from 'react'
import {Button} from "antd";
import {ApiContext} from "../../context/ApiContext";
import {Table} from "react-bootstrap";

const Home = () => {
    const {isStarted, startstartCompetition, members, judges, ratings, nextMember, logoutJudge, getMembers,
        getJudges,
        getRatings} = useContext(ApiContext)

    useEffect(() => {
        const fetchData = async () => {
            if (members.length === 0) {
                await getMembers()
            }
            if (judges.length === 0) {
                await getJudges()
            }
        }
        fetchData()
    })

    const getRat = async () => await getRatings;

    const getSumD1D2 = (member) => {
        let del = 0;
        let d1 = 0;
        let d2 = 0;
        for(let rate of ratings) {
            if (rate.Member === member._id) {
                for(let jud of judges) {
                    if (rate.Judge === jud._id && jud.category === 'D1') {
                        d1 = rate.score;
                        del++;
                    }
                }
            }
        }
        for(let rate of ratings) {
            if (rate.Member === member._id) {
                for(let jud of judges) {
                    if (rate.Judge === jud._id && jud.category === 'D2') {
                        d2 = rate.score;
                        del++;
                    }
                }
            }
        }
        return (d1 + d2) / Math.max(del, 1)
    }

    const getSumD3D4 = (member) => {
        let del = 0;
        let d3 = 0;
        let d4 = 0;
        for(let rate of ratings) {
            if (rate.Member === member._id) {
                for(let jud of judges) {
                    if (rate.Judge === jud._id && jud.category === 'D3') {
                        d3 = rate.score;
                        del++;
                    }
                }
            }
        }
        for(let rate of ratings) {
            if (rate.Member === member._id) {
                for(let jud of judges) {
                    if (rate.Judge === jud._id && jud.category === 'D4') {
                        d4 = rate.score;
                        del++;
                    }
                }
            }
        }
        return (d3 + d4) / Math.max(1, del)
    }

    const getSumE1E2 = (member) => {
        let del = 0;
        let e1 = 0;
        let e2 = 0;
        for(let rate of ratings) {
            if (rate.Member === member._id) {
                for(let jud of judges) {
                    if (rate.Judge === jud._id && jud.category === 'E1') {
                        e1 = rate.score;
                        del++;
                    }
                }
            }
        }
        for(let rate of ratings) {
            if (rate.Member === member._id) {
                for(let jud of judges) {
                    if (rate.Judge === jud._id && jud.category === 'E2') {
                        e2 = rate.score;
                        del++;
                    }
                }
            }
        }
        return (e1 + e2) / Math.max(1, del)
    }

    const getSumE3E4E5E6 = (member) => {
        let del = 0;
        let e3 = 0;
        let e4 = 0;
        let e5 = 0;
        let e6 = 0;
        for(let rate of ratings) {
            if (rate.Member === member._id) {
                for(let jud of judges) {
                    if (rate.Judge === jud._id && jud.category === 'E3') {
                        e3 = rate.score;
                        del++;
                    }
                }
            }
        }
        for(let rate of ratings) {
            if (rate.Member === member._id) {
                for(let jud of judges) {
                    if (rate.Judge === jud._id && jud.category === 'E4') {
                        e4 = rate.score;
                        del++;
                    }
                }
            }
        }
        for(let rate of ratings) {
            if (rate.Member === member._id) {
                for(let jud of judges) {
                    if (rate.Judge === jud._id && jud.category === 'E5') {
                        e5 = rate.score;
                        del=++;
                    }
                }
            }
        }
        for(let rate of ratings) {
            if (rate.Member === member._id) {
                for(let jud of judges) {
                    if (rate.Judge === jud._id && jud.category === 'E6') {
                        e6 = rate.score;
                    }
                }
            }
        }

        return (e3 + e4 + e5 + e6) / 4
    }

    const getSumOfUser = (member) => {
        return getSumD1D2(member) + getSumE1E2(member) + getSumD3D4(member) + getSumE3E4E5E6(member)
    }

    return (
        <div>
            {isStarted //TODO: поменять на !isStarted
            ? <Button onClick={() => startstartCompetition()}>Начать соревнование</Button>
            : <Fragment>
                    {JSON.stringify(members)}
                    {JSON.stringify(judges)}
                    {JSON.stringify(ratings)}
                    <Button onClick={() => getRatings()}>Обновить результаты</Button>
                    <Button onClick={() => nextMember()}>Следующий участник</Button>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Участник</th>
                            <th>Результат за первый тур</th>
                            <th>Общий результат</th>
                        </tr>
                        </thead>
                        <tbody>
                        {members.map((mem, i) => {
                            return (
                                <tr>
                                    <td>{mem.fio}</td>
                                    <td>{getSumOfUser(mem)}</td>
                                    <td>{getSumOfUser(mem)}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </Fragment>
            }
        </div>
    )
}

export default Home
