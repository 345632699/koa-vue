<template>
  <div class="proj-logs">
  </div>

</template>

<script>
export default {
  data () {
    return {
      name: null,
      region: null,
      engineering: null,
      projectType: null,
      projectDetail: null,
      spongeDetail: null,
      projectArea: null,
      spongeArea: null,
      executant: null,
      operateType: null,
      institution: null,
      coordinates: null,
      contactName: null,
      contactPhone: null,
      investmentSum: null,
      investmentLocal: null,
      investmentSocial: null,
      investmentSponge: null,
      investmentApprovalDocs: [
        {name: '投资批复文件.docx'},
        {name: '项目立项及批复文件.rar'}
      ],
      subProjects: [
        {
          projectType: '建筑小区',
          name: '子项目一'
        },
        {
          projectType: '道路广场',
          name: '子项目二'
        },
        {
          isBlank: true
        }
      ],
      regions: [
        {id: 1, name: '福田区'},
        {id: 2, name: '南山区'},
        {id: 3, name: '宝安区'},
        {id: 4, name: '罗湖区'}
      ],
      institutions: [
        {id: 1, name: '市海绵办'},
        {id: 2, name: '水务局'},
        {id: 3, name: '住建局'}
      ],
      projectTypes: [
        {id: 1, name: '建筑小区'},
        {id: 2, name: '道路广场'},
        {id: 3, name: '公园绿地'}
      ],
      engineerings: [
        {id: 1, name: '市政线性工程'},
        {id: 2, name: '水利类'}
      ]
    }
  },

  created () {
  },

  methods: {
    tableHeaderStyle ({row, rowIndex}) {
      return {
        fontSize: '14px',
        color: '#1f2d3d',
        backgroundColor: '#eefef6'
      }
    },

    onEnter () {
      console.log('onEnter...logs')
    },

    onSave () {
      this.$router.push('/ProjectManager/ProjectList')
    },

    onReturn () {
      this.$router.push('/ProjectManager/ProjectList')
    },

    onUploadApprovalDoc () {

    },

    handleAddSubProject (index, row) {
    },

    handleDeleteSubProject (index, row) {
    }
  }
}
</script>


<style scoped>

.proj-add {
  overflow-y: auto;
  width: 100%;
  height: 100%;
}

.proj-add .element-btn {
  margin-left: 8px;
  margin-right: 8px;
}

.proj-add .proj-navigator {
  margin: 30px;
  color: #888;
}

.proj-add .header-container {
  background-color:#fff;
  height: 60px;
}

.proj-add .project-container {
  background-color:#eee;
  margin:20px;
  padding:20px;
}

.proj-add .project-form {
  background-color: #fff;
  padding: 20px;
  margin: 20px;
  max-width: 880px;
  overflow: auto;
}

.proj-add .project-form-header {
  font-size: 16px;
  color: #1f2d3d;
  padding: 10px;
}

.proj-add .form-input-number {
  max-width:120px;
}

.proj-add .project-table {
  margin-top: 20px;
  margin-bottom: 40px;
  width: 100%;
}

/* .proj-add .project-table-header {
  font-size: '14px';
  color: '#1f2d3d';
  background-color: '#eefef6';
} */

.proj-add .edit {
  color: #20a0ff;
  cursor: pointer;
}

.proj-add .delete {
  color: red;
  cursor: pointer;
}

.proj-add .footer-container {
  margin: 40px;
}

.div-right {
  display: inline-block;
  position: absolute;
  right: 20px;
}

/*要求父元素为 position: relative*/
.div-middle {
  position:absolute;
  top:50%;
  transform:translate(0,-50%);
}

.show-inline {
  display: inline-block;
}

</style>
