<template>
  <div>
    <div>
      <ul class="flex-box flex-wrap">
        <label>
          <li class="add item" title="点击上传文件">+</li>
          <input type="file" v-show="false" multiple @change="filechange">
        </label>
        <li class="item" v-for="(item, index) in imgBlobArr">
          <img class="img" :src="item.src" alt="">
          <div class="close" @click="del(index)">X</div>
          <div class="progress tips-text">{{item.msg}}</div>
          <div class="progress">
            <div class="progress-inner" :style="`width: ${item.uploadProgress}%;`"></div>
          </div>
        </li>
      </ul>
    </div>
    <button v-show="imgArr.length > 0" @click="submit">确认完毕，提交</button>
  </div>
</template>

<script>
  export default {
    name: "imgupload",
    data() {
      return {
        imgArr: [],
        imgBlobArr: [],
        uploadProgress: '0'
      }
    },
    computed: {},
    // computed: {
    //   imgBlobArr() {
    //     let result = [];
    //     let promiseall = this.imgArr.map(async item => {
    //       let reader = new FileReader();
    //       reader.readAsDataURL(item);
    //       return await new Promise(resolve => {
    //         reader.onload = () => {
    //           resolve({src: reader.result});
    //         }
    //       });
    //     });
    //     Promise.all(promiseall).then(res => {
    //       console.log(res)
    //     })
    //     console.log(result)
    //     return result;
    //   }
    // },
    methods: {
      filechange(e) {
        let files = e.currentTarget.files;
        let filesArr = Array.from(files);
        this.imgArr = filesArr;

        this.imgBlobArr = this.imgArr.map(item =>
          ({
            src: URL.createObjectURL(item),
            uploadProgress: 0,
            msg: ''
          })
        )
      },
      del(index) {
        this.imgBlobArr.splice(index, 1);
        this.imgArr.splice(index, 1);
      },
      submit() {
        let _this = this;
        this.imgArr.forEach((item, index) => {
          let formData = new FormData();
          formData.append('file', item);

          this.$axios.post('/api/uploadimg', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            onUploadProgress(progressEvent) {
              if (progressEvent.lengthComputable) {
                let total = progressEvent.total;
                let loaded = progressEvent.loaded;
                let percentage = loaded / total;
                _this.imgBlobArr[index].uploadProgress = percentage * 100;
              }
            }
          }).then(res => {
            if (res.status === 200) {
              _this.imgBlobArr[index].msg = res.data.msg
            }
          });
        });
        console.log(this.imgBlobArr);
      }
    }
  }
</script>

<style scoped>
  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style-type: none;
  }

  .flex-box {
    display: flex;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .justify-content-center {
    justify-content: center;
  }

  .align-items-center {
    align-items: center;
  }

  .img {
    width: 300px;
    height: 200px;
    object-fit: contain;
    border: 3px solid #ccc;
    border-radius: 15px;
  }

  .item {
    margin: 0 10px 10px 0;
    position: relative;
  }

  .add {
    width: 300px;
    height: 200px;
    line-height: 200px;
    font-size: 155px;
    border: 1px solid #ccc;
    border-radius: 15px;

  }

  .close {
    position: absolute;
    top: -10px;
    right: -10px;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border: 3px solid #c0ccda;
    border-radius: 50%;
    font-size: 20px;
    background-color: #c0ccda;
    color: #fff;
    cursor: pointer;
    z-index: 1;
  }

  .close:hover {
    background-color: transparent;
    color: #ccc;
  }

  .progress {
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 80%;
    height: 8px;
    overflow: hidden;
  }

  .progress-inner {
    width: 0%;
    height: 100%;
    background-color: greenyellow;
  }

  .tips-text {
    height: auto;
    bottom: 20px;
    color: red;
  }
</style>
