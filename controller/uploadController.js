import { User } from '../model/index.js'

/**
 * 通用文件上传 — 单文件
 * 请求字段名: file
 */
export const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ err: '未选择文件' })
  }

  const fileUrl = `/uploads/${req.file.filename}`
  res.status(200).json({
    msg: '上传成功',
    data: {
      url: fileUrl,
      originalname: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
    },
  })
}

/**
 * 上传头像 — 自动更新当前用户的 image 字段
 */
export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ err: '未选择文件' })
    }

    const fileUrl = `/uploads/${req.file.filename}`
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { image: fileUrl },
      { new: true, runValidators: true },
    )
    if (!user) {
      return res.status(404).json({ err: '用户不存在' })
    }

    res.status(200).json({
      msg: '头像上传成功',
      data: {
        url: fileUrl,
        user: {
          _id: user._id,
          username: user.username,
          image: user.image,
        },
      },
    })
  } catch (err) {
    res.status(500).json({ err: '头像上传失败' })
  }
}

/**
 * 上传封面 — 自动更新当前用户的 cover 字段
 */
export const uploadCover = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ err: '未选择文件' })
    }

    const fileUrl = `/uploads/${req.file.filename}`
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { cover: fileUrl },
      { new: true, runValidators: true },
    )
    if (!user) {
      return res.status(404).json({ err: '用户不存在' })
    }

    res.status(200).json({
      msg: '封面上传成功',
      data: {
        url: fileUrl,
        user: {
          _id: user._id,
          username: user.username,
          cover: user.cover,
        },
      },
    })
  } catch (err) {
    res.status(500).json({ err: '封面上传失败' })
  }
}
