const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
let router=express.Router();//创建路由器对象
//挂载路由
//1.注册用户  方法  post      /reg
router.post('/reg',(req,res)=>{

	let obj=req.body;	//1.1获取数据
     //1.2验证各项数据是否为空
if(!obj.uname){res.send({code:401,msg:'uname required'})
	return;}//阻止往后执行
if(!obj.upwd){res.send({code:402,msg:'upwd required'})
	return;}
if(!obj.email){res.send({code:403,msg:'email required'})
	return;}
if(!obj.phone){res.send({code:404,msg:'phone required'})
	return;}
//1.3执行SQL语句
pool.query('INSERT INTO xz_user SET?',[obj],(err,result)=>{
 if(err)throw err;
 console.log(result);
 //如果数据插入成功,响应对象
 if(result.affectedRows>0){
  res.send({code:200,msg:'register suc'})
 }
});
});

//2.用户登录  post    /login
router.post('/login',(req,res)=>{
    let obj=req.body  //2.1获取数据
	console.log(obj);
	//2.2验证是否为空
if(!obj.uname){res.send({code:401,msg:'uname required'})
		return;}
if(!obj.upwd){res.send({code:402,msg:'upwd required'})
	   return;}
   //2.3执行SQL语句
  pool.query('SELECT*FROM xz_user WHERE uname=? AND upwd=?',[obj.uname,obj.upwd],(err,result)=>{
  if(err)throw err;
  console.log(result);
  //因为返回的结果是数组,如果查询到了对应的用户,数组中会出现这条数据,否则返回空数组,就是查询不到数据,,,,就是登录失败
  if(result.length>0){
  res.send({code:200,msg:'login suc'})
  }else{
  res.send({code:301,msg:'login err'})
  }
  })
});

//3.检索用户   get     /detail
  router.get('/detail',(req,res)=>{
  let obj=req.query;//获取数据
//判断数据是否为空
if(!obj.uid){res.send({code:401,msg:'uid required'})
	  return;}
//3.3执行SQL语句
pool.query('SELECT uid,uname,email,phone FROM xz_user WHERE uid=?',[obj.uid],(err,result)=>{
if(err)throw err;
//console.log(result);
//如果数组长度大于0,检索到对应的用户,否则检索不到
if(result.length>0){
res.send({
	code:200,
	msg:'找到啦',
	data:result[0]
		});
}else{
 res.send({
    code:301,
	msg:'没有此数据'
 });
}
})
  });

//4.修改用户信息   get    /update
router.get('/update',(req,res)=>{
let obj=req.query; //4.1获取数据
//4.2验证数据是否为空
//遍历对象,访问每个属性,如果属性值为空,提升属性名那一项必须的
let i=400;//建立一个循环
for(let key in obj){
	i++;
if(!obj[key]){
	res.send({code:i,msg:key+'required'});
 return;
 }
  }
   pool.query('UPDATE xz_user SET ? WHERE uid=?',[obj,obj.uid],(err,result)=>{
     if(err) throw err;
	 if(result.affectedRows>0){
	 res.send({code:200,msg:'updatesuc'});
	 }else{res.send({code:301,msg:'updateerr'})}
   });

});

//5.用户列表 get   /list
router.get('/list',(req,res)=>{
 let  obj=req.query; //5.1获取数据
 //5.2验证是否为空
if(!obj.pno) obj.pno=1;
if(!obj.count) obj.count=2;
 console.log(obj);
 //5.3将count转微整形
 obj.count=parseInt(obj.count);
 //5.4计算start
 let start=(obj.pno-1)*obj.count;
//5.5执行SQL语句
pool.query('SELECT*FROM xz_user LIMIT ?,?',[start,obj.count],(err,result)=>{
 if(err) throw err;
 res.send({code:200,data:result});
});
});

module.exports=router;//导出路由器对象


















