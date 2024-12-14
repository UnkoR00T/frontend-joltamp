import axios from 'axios'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const dataProfileInfo = defineStore({
  id: 'userInfo',
  state: () => ({
    profile: {}
  }),
  actions: {
    async refreshProfileInfo() {
      const router = useRouter()

      axios
        .get(
          `${import.meta.env.VITE_BACKEND_ADDRESS}/users/getInfo/${localStorage.getItem('userId')}`
        )
        .then((res) => {
          if (res.status == 200) {
            this.profile = res.data;
          }
        })
        .catch((err) => {
          console.log(err)
          localStorage.removeItem('jwt')
          localStorage.removeItem('userId')
          router.push('/login')
        })
    },

    async getProfileInfo() {
      if (!this.profile || Object.keys(this.profile).length === 0) {
        this.refreshProfileInfo();
      }
    }
  }
})
