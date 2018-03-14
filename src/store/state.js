import {playMode} from 'common/js/config'

const state = {
  singer: {},

  // 是否播放
  playing: false,

  // 是否全屏
  fullScreen: false,

  // 播放列表
  playlist: [],

  // 顺序列表
  sequenceList: [],

  // 播放模式
  mode: playMode.sequence,

  // 当前播放歌曲索引
  currentIndex: -1
}

export default state