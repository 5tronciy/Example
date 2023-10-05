({
  name: 'Static server test',
  options: {},

  async run(t) {
    const tasks = [
      { url: '/', status: 200, size: 2099 },
      { url: '/console.js', size: 14366 },
      { url: '/unknown', status: 404, size: 113 },
      { url: '/unknown.png', status: 404, size: 113 },
      { url: '/unknown/unknown', status: 404 },
      { url: '/unknown/unknown.png', status: 404 },
      { url: '/article', size: 141 },
      { url: '/article/file.txt', size: 28 },
      { url: '/article/name', size: 141 },
    ];

    await t.test('Get static resources', async () => {
      for (const task of tasks) {
        const url = `http://127.0.0.1:8000${task.url}`;
        const response = await fetch(url);
        const { status = 200, size } = task;
        const msg = `${url} status: ${response.status} expected: ${status}`;
        node.assert.strictEqual(response.status, status, msg);
        if (size) {
          const data = await response.blob();
          const msg = `${url} size: ${data.size} expected: ${size}`;
          node.assert.strictEqual(data.size, size, msg);
        }
      }
    });
  },
});
