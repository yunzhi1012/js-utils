```
1.index.html input标签上传文件
2.index.html 导入main.js,计算上传所需时间
3.main.js 导入cutFile.js,实现文件分片功能
4.cutFile.js 导入worker.js 实现多线程分片
    4.1 定义分片大小和线程数
    4.2 计算总分片数量和每个线程数分配的分片数量
    4.3 在主线程新建结果数组,循环线程,计算每个线程分配到的分片起始和结束下标,通信传入分片所需信息,监听回传的分片结果数组,循环该线程的分片任务,将每个线程的结果按下标填入结果数组,终止线程,当前线程完成时count++,count == 线程数 时reslove结果数组
5.worker.js 导入createChunk.js,定义proms结果数组,监听传入循环异步创造分片塞入proms,等待所有分片创建完成,通信传回
6.createChunk.js 导入sparkmd5.js,异步返回一个promise,计算一个分片的起始和结束位置下标,新建spark实例和文件读取实例,切片分割文件,监听文件加载,spark追加哈希值,reslove改分片的消息(start,end,index,hash)
```

