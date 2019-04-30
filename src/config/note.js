import getUUID from '../services/uuid';
import RNFS from 'react-native-fs';
import { ToastShort } from '../utils/toast_util';
import { config } from 'rx';

/*
 * 笔记的增删改查操作
 * 将笔记相关参数转换成文件，存储在android本地
 *
 * 规定笔记列表文件内容格式
 * config:{
 *   "uuid": 唯一uuid标识,
 *   "lock": true 笔记上锁 / false 笔记公开
 *   "create_date": "2019-4-18" 创建时间
 *   "last_date": "2019-4-26" 最后修改时间
 *   "type": "markdown",  //markdown or richtext
 *   "note":{
 *      "html":path,
 *      "raw":path
 *  }
 *   "info":{
 *      key1:"path1"
 *  }
 * }
 *
 *
 */

const ExternalDirectoryPath = RNFS.ExternalDirectoryPath;

export default class Note {
  //构造函数
  async _constructor() {
    await RNFS.exists(this.path)
      .then(async res => {
        if (res) {
          console.log(`${this.path} exits`);
        } else {
          await RNFS.mkdir(this.path)
            .then(r => {
              console.log(`mkdir ${this.path} success`);
            })
            .catch(err => {
              console.log(`mkdir ${this.path} error`, err);
            });
        }
      })
      .catch(err => {
        console.log(`error ${this.path} exits`, err);
      });

    console.log('saving to config.json...');
    await RNFS.exists(`${this.path}/config.json`)
      .then(async res => {
        if (res) {
          console.log(`${this.path}/config.json exits`);
          // read config from json
          await RNFS.readFile(`${this.path}/config.json`)
            .then(res => {
              res = JSON.parse(res);
              for (let key in res) {
                this[key] = res[key];
              }
            })
            .catch(err => {
              console.log(`read ${this.path}/config.json error`, err);
            });
        } else {
          console.log(`${this.path}/config.json doesn't exits`);
          let created = Date.now();
          this.created = created;
          this.last_date = created;
          this.note = {
            html: this.uuid + 'html',
            raw: this.uuid + 'raw'
          };
          this.info = {};
          this.lock = false;
          let info = {
            created: this.created,
            last_date: this.last_date,
            type: this.type,
            note: this.note,
            info: this.info,
            lock: this.lock,
            uuid: this.uuid
          };
          await RNFS.writeFile(`${this.path}/config.json`, JSON.stringify(info))
            .then(() => {
              console.log(`${this.path}/config.json write success`);
            })
            .catch(err => {
              console.log(`write ${this.path}/config.json error`, err);
            });
        }
      })
      .catch(err => {
        console.log(`error ${this.path}/config.json exits`, err);
      });
  }
  constructor(uuid, type) {
    //类变量初始化
    this.uuid = uuid;
    this.type = type;
    this.saveConfig = this.saveConfig.bind(this);
    this.save = this.save.bind(this);
    if (global.username == '') {
      NBInfoDirectoryPath = ExternalDirectoryPath + '/nbInfo';
    } else {
      NBInfoDirectoryPath =
        ExternalDirectoryPath + '/' + global.username + '/nbInfo';
    }
    this.path = `${ExternalDirectoryPath}/${this.uuid}`;
    /**
     * 是否存在nbInfo文件夹
     * 如果不存在即创建
     */
    this._constructor(uuid, type);
    console.log('test async');
  }

  async saveConfig() {
    console.log('saving to config.json...');
    this.last_date = Date.now();

    let info = {
      created: this.created,
      last_date: this.last_date,
      type: this.type,
      note: this.note,
      info: this.info,
      lock: this.lock,
      uuid: this.uuid
    };
    await RNFS.writeFile(`${this.path}/config.json`, JSON.stringify(info))
      .then(() => {
        console.log(`${this.path}/config.json write success`);
      })
      .catch(err => {
        console.log(`write ${this.path}/config.json error`, err);
      });
  }

  async save(html, raw) {
    await this.saveConfig();
    console.log('saving to note...');

    await RNFS.writeFile(`${this.path}/${this.note.html}`, html)
      .then(() => {
        console.log(`${this.path}/${this.note.html} write success`);
      })
      .catch(err => {
        console.log(`write ${this.path}/${this.note.html} error`, err);
      });

    await RNFS.writeFile(`${this.path}/${this.note.raw}`, raw)
      .then(() => {
        console.log(`${this.path}/${this.note.raw} write success`);
      })
      .catch(err => {
        console.log(`write ${this.path}/${this.note.raw} error`, err);
      });
  }

  async readContent() {
    console.log('read content files...');
    let config = {};
    await RNFS.readFile(`${this.path}/${this.note.html}`)
      .then(res => {
        config.html = res;
      })
      .catch(err => {
        console.log(`read ${this.path}/config.json error`, err);
      });

    await RNFS.readFile(`${this.path}/${this.note.raw}`)
      .then(res => {
        config.raw = res;
      })
      .catch(err => {
        console.log(`read ${this.path}/config.json error`, err);
      });
    return config;
  }
}
