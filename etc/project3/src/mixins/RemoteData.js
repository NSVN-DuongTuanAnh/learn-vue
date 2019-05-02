export default function (resourses) {
  return {
    data() {
      let initData = {
        remoteDataLoading: 0
      }
      initData.remoteErrors = {};
      for (const key in resourses) {
        initData[key] = null;
        initData.remoteErrors[key] = null;
      }

      return initData;
    },
    methods: {
      async fetchResource(key, url) {
        this.$data.remoteDataLoading++;
        try {
          this.$data[key] = await this.$fetch(url)
        } catch (e) {
          this.$data.remoteErrors[key] = e;

        }
        this.$data.remoteDataLoading--
      }
    },
    computed: {
      remoteDataBusy() {
        return this.$data.remoteDataLoading !== 0;
      },
      hasRemoteErrors() {
        return Object.keys(this.$data.remoteErrors).some(
          key => this.$data.remoteErrors[key]
        )
      }
    },
    created() {
      for (const key in resourses) {
        let url = resourses[key];
        this.fetchResource(key, url);
      }
    },
  }

}
