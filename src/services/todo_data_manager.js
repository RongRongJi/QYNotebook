import Todo_Dao from './todo';
import { compareDate, getToday } from '../utils/date';

export default class TodoDataManager{

  constructor(props){
    console.log(global.todoDao);
    if(!global.todoDao){
      global.todoDao = new Todo_Dao();
    }
  }

  getInitData(){
    var p = new Promise(function(resolve, reject){
      global.todoDao.getTodo().then((ret)=>{
        let allData = ret;
        let todayTd=[],doneTd=[],waitTd=[];
        for(var i=0;i<allData.length;i++){
          if(allData[i].type=='everyday' && allData[i].date!=getToday()){
            allData[i].status='wait-to-do';
          }
          if(allData[i].type=='everyday' && allData[i].status=='wait-to-do') {
            todayTd.push(allData[i]);
            global.todoDao.todayTd=todayTd;
          }
          else if(allData[i].type=='everyday') {
            doneTd.push(allData[i]);
            global.todoDao.doneTd=doneTd;
          }
          else if(allData[i].status=='wait-to-do' && compareDate(allData[i].date)) {
            todayTd.push(allData[i]);
            global.todoDao.todayTd=todayTd;
          }
          else if(allData[i].status=='wait-to-do') {
            waitTd.push(allData[i]);
            global.todoDao.waitTd=waitTd;
          }
          else {
            doneTd.push(allData[i]);
            global.todoDao.doneTd=doneTd;
          }
        }
        global.todoDao.init=true;
        resolve(true);
      });
    });
    return p;
  }
      

}