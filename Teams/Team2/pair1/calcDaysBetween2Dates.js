const {readCSVFileSync}=require("../../../CSV/readCSVSync")

const calcDays=(date1,date2,symbol)=>
{
    date1=new Date(date1);
    date2=new Date(date2)
 let arr=readCSVFileSync(`../${symbol}.csv`);
 let cnt=0;
 cnt=arr.reduce((acc,val)=>{
    if(val.Date.getTime()>=date1.getTime()&&val.Date.getTime()<=date2.getTime())
        acc+=1;
        return acc;
   
 },0)
 return cnt
}
module.exports=calcDays

