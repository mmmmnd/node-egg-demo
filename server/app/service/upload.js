/*
 * @Author: 莫卓才
 * @eMail: handsome.mo@foxmail.com
 * @Descripttion: 描述
 * @version: 1.0.0
 * @Date: 2020-09-22 09:11:46
 * @LastEditors: 莫卓才
 * @LastEditTime: 2020-09-29 08:38:16
 */
'use strict';

const fs = require('fs');
const path = require('path');
const qiniu = require('qiniu');
const moment = require('moment');
const Service = require('egg').Service;
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const HttpStatus = require('../utils/httpStatus');

const bucket = "mzc-egg-demo"; //要上传的空间名
const imageUrl = "mzc-egg-demo.s3-cn-south-1.qiniucs.com"; // 空间绑定的域名
const accessKey = "U_JuxtUYEQJY-wyccQccUzFm0znY_utat-FZVd-f"; //Access Key
const secretKey = "zdeP9icr_CdVpudYTEyABG7R-_oPNX4BemfQBKsf"; //Secret Key
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = { scope: bucket };
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);
let config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z2;

class UploadService extends Service {
  /**
   * 七牛云上传图片
   * @param { Object } stream 文件流
   */
  async index (stream) {
    const REG = /\.(png|jpg|gif|jpeg|webp)$/;
    const QINIU_URL = 'http://qhcxehb37.hn-bkt.clouddn.com/'
    const filename = stream.filename.toLocaleLowerCase()

    if (!REG.test(filename)) {
      await sendToWormhole(stream);
      return { msg: '文件格式不支持！', errorStatus: HttpStatus.UNPROCESABLE_ENTITY };
    }

    const localFilePath = path.join(__dirname, "../public/uploads", filename);
    const writeStream = fs.createWriteStream(localFilePath);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
      const formUploader = new qiniu.form_up.FormUploader(config);
      const putExtra = new qiniu.form_up.PutExtra();
      const imgSrc = await new Promise((resolve, reject) => {
        formUploader.putFile(
          uploadToken,
          filename,
          localFilePath,
          putExtra, (respErr, respBody, respInfo) => {
            if (respErr) {
              reject("");
            }
            if (respInfo.statusCode == 200) {
              resolve(imageUrl + respBody.key);
            } else {
              reject("");
            }
            // 上传之后删除本地文件
            fs.unlinkSync(localFilePath);
          }
        );
      });
      if (imgSrc !== "") {
        return { data: { url: QINIU_URL + filename } };
      } else {
        return { msg: '未知错误', httpStatus: HttpStatus.INTERNAL_SERVER_ERROR };
      }
    } catch (err) {
      await sendToWormhole(stream);
      return { msg: error.message, httpStatus: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
  /**
   * 上传单个文件
   * @param { Object } stream 文件流
   */
  async create (stream) {
    const REG = /\.(png|jpg|gif|jpeg|webp)$/;
    const time = moment(Date.now()).format('YYYYMMDD');
    const PATH = `app/public/uploads/${time}`;
    const filename = Date.now() + path.extname(stream.filename).toLocaleLowerCase();

    if (!REG.test(filename)) {
      await sendToWormhole(stream);
      return { msg: '文件格式不支持！', errorStatus: HttpStatus.UNPROCESABLE_ENTITY };
    }

    fs.mkdirSync(PATH, { recursive: true })
    const target = path.join(PATH, filename);
    const writeStream = fs.createWriteStream(target);

    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (error) {
      await sendToWormhole(stream);
      return { msg: error.message, httpStatus: HttpStatus.INTERNAL_SERVER_ERROR };
    }

    return { data: { url: `${this.ctx.origin}/public/uploads/${time}/${filename}` } };
  }
}

module.exports = UploadService;