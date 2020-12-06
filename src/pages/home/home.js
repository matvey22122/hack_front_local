import React, {useContext, useEffect, Fragment, useState} from 'react'
import {Button} from "antd";
import {ApiContext} from "../../context/ApiContext";
import {Modal, Table} from "react-bootstrap";

const Home = () => {
    const {isStarted, startCompetition, members, judges, ratings, nextMember, logoutJudge, getMembers,
        getJudges,
        getRatings} = useContext(ApiContext)

    const [show, setShow] = useState(false)
    const [member, setMember] = useState({})

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
                        del++;
                    }
                }
            }
        }
        for(let rate of ratings) {
            if (rate.Member === member._id) {
                for(let jud of judges) {
                    if (rate.Judge === jud._id && jud.category === 'E6') {
                        e6 = rate.score;
                        del++;
                    }
                }
            }
        }

        return (e3 + e4 + e5 + e6) / Math.max(1, del)
    }

    const getSumOfUser = (member) => {
        return getSumD1D2(member) + getSumE1E2(member) + getSumD3D4(member) + getSumE3E4E5E6(member)
    }

    const getSummOfJudge = (judg) => {
        for(let rate of ratings) {
            if (rate.Judge === judg._id) {
                return rate.score
            }
        }
    }

    return (
        <div>
            {isStarted //TODO: поменять на !isStarted
            ? <Button onClick={() => startCompetition()}>Начать соревнование</Button>
            : <Fragment>
                    <Button onClick={() => getRatings()}>Обновить результаты</Button>
                    <Button style={{marginBottom: 20}} onClick={() => nextMember()}>Следующий участник</Button>
                  <br/>
                  <Table style={{marginBottom: 20}} striped bordered hover>
                      <thead>
                      <tr>
                          <th>Судья</th>
                          <th>Категория</th>
                          <th>Выйти</th>
                      </tr>
                      </thead>
                      <tbody>
                      {judges.map((judg, i) => {
                          return (
                            <tr>
                                <td>{judg.fio}</td>
                                <td>{judg.category}</td>
                                <td><Button onClick={() => logoutJudge(judg.login)}>Выйти из аккаунта</Button></td>
                            </tr>
                          )
                      })}
                      </tbody>
                  </Table>
                  <br/>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Участник</th>
                            <th>Результат за первый тур</th>
                            <th>Общий результат</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*//TODO: сдесь показывать кто скок баллов поставил D..E...*/}
                        {members.map((mem, i) => {
                            return (
                                <tr>
                                    <td><Button onClick={() => setMember(mem)}>{mem.fio}</Button></td>
                                    <td>{getSumOfUser(mem)}</td>
                                    <td>{getSumOfUser(mem)}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                  <Modal show={Object.keys(member).length > 0}>
                      <Modal.Header closeButton>
                          <Modal.Title>Результаты выступления {member.fio}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <Table striped bordered hover>
                              <thead>
                              <tr>
                                  <th>Группа судей</th>
                                  <th>Кол-во баллов</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                  <td>D1 D2</td>
                                  <td>{getSumD1D2(member)}</td>
                              </tr>
                              <tr>
                                  <td>D3 D4</td>
                                  <td>{getSumD3D4(member)}</td>
                              </tr>
                              <tr>
                                  <td>Общая оценка за трудность</td>
                                  <td>{getSumD1D2(member) + getSumD3D4(member)}</td>
                              </tr>
                              <tr>
                                  <td>E1 E2</td>
                                  <td>{getSumE1E2(member)}</td>
                              </tr>
                              <tr>
                                  <td>E3 E4 E5 E6</td>
                                  <td>{getSumE3E4E5E6(member)}</td>
                              </tr>
                              <tr>
                                  <td>Общая оценка за исполнение</td>
                                  <td>{getSumE1E2(member) + getSumE3E4E5E6(member)}</td>
                              </tr>
                              <tr>
                                  <td>Сумма баллов</td>
                                  <td>{getSumOfUser(member)}</td>
                              </tr>
                              </tbody>
                          </Table>
                      </Modal.Body>
                      <Modal.Footer>
                          <Button variant="secondary" onClick={() => setMember({})}>
                              Close
                          </Button>
                      </Modal.Footer>
                  </Modal>
                </Fragment>
            }
        </div>
    )
}

export default Home
