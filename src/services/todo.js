import getUUID from './uuid';
import RNFS from 'react-native-fs';

/*
 * 待办列表的增删改查操作
 * 将待办列表转换成文件，存储在android本地
 * 
 * 规定待办列表文件内容格式
 * {
 *   "uuid": 唯一uuid标识,
 *   "type": "everyday" 每日 / "only-once"一次性,
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
  async getTodo(){
    //从Storage中获取所有uuid
    let uuidArray = global.storage.getIdsForKey('todolist');
    let todomsg = [];
    for(var i=uuidArray.length-1;i>=0;i--){
      RNFS.readFile(TodoListDirectoryPath+'/'+uuidArray[2]+'.json','utf8')
        .then((ret) => {
          console.log('FILE READ!');
          todomsg.push(JSON.parse(ret));
          //alert(JSON.parse(ret));
        })
        .catch((err) => {
          alert(err.message);
          console.log(err.message);
        });
    }
    setTimeout(()=>{
      return todomsg;
    },100);
  }



  /**
   * 添加待办事项
   * 生成json
   * 存储入Storage
   * 并云同步
   */
  addTodo(typeStr,contentStr,dateStr){
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
    tdObj.date=dateStr;
    let tdJson = JSON.stringify(tdObj);
    let path = TodoListDirectoryPath+'/'+uuidStr+'.json';
    RNFS.writeFile(path,tdJson,'utf8')
      .then((success) => {
        alert(path);
        console.log('FILE WRITTEN!');
      })
      .catch((err) => {
        alert(err.message);
        console.log(err.message);
      });
    //云同步

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
   * 单日完成的直接删除
   * 每日完成的修改状态
   * 并云同步
   */


}