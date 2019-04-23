import getUUID from './uuid';
import RNFS from 'react-native-fs';
import { ToastShort } from '../utils/toast_util';
import { getToday, getYesterday } from '../utils/date';

/*
 * 待办列表的增删改查操作
 * 将待办列表转换成文件，存储在android本地
 * 
 * 规定待办列表文件内容格式
 * {
 *   "uuid": 唯一uuid标识,
 *   "type": "everyday" 每日 / "once"一次性,
 *   "status": "done" 已完成 / "wait-to-do" 未完成,
 *   "content": 待办列表内容,
 *   "date": "2019-4-18" 一次性待办列表存在
 * }
 * 
 * 
 */
const ExternalDirectoryPath = RNFS.ExternalDirectoryPath;
//todolist文件夹
const TodoListDirectoryPath = ExternalDirectoryPath+'/todolist';

export default class Todo_Dao {

  //构造函数
  constructor(props){
    //类变量初始化
    this.todayTd=[];
    this.doneTd=[];
    this.waitTd=[];
    this.init=false;
    /**
     * 是否存在todolist文件夹
     * 如果不存在即创建
     */
    RNFS.exists(TodoListDirectoryPath)
      .then((res)=>{
        if(res){
          console.log('exits');
        }else{
          RNFS.mkdir(TodoListDirectoryPath)
            .then((r)=>{
              console.log('succeed');
            }).catch((err)=>{
              console.log('err',err);
            });
        }
      }).catch((err)=>{
        console.log('err',err);
      });
  }

  /**
   * 获取待办列表 
   * 将数据返回给页面
   */
  getTodo(){
    //从Storage中获取所有uuid
    var p = new Promise(function(resolve, reject){
      let uuidArray = global.storage.getIdsForKey('todolist');
      let todomsg = [];
      let check = 0;
      for(var i=uuidArray.length-1;i>=0;i--){
        RNFS.readFile(TodoListDirectoryPath+'/'+uuidArray[i]+'.json','utf8')
          .then((ret) => {
            console.log('FILE READ!');
            todomsg.push(JSON.parse(ret));
            check++;
            if(check==uuidArray.length){
              console.log(todomsg);
              resolve(todomsg);
            }
          })
          .catch((err) => {
            alert(err.message);
            console.log(err.message);
          });
      }
    });
    //console.log(p);
    return p;
    
  }



  /**
   * 添加待办事项
   * 生成json
   * 存储入Storage
   * 并云同步
   */
  addTodo(typeStr,contentStr,dateStr){
    var p = new Promise(function(resolve,reject){
      let uuidStr = getUUID();
      //存储入Storage
      global.storage.save({
        key:'todolist',
        id:uuidStr,
        data:{
          uuid:uuidStr,
          type:typeStr,
          status:'wait-to-do',
          content:contentStr,
          date:dateStr,
        },
      });
      //存入本地文件
      let tdObj = {};
      tdObj.uuid=uuidStr;
      tdObj.type=typeStr;
      tdObj.status='wait-to-do';
      tdObj.content=contentStr;
      if(typeStr == 'everyday')
        tdObj.date = getToday();
      else
        tdObj.date=dateStr;
      let tdJson = JSON.stringify(tdObj);
      let path = TodoListDirectoryPath+'/'+uuidStr+'.json';
      RNFS.writeFile(path,tdJson,'utf8')
        .then((success) => {
          ToastShort('待办添加成功！');
          console.log('FILE WRITTEN!');
          console.log(tdJson);
          if(tdObj.date==getToday()){
            global.todoDao.todayTd.unshift(tdObj);
            resolve(1);
          }
          else{
            global.todoDao.waitTd.unshift(tdObj);
            resolve(2);
          }
        })
        .catch((err) => {
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
  checkCloud(){

  }

  /**
   * 完成待办事项
   * 修改json
   * 并云同步
   */
  finishTodo(item,statusStr){
    let path = TodoListDirectoryPath+'/'+item.uuid+'.json';
    //修改Storage
    item.status = statusStr;
    if(item.type=='everyday'){
      if(statusStr=='done') item.date=getToday();
      else item.date=getYesterday();
    }
    let json = JSON.stringify(item);
    global.storage.save({
      key:'todolist',
      id:item.uuid,
      data:{
        uuid:item.uuid,
        type:item.type,
        status:statusStr,
        content:item.content,
        date:item.date,
      },
    });
    //同步至文件
    console.log('path:'+path+' json:'+json);
    RNFS.writeFile(path,json,'utf8')
      .then((success) => {
        console.log('FILE WRITTEN!');
        console.log(json);
      })
      .catch((err) => {
        alert(err.message);
        console.log(err.message);
      });
    //云同步
  }

  /**
   * 删除待办事项
   * 删除文件
   * 删除Storage
   * 并云同步
   */
  deleteTodo(uuid){
    var p = new Promise(function(resolve,reject){
      let path = TodoListDirectoryPath+'/'+uuid+'.json';
      //删除Storage
      storage.remove({
        key:'todolist',
        id:uuid
      });
      //同步至文件
      RNFS.unlink(path)
        .then((ret)=>{
          console.log('FILE DELETION');
          ToastShort('待办事项已删除');
          let num = global.todoDao.deleteData(uuid);
          resolve(num);
        })
        .catch((err)=>{
          alert(err.message);
          console.log(err.message);
        });
      //云同步
    });
    return p;
  }


  //刷新列表
  deleteData(uuid){
    for(i in this.todayTd){
      if(this.todayTd[i].uuid==uuid){
        this.todayTd.splice(i,1);
        return 1;
      }
    }
    for(i in this.waitTd){
      if(this.waitTd[i].uuid==uuid){
        this.waitTd.splice(i,1);
        return 2;
      }
    }
    for(i in this.doneTd){
      if(this.doneTd[i].uuid==uuid){
        this.doneTd.splice(i,1);
        return 3;
      }
    }
    return 0;
  }

  deleteStorage(){
    global.storage.clearMapForKey('todolist');
    let uuidArray = global.storage.getIdsForKey('todolist');
    alert(uuidArray.length);
  }
}