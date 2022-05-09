<template>
  <div class="" id="app">
    <a-table :pagination="pagination" :dataSource="msgList" :columns="columns" :row-key="record => record.msgId" :scroll="{ x: 1200, y: 450 }" :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }">
      <span slot="index" slot-scope="text, record" v-for="(item, index) in msgList">{{ index }}</span>
      <!-- <template slot="order" slot-scope="text">{{ text }}</template> -->
      <template slot="messagetitle" slot-scope="text"><a :href="href" @click="texthref(text)">{{ text }}</a></template>
      <span slot="open"><a-switch default-checked @change="onChange" /></span>
      <span slot="action" slot-scope="text, record">
        <a-popconfirm placement="topLeft" ok-text="Yes" cancel-text="No" @confirm="deleteMsg(text.msgId)">
          <template slot="title">
            <p>您确定要删除吗？</p>
          </template>
          <a-icon type="delete" theme='twoTone' twoToneColor='#1890FF'></a-icon>
        </a-popconfirm>
        <a-divider type="vertical"></a-divider>
        <a-popconfirm placement="topLeft" ok-text="Yes" cancel-text="No" @confirm="editMsg(text.msgId)">
          <template slot="title">
            <p>您确定要去编辑吗？</p>
          </template>
          <a-icon type="edit" theme='twoTone' twoToneColor='#1890FF'></a-icon>
        </a-popconfirm>
      </span>
    </a-table>
  </div>
</template>
<script>
import { getSelfMsg, delMsg } from '@/axios/api/message'
const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    key: 'index',
    align: 'center',
    scopedSlots: { customRender: 'index' }
  },
  {
    title: '文章',
    dataIndex: 'msgTitle',
    key: 'msgTitle',
    width: 240,
    align: 'center',
    scopedSlots: { customRender: 'messagetitle' },
    fixed: 'left'
  },
  {
    title: '作者',
    dataIndex: 'username',
    key: 'username',
    width: 240,
    align: 'center'
  },
  {
    title: '发布时间',
    dataIndex: 'msgDate',
    width: 260,
    key: 'msgDate',
    align: 'center'
  },
  {
    title: '是否公开',
    dataIndex: 'open',
    key: 'open',
    align: 'center',
    scopedSlots: { customRender: 'open' }
  },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 160,
    align: 'center',
    scopedSlots: { customRender: 'action' }
  }
]
// #region
// const data = [
//   {
//     key: '1',
//     message: '《赤壁赋》',
//     date: '2021-11-12'
//   },
//   {
//     key: '2',
//     message: '《离骚》',
//     date: '2022-01-01'
//   },
//   {
//     key: '3',
//     message: '《春晓》',
//     date: '2022-01-02'
//   },
//   {
//     key: '4',
//     message: '《阿房宫赋》',
//     date: '2021-08-09'
//   },
//   {
//     key: '5',
//     message: '《阿房宫赋》',
//     date: '2021-08-09'
//   },
//   {
//     key: '6',
//     message: '《阿房宫赋》',
//     date: '2021-08-09'
//   },
//   {
//     key: '7',
//     message: '《阿房宫赋》',
//     date: '2021-08-09'
//   },
//   {
//     key: '8',
//     message: '《阿房宫赋》',
//     date: '2021-08-09'
//   },
//   {
//     key: '9',
//     message: '《阿房宫赋》',
//     date: '2021-08-09'
//   },
//   {
//     key: '10',
//     message: '《阿房宫赋》',
//     date: '2021-08-09'
//   },
//   {
//     key: '11',
//     message: '《阿房宫赋》',
//     date: '2021-08-09'
//   },
// ]
// #endregion
export default {
  name: "message",
  data () {
    return {
      msgList: [],
      columns,
      total: () => {
        return this.msgList.length
      },
      pagination: {
      size: 'small',
      defaultPageSize: 5,
      pageSize: 10,
      showTotal: total => {
        return "共" + this.total() + "条"
      },
      style: {
        background: '#fff',
        width: '100%',
        margin: '0',
        display: 'flex',
        justifyContent: 'end',
        padding: '10px'
      }
      },
      selectedRowKeys: [],
      href: 'javascript:;'
  }
},
created() {
  this.getSelfMsg()
},
methods: {
  async getSelfMsg() {
    let userId = this.$store.state.useruuid
    let { data } = await getSelfMsg({ userId })
    this.msgList = data
  },
  onSelectChange(selectedRowKeys, selectedRows) {
    console.log(selectedRowKeys, selectedRows)
    this.selectedRowKeys = selectedRowKeys
  },
  async deleteMsg(msgId) {
    let data = await delMsg({ msgId })
    if(data) {
      this.$message.success('删除成功~')
      this.getSelfMsg()
    }
  },
  editMsg(msgId) {
    if(msgId) {
      this.$router.push({path: '/writeMessage', query: { msgId }})
    }
  },
  onChange(checked) {
      console.log(`a-switch to ${checked}`)
  },
  texthref(item) {
  }
}
}
</script>

<style scoped>
#app {
  background-color: #fff;
}
table {
  overflow: hidden;
}
</style>
