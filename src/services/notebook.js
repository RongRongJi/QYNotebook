import getUUID from './uuid';
import RNFS from 'react-native-fs';
import { ToastShort } from '../utils/toast_util';
import { getToday, getYesterday } from '../utils/date';
import Note from './note';

/*
 * 笔记的增删改查操作
 * 将笔记相关参数转换成文件，存储在android本地
 *
 * 规定待办列表文件内容格式
 * {
 *   "uuid": 唯一uuid标识,
 *   "lock": true 笔记上锁 / false 笔记公开
 *   "path": 笔记路径,
 *   "create_date": "2019-4-18" 创建时间
 *   "last_date": "2019-4-26" 最后修改时间
 * }
 *
 *
 */
const ExternalDirectoryPath = RNFS.ExternalDirectoryPath;
//notebook Information文件夹
let NBInfoDirectoryPath;
let tmpPath;

export default class NoteBook_Dao {
  //构造函数
  constructor(props) {
    //类变量初始化
    this.notebookList = [];
    this.lockList = [];
    this.init = false;
    if(global.username==''){
      NBInfoDirectoryPath = ExternalDirectoryPath+'/nbInfo';
    }else{
      NBInfoDirectoryPath = ExternalDirectoryPath+'/'+global.username+'/nbInfo';
    }
    /**
     * 是否存在nbInfo文件夹
     * 如果不存在即创建
     */
    RNFS.exists(NBInfoDirectoryPath)
      .then(res => {
        if (res) {
          console.log('exits');
        } else {
          RNFS.mkdir(NBInfoDirectoryPath)
            .then(r => {
              console.log('succeed');
            })
            .catch(err => {
              console.log('err', err);
            });
        }
      })
      .catch(err => {
        console.log('err', err);
      });
    
    //是否存在tmp文件夹
    if(global.username==''){
      tmpPath = ExternalDirectoryPath+'/tmp';
    }else{
      tmpPath = ExternalDirectoryPath+'/'+global.username+'/tmp';
    }
    RNFS.exists(tmpPath)
      .then(res => {
        if (res) {
          console.log('exits');
        } else {
          RNFS.mkdir(tmpPath)
            .then(r => {
              console.log('succeed');
            })
            .catch(err => {
              console.log('err', err);
            });
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  //读取笔记列表
  static getInitData(){
    var p = new Promise(function(resolve,reject){
      NoteBook_Dao.getNotebook().then(async (ret)=>{
        let allData = ret;
        let nblist = [];
        let locklist=[];
        for(var i=0;i<allData.length;i++){
          let note = await new Note(allData[i].uuid,allData[i].type);
          let content = await note.readHtmlContent();
          allData[i].note=content;
          if(allData.lock==true){
            locklist.push(allData[i]);
            global.nbDao.lockList=locklist;
          }else{
            nblist.push(allData[i]);
            global.nbDao.notebookList=nblist;
          }
        }
        global.nbDao.init=true;
        //console.log(global.nbDao.notebookList);
        resolve(true);
      });
    });
    return p;
  }



  /**
   * 获取笔记列表
   * 将数据返回给页面
   */
  static async getNotebook() {
    //从Storage中获取所有uuid
    var p = new Promise(function(resolve, reject) {
      RNFS.readdir(NBInfoDirectoryPath)
        .then((ret)=>{
          let uuidArray = ret;
          let nbmsg = [];
          let check = 0;
          for (var i = uuidArray.length - 1; i >= 0; i--) {
            RNFS.readFile(
              NBInfoDirectoryPath + '/' + uuidArray[i] + '/config.json',
              'utf8'
            )
              .then(ret => {
                console.log('FILE READ!');
                nbmsg.push(JSON.parse(ret));
                check++;
                if (check == uuidArray.length) {
                  console.log(nbmsg);
                  resolve(nbmsg);
                }
              })
              .catch(err => {
                alert(err.message);
                console.log(err.message);
              });
          }
        });
    });
    //console.log(p);
    return p;
  }

  /**
   * 添加notebook
   * 生成json
   * 存储入Storage
   * 并云同步
   */
  addNotebook(pathStr) {
    var p = new Promise(function(resolve, reject) {
      let uuidStr = getUUID();
      let dateStr = getToday();
      //存储入Storage
      global.storage.save({
        key: 'notebook',
        id: uuidStr,
        data: {
          uuid: uuidStr,
          lock: false,
          path: pathStr,
          create_date: dateStr,
          last_date: dateStr
        }
      });
      //存入本地文件
      let nbObj = {};
      nbObj.uuid = uuidStr;
      nbObj.lock = false;
      nbObj.path = pathStr;
      nbObj.create_date = dateStr;
      nbObj.last_date = dateStr;
      let nbJson = JSON.stringify(nbObj);
      let path = NBInfoDirectoryPath + '/' + uuidStr + '.json';
      RNFS.writeFile(path, nbJson, 'utf8')
        .then(success => {
          ToastShort('笔记已保存');
          console.log('FILE WRITTEN!');
          console.log(nbJson);
          global.notebook_Dao.notebookList.unshift(nbObj);
        })
        .catch(err => {
          alert(err.message);
          console.log(err.message);
        });
      //云同步
    });
    return p;
  }

  /**
   * 载入时检查云同步情况
   * 进行与云服务器同步的操作
   */
  checkCloud() {}

  /**
   * 修改笔记
   * 修改json
   * 并云同步
   */
  ModifyNotebook(item) {
    let path = NBInfoDirectoryPath + '/' + item.uuid + '.json';
    //修改Storage
    item.last_date = getToday();
    let json = JSON.stringify(item);
    global.storage.save({
      key: 'notebook',
      id: item.uuid,
      data: {
        uuid: item.uuid,
        lock: item.lock,
        path: item.path,
        create_date: item.create_date,
        last_date: item.last_date
      }
    });
    //同步至文件
    console.log('path:' + path + ' json:' + json);
    RNFS.writeFile(path, json, 'utf8')
      .then(success => {
        console.log('FILE WRITTEN!');
        console.log(json);
      })
      .catch(err => {
        alert(err.message);
        console.log(err.message);
      });
    //云同步
  }

  /**
   * 删除笔记
   * 删除文件
   * 删除Storage
   * 并云同步
   */
  deleteTodo(uuid) {
    var p = new Promise(function(resolve, reject) {
      let path = NBInfoDirectoryPath + '/' + uuid + '.json';
      //删除Storage
      storage.remove({
        key: 'notebook',
        id: uuid
      });
      //同步至文件
      RNFS.unlink(path)
        .then(ret => {
          console.log('FILE DELETION');
          ToastShort('笔记已删除');
        })
        .catch(err => {
          alert(err.message);
          console.log(err.message);
        });
      //云同步
    });
    return p;
  }

  deleteStorage() {
    global.storage.clearMapForKey('todolist');
    let uuidArray = global.storage.getIdsForKey('todolist');
    alert(uuidArray.length);
  }

  //刷新列表
  deleteData(uuid) {
    for (i in this.notebookList) {
      if (this.notebookList[i].uuid == uuid) {
        this.notebookList.splice(i, 1);
        return 1;
      }
    }
    for (i in this.lockList) {
      if (this.lockList[i].uuid == uuid) {
        this.lockList.splice(i, 1);
        return 2;
      }
    }
    return 0;
  }


}
