export default {
    getUserStorage: state => {
      if(!state.user) {
        state.user = localStorage.user ? JSON.parse(localStorage.user) : ''
      }
      return state.user
    },
    getMessStorage: state => {
      if(!state.Message) {
        state.Message = localStorage.message ? JSON.parse(localStorage.message) : ''
      }
      localStorage.message = state.Message ? JSON.stringify(state.Message) : ''
      return state.Message
    }
}
