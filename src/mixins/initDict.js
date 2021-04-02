import { getDictList } from '@/api/base'

export default {
  data() {
    return {
      dicts: {}
    }
  },
  methods: {
    async getThisDict(codeList) {
      getDictList(codeList).then(res=>{
        codeList.forEach(code=>{
          this.$set(this.dicts,code,res.data[code]);
        })
      })
    }
  }
}
