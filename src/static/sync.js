storage.sync = {
  // sync方法的名字必须和所存数据的key完全相同
  // 参数从params中解构取出
  // 最后返回所需数据或一个promise
  async user(params) {
    const {
      id,
      syncParams: { extraFetchOptions, someFlag }
    } = params;
    const response = await fetch('user/?id=' + id, {
      ...extraFetchOptions
    });
    const responseText = await response.text();
    console.log(`user${id} sync resp: `, responseText);
    const json = JSON.parse(responseText);
    if (json && json.user) {
      storage.save({
        key: 'user',
        id,
        data: json.user
      });
      if (someFlag) {
        // 根据一些自定义标志变量操作
      }
      // 返回所需数据
      return json.user;
    } else {
      // 出错时抛出异常
      throw new Error(`error syncing user${id}`);
    }
  }
};