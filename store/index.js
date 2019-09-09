// import base from './modules/base'

export const state = () => ({
  map: null,
  watchHandle: null,
  camera: {
    position: {
      x: -9177356,
      y: 4246783,
      z: 723,
      spatialReference: {
        wkid: 3857
      }
    },
    heading: 0,
    tilt: 83
  }
})

export const mutations = {
  initWatchHandle (state, obj) {
    state.watchHandle = obj
  },
  removeatchHandle (state) {
    if (state.watchHandle) {
      state.watchHandle.remove()
    }
  },
  initCamera (state, obj) {
    state.camera = obj
  },
  initMap (state, obj) {
    state.map = obj
  }
}

// export const modules = {
//   base
// }
