"use strict";(self["webpackChunkforum_front_end_vue"]=self["webpackChunkforum_front_end_vue"]||[]).push([[549],{18609:function(t,e,r){r.d(e,{Z:function(){return g}});var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("form",{directives:[{name:"show",rawName:"v-show",value:!t.isLoading,expression:"!isLoading"}],on:{submit:function(e){return e.preventDefault(),e.stopPropagation(),t.handleSubmit.apply(null,arguments)}}},[r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"name"}},[t._v("Name")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.restaurant.name,expression:"restaurant.name"}],staticClass:"form-control",attrs:{id:"name",type:"text",name:"name",placeholder:"Enter name",required:""},domProps:{value:t.restaurant.name},on:{input:function(e){e.target.composing||t.$set(t.restaurant,"name",e.target.value)}}})]),r("div",{staticClass:"form-group mt-3"},[r("label",{attrs:{for:"categoryId"}},[t._v("Category")]),r("select",{directives:[{name:"model",rawName:"v-model",value:t.restaurant.categoryId,expression:"restaurant.categoryId"}],staticClass:"form-control",attrs:{id:"categoryId",name:"categoryId",required:""},on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.$set(t.restaurant,"categoryId",e.target.multiple?r:r[0])}}},[r("option",{attrs:{value:"",selected:"",disabled:""}},[t._v(" --請選擇-- ")]),t._l(t.categories,(function(e){return r("option",{key:e.id,domProps:{value:e.id}},[t._v(" "+t._s(e.name)+" ")])}))],2)]),r("div",{staticClass:"form-group mt-3"},[r("label",{attrs:{for:"tel"}},[t._v("Tel")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.restaurant.tel,expression:"restaurant.tel"}],staticClass:"form-control",attrs:{id:"tel",type:"text",name:"tel",placeholder:"Enter telephone number"},domProps:{value:t.restaurant.tel},on:{input:function(e){e.target.composing||t.$set(t.restaurant,"tel",e.target.value)}}})]),r("div",{staticClass:"form-group mt-3"},[r("label",{attrs:{for:"address"}},[t._v("Address")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.restaurant.address,expression:"restaurant.address"}],staticClass:"form-control",attrs:{id:"address",type:"text",placeholder:"Enter address",name:"address"},domProps:{value:t.restaurant.address},on:{input:function(e){e.target.composing||t.$set(t.restaurant,"address",e.target.value)}}})]),r("div",{staticClass:"form-group mt-3"},[r("label",{attrs:{for:"opening-hours"}},[t._v("Opening Hours")]),r("input",{directives:[{name:"model",rawName:"v-model",value:t.restaurant.openingHours,expression:"restaurant.openingHours"}],staticClass:"form-control",attrs:{id:"opening-hours",type:"time",name:"opening_hours"},domProps:{value:t.restaurant.openingHours},on:{input:function(e){e.target.composing||t.$set(t.restaurant,"openingHours",e.target.value)}}})]),r("div",{staticClass:"form-group mt-3"},[r("label",{attrs:{for:"description"}},[t._v("Description")]),r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.restaurant.description,expression:"restaurant.description"}],staticClass:"form-control",attrs:{id:"description",rows:"3",name:"description"},domProps:{value:t.restaurant.description},on:{input:function(e){e.target.composing||t.$set(t.restaurant,"description",e.target.value)}}})]),r("div",{staticClass:"form-group mt-3"},[r("label",{attrs:{for:"image"}},[t._v("Image")]),t.restaurant.image?r("img",{staticClass:"d-block img-thumbnail mb-3",attrs:{src:t.restaurant.image,width:"200",height:"200"}}):t._e(),r("input",{staticClass:"form-control-file",attrs:{id:"image",type:"file",name:"image",accept:"image/*"},on:{change:t.handleFileChange}})]),r("button",{staticClass:"btn btn-primary mt-4",attrs:{disabled:t.isProcessing,type:"submit"}},[t._v(" "+t._s(t.isProcessing?"處理中":"送出")+" ")])])},n=[],s=r(4367),i=r(67906),o=r(16198),u=(r(41539),r(78783),r(33948),r(60285),r(41637),r(68309),r(19032)),c=r(41926),l={props:{initialRestaurant:{type:Object,default:function(){return{name:"",categoryId:"",tel:"",address:"",description:"",image:"",openingHours:""}}},isProcessing:{type:Boolean,default:!1}},data:function(){return{restaurant:{},categories:[],isLoading:!0}},methods:{fetchCategories:function(){var t=this;return(0,o.Z)((0,i.Z)().mark((function e(){var r,a;return(0,i.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.Z.catagories.get();case 3:r=e.sent,a=r.data,t.categories=a.categories,t.isLoading=!1,e.next=13;break;case 9:e.prev=9,e.t0=e["catch"](0),console.log("error",e.t0),c.F.fire({icon:"error",title:"無法取得餐廳類別，請稍後再試"});case 13:case"end":return e.stop()}}),e,null,[[0,9]])})))()},handleFileChange:function(t){var e=t.target.files;if(0!==e.length){var r=window.URL.createObjectURL(e[0]);this.restaurant.image=r}else this.restaurant.image=""},handleSubmit:function(t){if(this.restaurant.name)if(this.restaurant.categoryId){var e=t.target,r=new FormData(e);this.$emit("after-submit",r)}else c.F.fire({icon:"warning",title:"請選擇餐廳類別"});else c.F.fire({icon:"warning",title:"請填寫餐廳名稱"})}},watch:{initialRestaurant:function(t){this.restaurant=(0,s.Z)((0,s.Z)({},this.restaurant),t)}},created:function(){this.fetchCategories(),this.restaurant=(0,s.Z)((0,s.Z)({},this.restaurant),this.initialRestaurant)}},d=l,m=r(1001),p=(0,m.Z)(d,a,n,!1,null,null,null),g=p.exports},18549:function(t,e,r){r.r(e),r.d(e,{default:function(){return g}});var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container py-5"},[r("AdminRestaurantForm",{attrs:{"is-processing":t.isProcessing},on:{"after-submit":t.handleAfterSubmit}})],1)},n=[],s=r(67906),i=r(16198),o=(r(21703),r(18609)),u=r(19032),c=r(41926),l={components:{AdminRestaurantForm:o.Z},data:function(){return{isProcessing:!1}},methods:{handleAfterSubmit:function(t){var e=this;return(0,i.Z)((0,s.Z)().mark((function r(){var a,n;return(0,s.Z)().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,e.isProcessing=!0,r.next=4,u.Z.restaurants.create({formData:t});case 4:if(a=r.sent,n=a.data,"success"===n.status){r.next=8;break}throw new Error(n.message);case 8:e.$router.push({name:"admin-restaurants"}),r.next=16;break;case 11:r.prev=11,r.t0=r["catch"](0),console.log("error",r.t0),e.isProcessing=!1,c.F.fire({icon:"error",title:"無法新增餐廳，請稍後再試"});case 16:case"end":return r.stop()}}),r,null,[[0,11]])})))()}}},d=l,m=r(1001),p=(0,m.Z)(d,a,n,!1,null,null,null),g=p.exports},19032:function(t,e,r){var a=r(41926),n=function(){return localStorage.getItem("token")};e["Z"]={catagories:{get:function(){return a.l.get("/admin/categories",{headers:{Authorization:"Bearer ".concat(n())}})},create:function(t){var e=t.formData;return a.l.post("/admin/categories",e,{headers:{Authorization:"Bearer ".concat(n())}})},update:function(t){var e=t.categoryId,r=t.formData;return a.l.put("/admin/categories/".concat(e),r,{headers:{Authorization:"Bearer ".concat(n())}})},delete:function(t){var e=t.categoryId;return a.l["delete"]("/admin/categories/".concat(e),{headers:{Authorization:"Bearer ".concat(n())}})}},restaurants:{get:function(){return a.l.get("admin/restaurants",{headers:{Authorization:"Bearer ".concat(n())}})},create:function(t){var e=t.formData;return a.l.post("/admin/restaurants",e,{headers:{Authorization:"Bearer ".concat(n())}})},delete:function(t){var e=t.restaurantId;return a.l["delete"]("/admin/restaurants/".concat(e),{headers:{Authorization:"Bearer ".concat(n())}})},getDetail:function(t){var e=t.restaurantId;return a.l.get("/admin/restaurants/".concat(e),{headers:{Authorization:"Bearer ".concat(n())}})},update:function(t){var e=t.restaurantId,r=t.formData;return a.l.put("/admin/restaurants/".concat(e),r,{headers:{Authorization:"Bearer ".concat(n())}})}},users:{get:function(){return a.l.get("/admin/users",{headers:{Authorization:"Bearer ".concat(n())}})},update:function(t){var e=t.userId,r=t.isAdmin;return a.l.put("/admin/users/".concat(e),{isAdmin:r},{headers:{Authorization:"Bearer ".concat(n())}})}}}}}]);
//# sourceMappingURL=549-legacy.d8ab6385.js.map