import getUUID from '../services/uuid';
import RNFS from 'react-native-fs';
import { ToastShort } from '../utils/toast_util';
import { config } from 'rx';
import { getToday } from '../utils/date';
import { URL, PostFile, Get } from '../utils/fetch';

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
 *   "type": "markdown",  //markdown or richtext,
 *    "title": title, // 默认标题为当前事件
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
  init = async () => {
    console.log('init note...');
    let created = getToday();
    this.created = created;
    this.last_date = created;
    this.note = {
      html: this.uuid + 'html',
      raw: this.uuid + 'raw'
    };
    this.info = {};
    this.lock = false;
    this.title = getToday();
    await RNFS.exists(`${this.path}/config.json`)
      .then(async res => {
        if (res) {
          console.log(`${this.path}/config.json exits`);
          // read config from json
          await RNFS.readFile(`${this.path}/config.json`)
            .then(res => {
              console.log(`read ${this.path}/config.json`);
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
        }
      })
      .catch(err => {
        console.log(`error ${this.path}/config.json exits`, err);
      });
  };
  constructor(uuid, type) {
    //类变量初始化
    this.uuid = uuid;
    this.type = type;
    this.note = {
      html: this.uuid + 'html',
      raw: this.uuid + 'raw'
    };
    if (global.username == '') {
      NBInfoDirectoryPath = ExternalDirectoryPath + '/nbInfo';
    } else {
      NBInfoDirectoryPath =
        ExternalDirectoryPath + '/' + global.username + '/nbInfo';
    }
    this.path = `${NBInfoDirectoryPath}/${this.uuid}`;
    /**
     * 是否存在nbInfo文件夹
     * 如果不存在即创建
     */
  }

  saveConfig = async () => {
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
    this.last_date = getToday();

    let info = {
      created: this.created,
      last_date: this.last_date,
      type: this.type,
      note: this.note,
      info: this.info,
      lock: this.lock,
      uuid: this.uuid,
      title: this.title
    };
    await RNFS.writeFile(`${this.path}/config.json`, JSON.stringify(info))
      .then(() => {
        console.log(`${this.path}/config.json write success`);
      })
      .catch(err => {
        console.log(`write ${this.path}/config.json error`, err);
      });
  };

  setTitle = title => {
    this.title = title;
  };

  save = async (html, raw) => {
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
    if (global.username != '') {
      console.log(`upload note ${this.uuid}...`);
      let data = {
        usernum: global.username,
        note: this.note,
        info: this.info,
        uuid: this.uuid
      };
      let files = [
        `file:///${this.path}/${this.note.html}`,
        `file:///${this.path}/${this.note.raw}`,
        `file:///${this.path}/config.json`
      ];
      let names = [this.note.html, this.note.raw, 'config'];
      PostFile(URL.note_upload, data, files, names)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  delete = async () => {
    console.log('delete note...');

    await RNFS.unlink(`${this.path}`)
      .then(() => {
        console.log(`${this.path} delete success`);
      })
      .catch(err => {
        console.log(`delete ${this.path} error`, err);
      });
    Get(URL.note_delete + `/${this.uuid}`)
      .then(res => {
        if (res.ret == 0) {
          console.log('delete success');
        } else {
          console.log('delete failed');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  readContent = async () => {
    console.log('read content files...' + this.note);
    let config = {};
    console.log(`${this.path}/${this.note.html}`);
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
  };
  readHtmlContent = async () => {
    console.log('read content files...' + this.note);
    let config = {};
    console.log(`${this.path}/${this.note.html}`);
    await RNFS.readFile(`${this.path}/${this.note.html}`)
      .then(res => {
        config.html = res;
      })
      .catch(err => {
        console.log(`read ${this.path}/config.json error`, err);
      });
    return config;
  };
  readRawContent = async () => {
    console.log('read content files...' + this.note);
    let config = {};
    console.log(`${this.path}/${this.note.html}`);

    await RNFS.readFile(`${this.path}/${this.note.raw}`)
      .then(res => {
        config.raw = res;
      })
      .catch(err => {
        console.log(`read ${this.path}/config.json error`, err);
      });
    return config;
  };
}
