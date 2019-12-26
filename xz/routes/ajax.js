const express=require('express');//引入连接池模块

const pool=require('../pool.js');
let router=express.Router();//创建路由器对象
//挂载路由127.0.0.1:8080/ajax/text
router.get('/text',(req,res)=>{
 console.log('成功接收请求');
 res.send('第一个ajax应用');
});

router.get('/myajax',(req,res)=>{
   console.log('周杰伦');
   res.send('跳起来打你膝盖');
})

router.get('/bobo',(req,res)=>{
  console.log('本田');
  res.send('无敌的人类');
});
//原生http get带参数
router.get('/login_http',(req,res)=>{
   var $uname=req.query.uname;
   var $upwd=req.query.upwd;
  if(!$uname){
    res.send('-1');
	return;
  }
    if(!$upwd){
	  res.send('-1');
	  return;
	}
	//res.send($uname+'~~~'+$upwd); //查询数据
	var sql='SELECT * FROM xz_user WHERE uname=? AND upwd=?';
	pool.query(sql,[$uname,$upwd],(err,result)=>{
	 if(err)throw err;
	 if(result.length>0){
	        res.send('1');
	 }else{
	  res.send('0');
	 }
	});
});

module.exports=router;//导出路由器对象
















