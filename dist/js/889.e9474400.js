"use strict";(self["webpackChunkforum_front_end_vue"]=self["webpackChunkforum_front_end_vue"]||[]).push([[889],{9077:function(t,e,a){a.d(e,{Z:function(){return c}});var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mb-3"},[a("h1",[t._v("餐廳後台")]),a("router-link",{attrs:{to:"/admin/restaurants"}},[t._v("Restaurants")]),t._v(" | "),a("router-link",{attrs:{to:"/admin/categories"}},[t._v("Categories")]),t._v(" | "),a("router-link",{attrs:{to:"/admin/users"}},[t._v("Users")])],1)},s=[],i=a(1001),n={},o=(0,i.Z)(n,r,s,!1,null,null,null),c=o.exports},4637:function(t,e,a){a.d(e,{Z:function(){return c}});var r=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"spinner"},[a("div",{staticClass:"bouncing-loader"},[a("div"),a("div"),a("div")])])}],i=a(1001),n={},o=(0,i.Z)(n,r,s,!1,null,"17d87710",null),c=o.exports},889:function(t,e,a){a.r(e),a.d(e,{default:function(){return h}});var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container py-5"},[a("AdminNav"),t.isLoading?a("Spinner"):[a("form",{staticClass:"my-4"},[a("div",{staticClass:"form-row"},[a("div",{staticClass:"col-auto"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.newCategoryName,expression:"newCategoryName"}],staticClass:"form-control",attrs:{type:"text",placeholder:"新增餐廳類別..."},domProps:{value:t.newCategoryName},on:{input:function(e){e.target.composing||(t.newCategoryName=e.target.value)}}})]),a("div",{staticClass:"col-auto"},[a("button",{staticClass:"btn btn-primary mt-3",attrs:{disabled:t.isProcessing,type:"button"},on:{click:function(e){return e.preventDefault(),e.stopPropagation(),t.createCategory.apply(null,arguments)}}},[t._v(" 新增 ")])])])]),a("table",{staticClass:"table"},[a("thead",{staticClass:"thead-dark"},[a("tr",[a("th",{attrs:{scope:"col",width:"60"}},[t._v(" # ")]),a("th",{attrs:{scope:"col"}},[t._v(" Category Name ")]),a("th",{attrs:{scope:"col",width:"210"}},[t._v(" Action ")])])]),a("tbody",t._l(t.categories,(function(e){return a("tr",{key:e.id},[a("th",{attrs:{scope:"row"}},[t._v(" "+t._s(e.id)+" ")]),a("td",{staticClass:"position-relative"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!e.isEditing,expression:"!category.isEditing"}],staticClass:"category-name"},[t._v(" "+t._s(e.name)+" ")]),a("input",{directives:[{name:"show",rawName:"v-show",value:e.isEditing,expression:"category.isEditing"},{name:"model",rawName:"v-model",value:e.name,expression:"category.name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:e.name},on:{input:function(a){a.target.composing||t.$set(e,"name",a.target.value)}}}),a("span",{directives:[{name:"show",rawName:"v-show",value:e.isEditing,expression:"category.isEditing"}],staticClass:"cancel",attrs:{disabled:t.isProcessing},on:{click:function(a){return t.handleCancel(e.id)}}},[t._v(" ✕ ")])]),a("td",{staticClass:"d-flex justify-content-between"},[a("button",{directives:[{name:"show",rawName:"v-show",value:!e.isEditing,expression:"!category.isEditing"}],staticClass:"btn btn-link mr-2",attrs:{disabled:t.isProcessing,type:"button"},on:{click:function(a){return a.preventDefault(),a.stopPropagation(),t.toggleIsEditing(e.id)}}},[t._v(" Edit ")]),a("button",{directives:[{name:"show",rawName:"v-show",value:e.isEditing,expression:"category.isEditing"}],staticClass:"btn btn-link mr-2",attrs:{disabled:t.isProcessing,type:"button"},on:{click:function(a){return a.preventDefault(),a.stopPropagation(),t.updateCategory({categoryId:e.id,name:e.name})}}},[t._v(" Save ")]),a("button",{staticClass:"btn btn-link mr-2",attrs:{type:"button",disabled:t.isProcessing},on:{click:function(a){return a.stopPropagation(),a.preventDefault(),t.deleteCategory(e.id)}}},[t._v(" Delete ")])])])})),0)])]],2)},s=[],i=(a(1703),a(9077)),n=a(4637),o=a(905),c=a(9032),d=a(1926);var l={components:{AdminNav:i.Z,Spinner:n.Z},data(){return{categories:[],newCategoryName:"",isProcessing:!1,isLoading:!0}},created(){this.fetchCategories()},methods:{async fetchCategories(){try{this.isLoading=!0;const{data:t}=await c.Z.catagories.get();this.categories=t.categories.map((t=>({...t,isEditing:!1,nameCached:""}))),this.isLoading=!1}catch(t){this.isLoading=!1,console.log("error",t),d.F.fire({icon:"error",title:t||"無法取得餐廳種類，請稍後再試"})}},async createCategory(){try{this.isProcessing=!0;const t={id:(0,o.Z)(),name:this.newCategoryName},{data:e}=await c.Z.catagories.create({formData:t});if(console.log(e),"success"!==e.status)throw new Error(e.message);this.categories.push({id:"",name:this.newCategoryName}),this.newCategoryName="",this.isProcessing=!1}catch(t){this.isProcessing=!1,console.log("error",t),d.F.fire({icon:"error",title:"無法新增餐廳種類，請稍後再試"})}},async deleteCategory(t){try{this.isProcessing=!0;const{data:e}=await c.Z.catagories["delete"]({categoryId:t});this.categories=this.categories.filter((e=>e.id!==t)),this.isProcessing=!1}catch(e){this.isProcessing=!1,console.log("error",e),d.F.fire({icon:"error",title:"無法刪除餐廳種類，請稍後再試"})}},async updateCategory({categoryId:t,name:e}){try{this.isProcessing=!0;const a={id:t,name:e},{data:r}=await c.Z.catagories.update({categoryId:t,formData:a});if("success"!==r.status)throw this.handleCancel(t),new Error(r.message);this.toggleIsEditing(t),this.isProcessing=!1}catch(a){this.isProcessing=!1,console.log("error",a),d.F.fire({icon:"error",title:"無法更新餐廳種類，請稍後再試"})}},toggleIsEditing(t){this.categories=this.categories.map((e=>e.id===t?{...e,isEditing:!e.isEditing,nameCached:e.name}:e))},handleCancel(t){this.categories=this.categories.map((e=>e.id===t?{...e,name:e.nameCached}:e)),this.toggleIsEditing(t)}}},u=l,g=a(1001),m=(0,g.Z)(u,r,s,!1,null,"4f8cd886",null),h=m.exports},9032:function(t,e,a){var r=a(1926);const s=()=>localStorage.getItem("token");e["Z"]={catagories:{get(){return r.l.get("/admin/categories",{headers:{Authorization:`Bearer ${s()}`}})},create({formData:t}){return r.l.post("/admin/categories",t,{headers:{Authorization:`Bearer ${s()}`}})},update({categoryId:t,formData:e}){return r.l.put(`/admin/categories/${t}`,e,{headers:{Authorization:`Bearer ${s()}`}})},delete({categoryId:t}){return r.l["delete"](`/admin/categories/${t}`,{headers:{Authorization:`Bearer ${s()}`}})}},restaurants:{get(){return r.l.get("admin/restaurants",{headers:{Authorization:`Bearer ${s()}`}})},create({formData:t}){return r.l.post("/admin/restaurants",t,{headers:{Authorization:`Bearer ${s()}`}})},delete({restaurantId:t}){return r.l["delete"](`/admin/restaurants/${t}`,{headers:{Authorization:`Bearer ${s()}`}})},getDetail({restaurantId:t}){return r.l.get(`/admin/restaurants/${t}`,{headers:{Authorization:`Bearer ${s()}`}})},update({restaurantId:t,formData:e}){return r.l.put(`/admin/restaurants/${t}`,e,{headers:{Authorization:`Bearer ${s()}`}})}},users:{get(){return r.l.get("/admin/users",{headers:{Authorization:`Bearer ${s()}`}})},update({userId:t,isAdmin:e}){return r.l.put(`/admin/users/${t}`,{isAdmin:e},{headers:{Authorization:`Bearer ${s()}`}})}}}}}]);
//# sourceMappingURL=889.e9474400.js.map