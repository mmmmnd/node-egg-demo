/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-25 15:29:03
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-28 16:28:18
 */
const Controller = require('egg').Controller;

class UploadController extends Controller {
  /**
   * 上传单个文件
   */
  async create () {
    const stream = await this.ctx.getFileStream();

    // const upload = await this.ctx.service.upload.create(stream); //本地上传
    const upload = await this.ctx.service.upload.index(stream) //七牛云上传

    await this.ctx.helper.checkData(upload);
  }

}

module.exports = UploadController