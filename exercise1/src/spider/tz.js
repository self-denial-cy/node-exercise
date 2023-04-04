const axios = require('axios').default;
const path = require('path');
const fs = require('fs');

(async () => {
  // 获取首页推荐歌单
  const fetchSongSheet = async () => {
    try {
      const { data } = await axios.get('https://tonzhon.com/api/playlist_recommendations');
      return data;
    } catch (err) {
      console.log(err, 1);
    }
  };

  // 根据歌单获取歌曲列表
  const fetchSongsBySheet = async (sheetId) => {
    try {
      const { data } = await axios.get(`https://tonzhon.com/api/playlists/${sheetId}`);
      return data;
    } catch (err) {
      console.log(err, 2);
    }
  };

  // 根据不同平台获取音频链接
  const fetchSong = async (platform, id) => {
    try {
      const { data } = await axios.get(`https://music-api.tonzhon.com/song_source/${platform}/${id}`);
      return data;
    } catch (err) {
      console.log(err, 3);
    }
  };

  // 延时器，避免请求太频繁，给人网站搞崩溃
  const sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  // 正则匹配合法文件名
  const validate = (filename) => {
    const reg = new RegExp(
      '(?!((^(con)$)|^(con)..*|(^(prn)$)|^(prn)..*|(^(aux)$)|^(aux)..*|(^(nul)$)|^(nul)..*|(^(com)[1-9]$)|^(com)[1-9]..*|(^(lpt)[1-9]$)|^(lpt)[1-9]..*)|^s+|.*s$)(^[^\\/:*?"<>|]{1,255}$)'
    );
    return reg.test(filename);
  };

  // 根据音频链接下载
  const download = (url, name, ext) => {
    return new Promise((resolve) => {
      axios
        .get(url, { responseType: 'stream' })
        .then(({ data }) => {
          const filename = `${name}${ext}`;
          if (!validate(filename)) return resolve(false);
          const ws = fs.createWriteStream(path.join(__dirname, './audios', filename));
          data.pipe(ws);
          console.log(`${filename} 下载中...`, 4);
          ws.on('finish', () => {
            resolve(filename);
          });
          ws.on('error', () => {
            resolve(false);
          });
        })
        .catch(() => {
          resolve(false);
        });
    });
  };

  // 入口方法
  const main = async (total) => {
    try {
      let index = 0;
      const sheets = await fetchSongSheet();
      if (!sheets) return;
      if (sheets.success) {
        const playlists = sheets.playlists || [];
        for (const item of playlists) {
          if (index === total) break;
          await sleep(500);
          const sheet = await fetchSongsBySheet(item.id);
          if (!sheet) return;
          if (sheet.success) {
            const playlist = sheet.playlist || {};
            const songs = playlist.songs || [];
            for (const song of songs) {
              if (index === total) break;
              await sleep(250);
              const source = await fetchSong(song.platform, song.originalId);
              if (!source) return;
              if (source.success) {
                const data = source.data || {};
                const songSource = data.songSource || '';
                if (songSource) {
                  const ext = path.parse(new URL(songSource).pathname).ext;
                  await sleep(150);
                  const filename = await download(songSource, song.name, ext);
                  if (filename) {
                    console.log(`${filename} 下载成功`, 5);
                    index++; // TODO 下载成功数卡控有点问题，Bug 待解决
                  } else {
                    console.log(`${filename} 下载失败`, 5);
                  }
                }
              }
            }
          }
        }
      }
    } catch (err) {
      console.log(err, 6);
    }
  };

  // 执行
  main(100);
})();
