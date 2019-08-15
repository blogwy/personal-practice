var vm = new Vue({
  el: '#app',
  data: {
    rules1: [
      { required: true,message: "不能为空",trigger: "blur" },
      { message: "请输入5~16的数字!",min: 5,max: 16,trigger: "input" }
    ],
    // 侧边菜单项
    secondIndex: 1,
    thirdIndex: 0,
    // 侧边菜单是否展开
    sidebarStatus: true,
    // 原料列表,供应商列表,绑定的供应商列表
    supplierList: [],
    materialList: [],
    bindSupplierList: [],
    // 当前选中的原料
    currentMaterial: {
      "id": null,
      "sapNo": null,
      "materialName": null,
      "packaging": null,
      "spec": null,
      "expirePeriod": null,
      "expireUnit": null,
      "storage": null,
      "isAllergen":null,
      "allergenDesp": null,
      "lowstorageLimit": null,
      "peroidLimit": null
    },
    // 添加的原料
    addMaterialData: {
      "sapNo": '',
      "materialName": '',
      "packaging": '',
      "spec": '',
      "expirePeriod": '',
      "expireUnit": '',
      "storage": '',
      "isAllergen": '',
      "allergenDesp": '',
      "lowstorageLimit": '',
      "peroidLimit": ''
    },
    // 要添加的供应商名字
    supplierName: '',
    // 添加供应商msg-box
    supplierBoxVisible: false,
    // 添加原料的msg-box
    materialBoxVisible: false,
    // 修改原料的msg-box
    editMaterialBoxVisible: false,
    // 绑定供应商的msg-box
    supplierBindBoxVisible: false,
    // 当前侧边菜单标题
    menuFirst: null,
    menuSecond: null,
    // 当前tab
    currentTab: 0,
    // 当前绑定供应商的原料名称 id
    materialNameBind: '',
    materialId: '',
    supplierId: '',
    // 绑定供应商的规格包装
    packagingBind: '',
    specBind: ''
  },
  methods:{
    openBindSupplier(index){
      this.getBindSupplierList(this.materialList[index].id);
      this.getSupplierList();
      this.materialNameBind = this.materialList[index].materialName;
      this.materialId = this.materialList[index].id;
      this.supplierBindBoxVisible = true;
    },
    addBindSupplier(){
      let _this = this;
      Alert({
        title: '提示',
        content: '确认要绑定供应商吗？',
        showCancelButton: true,
        showModel: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelCallback(){
          console.log('点击了no');
        },
        confirmCallback(){
          console.log('点击了ok');
          Common.request({
            prefix: true,
            suffix: true,
            url: '/material/supplier/add',
            method: 'post',
            data: {
              "materialId": _this.materialId,
              "supplierId": _this.supplierId,
              "packaging": _this.packagingBind,
              "spec": _this.specBind
            },
            success: function (res) {
              Alert({
                title: '提示',
                content: '供应商绑定成功',
                showCancelButton: false,
                showModel: false,
                confirmButtonText: '确定',
                cancelButtonText: 'no',
                cancelCallback(){
                  console.log('点击了no');
                },
                confirmCallback(){
                  console.log('点击了ok');
                  _this.specBind = '';
                  _this.packagingBind = '';
                  _this.specBind = '';
                  _this.getBindSupplierList(_this.materialId);
                }
              });
            },
            error: function (err) {
              console.log(err);
            }
          })
        }
      });
    },
    getBindSupplierList(materialId){
      let _this = this;
      Common.request({
        prefix: true,
        suffix: true,
        url: '/material/supplier/list/' + materialId,
        method: 'get',
        success: function (res) {
          console.log(res);
          _this.bindSupplierList = res.data;
        },
        error: function (err) {
          console.log(err);
        }
      })
    },
    delBindSupplier(supplierId){
      let _this = this;
      Alert({
        title: '提示',
        content: '确定要删除绑定的供应商吗？',
        showCancelButton: false,
        showModel: false,
        confirmButtonText: '确定',
        cancelButtonText: 'no',
        cancelCallback(){
          console.log('点击了no');
        },
        confirmCallback(){
          console.log('点击了ok');
          Common.request({
            prefix: true,
            suffix: true,
            url: `/material/supplier/delete?materialId=${_this.materialId}&supplierId=${supplierId}`,
            method: 'get',
            success: function (res) {
              Alert({
                title: '提示',
                content: '绑定的供应商删除成功',
                showCancelButton: false,
                showModel: false,
                confirmButtonText: '确定',
                cancelButtonText: 'no',
                cancelCallback(){
                  console.log('点击了no');
                },
                confirmCallback(){
                  console.log('点击了ok');
                  _this.getBindSupplierList(_this.materialId);
                }
              });
            },
            error: function (err) {
              console.log(err);
            }
          })
        }
      });
    },
    selectTab(res){
      this.currentTab = res;
    },
    getCurrentMenu(res){
      console.log(res);
      this.menuFirst = res.menuFirst;
      this.menuSecond = res.menuSecond;
    },
    getSidebarStatus(res){
      console.log(res);
      this.sidebarStatus = res;
    },
    editMaterialBoxConfirm(res){
      // 提交编辑
      let _this = this;
      Common.request({
        prefix: true,
        suffix: true,
        url: '/material/edit',
        method: 'post',
        data: _this.currentMaterial,
        success: function (res) {
          console.log(res);
          _this.editMaterialBoxVisible = false;
          Alert({
            title: '提示',
            content: '原料编辑成功',
            showCancelButton: false,
            confirmButtonText: '确定',
            cancelButtonText: 'no',
            cancelCallback(){
              console.log('点击了no');
            },
            confirmCallback(){
              console.log('点击了ok');
              _this.getMaterialList();
            }
          });
        },
        error: function (err) {
          console.log(err);
        }
      })
    },
    materialBoxConfirm(res){
      console.log(res);
      this.addMaterial();
      this.materialBoxVisible = false;
    },
    boxConfirm(res){
      console.log(res);
      this.addSupplier();
      this.supplierBoxVisible = false;
    },
    getMaterialList(){
      let _this = this;
      Common.request({
        prefix: true,
        suffix: true,
        url: '/material/list',
        method: 'get',
        success: function (res) {
          console.log(res);
          _this.materialList = res.data;
        },
        error: function (err) {
          console.log(err);
        }
      })
    },
    getSupplierList(){
      let _this = this;
      Common.request({
        prefix: true,
        suffix: true,
        url: '/supplier/list',
        method: 'get',
        success: function (res) {
          console.log(res);
          _this.supplierList = res.data;
        },
        error: function (err) {
          console.log(err);
        }
      })

    },
    addMaterial(){
      let _this = this;
      Common.request({
        prefix: true,
        suffix: true,
        url: '/material/add',
        method: 'post',
        data: _this.addMaterialData,
        success: function (res) {
          console.log(res);
          Alert({
            title: '提示',
            content: '原料添加成功',
            showCancelButton: false,
            confirmButtonText: '确定',
            cancelButtonText: 'no',
            cancelCallback(){
              console.log('点击了no');
            },
            confirmCallback(){
              console.log('点击了ok');
              _this.getMaterialList();
            }
          });
        },
        error: function (err) {
          console.log(err);
        }
      })
    },
    editMaterial(index){
      this.currentMaterial = this.materialList[index];
      if (this.editMaterialBoxVisible){
        this.editMaterialBoxVisible = false
      }else {
        this.editMaterialBoxVisible = true
      }
    },
    delMaterial(id){
      let _this = this;
      Alert({
        title: '提示',
        content: '确定要删除当前数据吗？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelCallback(){
          console.log('点击了no');
        },
        confirmCallback(){
          console.log('点击了ok');
          Common.request({
            prefix: true,
            suffix: true,
            url: '/material/delete/' + id,
            method: 'get',
            success: function (res) {
              console.log(res);
              Alert({
                title: '提示',
                content: '原料删除成功',
                showCancelButton: false,
                confirmButtonText: '确定',
                cancelButtonText: 'no',
                cancelCallback(){
                  console.log('点击了no');
                },
                confirmCallback(){
                  console.log('点击了ok');
                  _this.getMaterialList();
                }
              });
            },
            error: function (err) {
              console.log(err);
            }
          })
        }
      });
    },
    delSupplier(id){
      let _this = this;
      Alert({
        title: '提示',
        content: '确定要删除当前数据吗？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        cancelCallback(){
          console.log('点击了no');
        },
        confirmCallback(){
          console.log('点击了ok');
          Common.request({
            prefix: true,
            suffix: true,
            url: '/supplier/delete/' + id,
            method: 'get',
            success: function (res) {
              console.log(res);
              Alert({
                title: '提示',
                content: '供应商删除成功',
                showCancelButton: false,
                confirmButtonText: '确定',
                cancelButtonText: 'no',
                cancelCallback(){
                  console.log('点击了no');
                },
                confirmCallback(){
                  console.log('点击了ok');
                  _this.getSupplierList();
                }
              });
            },
            error: function (err) {
              console.log(err);
            }
          })
        }
      });
    },
    addSupplier(){
      let _this = this;
      if (this.supplierName){
        Common.request({
          prefix: true,
          suffix: true,
          url: '/supplier/add',
          method: 'post',
          data: {
            "supplierName": this.supplierName
          },
          success: function (res) {
            console.log(res);
            _this.supplierName = '';
            Alert({
              title: '提示',
              content: '供应商添加成功',
              showCancelButton: false,
              confirmButtonText: '确定',
              cancelButtonText: 'no',
              cancelCallback(){
                console.log('点击了no');
              },
              confirmCallback(){
                console.log('点击了ok');
                _this.getSupplierList();
              }
            });
          },
          error: function (err) {
            console.log(err);
          }
        })
      }else {
        Alert({
          title: '提示',
          content: '请填写供应商名字',
          showCancelButton: false,
          confirmButtonText: '确定',
          cancelButtonText: 'no',
          cancelCallback(){
            console.log('点击了no');
          },
          confirmCallback(){
            console.log('点击了ok');
          }
        });
      }
    },
    openAddSupplierModel(){
      if (this.supplierBoxVisible){
        this.supplierBoxVisible = false
      }else {
        this.supplierBoxVisible = true
      }
    },
    openAddMaterialModel(){
      if (this.materialBoxVisible){
        this.materialBoxVisible = false
      }else {
        // 清除数据
        this.addMaterialData = {
          "sapNo": '',
          "materialName": '',
          "packaging": '',
          "spec": '',
          "expirePeriod": '',
          "expireUnit": '',
          "storage": '',
          "isAllergen": '',
          "allergenDesp": '',
          "lowstorageLimit": '',
          "peroidLimit": ''
        };
        this.materialBoxVisible = true;
      }
    }
  },
  filters:{
    handleStorage1(value){
      var val = value.split('-');
      return val[0];
    },
    handleStorage2(value){
      var val = value.split('-');
      return val[1];
    }
  },
  watch: {
    currentTab(curVal,oldVal){
      if (curVal === 0){
        // 获取原料
        this.getMaterialList();
      }
      if (curVal === 1){
        //获取供应商
        this.getSupplierList();
      }
    }
  },
  mounted(){
    if (this.currentTab === 0){
      // 获取原料
      this.getMaterialList();
    }
    if (this.currentTab === 1){
      //获取供应商
      this.getSupplierList();
    }
  }
});