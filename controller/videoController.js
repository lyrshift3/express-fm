import { getDb, saveDb } from '../db.js'

export const getVideos = async (req, res) => {
    try {
        const data = await getDb()
        res.send(data.users)
    } catch (err) {
        res.status(500).json({ err })
    }
}

export const addVideo = async (req, res) => {
    console.log(req.headers)
    console.log(req.body)
    let body = req.body
    if (!body) {
        res.status(403).json({ err: '缺少用户信息' })
        return
    }
    const data = await getDb()
    body.id = data.users.length + 1
    console.log(body)
    data.users.push(body)
    try {
        let result = await saveDb(data)
        if (!result) {
            res.status(200).send({ msg: '用户添加成功' })
        }
    } catch (err) {
        res.status(500).json({ err })
    }
}

export const updateVideo = async (req, res) => {
    let id = Number.parseInt(req.params.id)
    let body = req.body
    if (!body) {
        res.status(403).json({ err: '缺少用户信息' })
        return
    }
    const data = await getDb()
    let user = data.users.find(item => item.id == id)
    if (!user) {
        res.status(403).json({ err: '用户不存在' })
        return
    }
    Object.assign(user, body)
    try {
        let result = await saveDb(data)
        if (!result) {
            res.status(200).send({ msg: '用户更新成功' })
        }
    } catch (err) {
        res.status(500).json({ err })
    }
}
