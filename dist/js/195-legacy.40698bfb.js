"use strict";(self["webpackChunkforum_front_end_vue"]=self["webpackChunkforum_front_end_vue"]||[]).push([[195],{49077:function(t,e,r){r.d(e,{Z:function(){return i}});var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"mb-3"},[r("h1",[t._v("餐廳後台")]),r("router-link",{attrs:{to:"/admin/restaurants"}},[t._v("Restaurants")]),t._v(" | "),r("router-link",{attrs:{to:"/admin/categories"}},[t._v("Categories")]),t._v(" | "),r("router-link",{attrs:{to:"/admin/users"}},[t._v("Users")])],1)},n=[],s=r(1001),o={},u=(0,s.Z)(o,a,n,!1,null,null,null),i=u.exports},69195:function(t,e,r){r.r(e),r.d(e,{default:function(){return k}});var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container py-5"},[r("AdminNav"),r("router-link",{staticClass:"btn btn-primary mb-4",attrs:{to:"/admin/restaurants/new"}},[t._v(" New Restaurant ")]),r("AdminRestaurantsTable")],1)},n=[],s=r(49077),o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("table",{staticClass:"table"},[t._m(0),r("tbody",t._l(t.restaurants,(function(e){return r("tr",{key:e.id},[r("th",{attrs:{scope:"row"}},[t._v(" "+t._s(e.id)+" ")]),r("td",[t._v(t._s(e.Category?e.Category.name:"未分類"))]),r("td",[t._v(t._s(e.name))]),r("td",{staticClass:"d-flex justify-content-between"},[r("router-link",{staticClass:"btn btn-link",attrs:{to:{name:"admin-restaurant",params:{id:e.id}}}},[t._v("Show ")]),r("router-link",{staticClass:"btn btn-link",attrs:{to:{name:"admin-restaurant-edit",params:{id:e.id}}}},[t._v("Edit ")]),r("button",{staticClass:"btn btn-link",attrs:{type:"button"},on:{click:function(r){return r.preventDefault(),r.stopPropagation(),t.deleteRestaurant(e.id)}}},[t._v(" Delete ")])],1)])})),0)])},u=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("thead",{staticClass:"thead-dark"},[r("tr",[r("th",{attrs:{scope:"col"}},[t._v(" # ")]),r("th",{attrs:{scope:"col"}},[t._v(" Category ")]),r("th",{attrs:{scope:"col"}},[t._v(" Name ")]),r("th",{attrs:{scope:"col",width:"300"}},[t._v(" 操作 ")])])])}],i=r(67906),c=r(16198),l=(r(21703),r(57327),r(41539),r(19032)),d=r(41926),f={data:function(){return{restaurants:[]}},created:function(){this.fetchRestaurants()},methods:{fetchRestaurants:function(){var t=this;return(0,c.Z)((0,i.Z)().mark((function e(){var r,a;return(0,i.Z)().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l.Z.restaurants.get();case 3:r=e.sent,a=r.data,t.restaurants=a.restaurants,e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),console.log("error",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},deleteRestaurant:function(t){var e=this;return(0,c.Z)((0,i.Z)().mark((function r(){var a,n;return(0,i.Z)().wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,l.Z.restaurants["delete"]({restaurantId:t});case 3:if(a=r.sent,n=a.data,"success"===n.status){r.next=7;break}throw new Error(n.message);case 7:e.restaurants=e.restaurants.filter((function(e){return e.id!==t})),r.next=14;break;case 10:r.prev=10,r.t0=r["catch"](0),console.log("error",r.t0),d.F.fire({icon:"error",title:"刪除失敗，請稍後再試"});case 14:case"end":return r.stop()}}),r,null,[[0,10]])})))()}}},h=f,m=r(1001),v=(0,m.Z)(h,o,u,!1,null,null,null),p=v.exports,_={components:{AdminNav:s.Z,AdminRestaurantsTable:p},data:function(){return{}},methods:{},created:function(){}},g=_,b=(0,m.Z)(g,a,n,!1,null,null,null),k=b.exports},19032:function(t,e,r){var a=r(41926),n=function(){return localStorage.getItem("token")};e["Z"]={catagories:{get:function(){return a.l.get("/admin/categories",{headers:{Authorization:"Bearer ".concat(n())}})},create:function(t){var e=t.formData;return a.l.post("/admin/categories",e,{headers:{Authorization:"Bearer ".concat(n())}})},update:function(t){var e=t.categoryId,r=t.formData;return a.l.put("/admin/categories/".concat(e),r,{headers:{Authorization:"Bearer ".concat(n())}})},delete:function(t){var e=t.categoryId;return a.l["delete"]("/admin/categories/".concat(e),{headers:{Authorization:"Bearer ".concat(n())}})}},restaurants:{get:function(){return a.l.get("admin/restaurants",{headers:{Authorization:"Bearer ".concat(n())}})},create:function(t){var e=t.formData;return a.l.post("/admin/restaurants",e,{headers:{Authorization:"Bearer ".concat(n())}})},delete:function(t){var e=t.restaurantId;return a.l["delete"]("/admin/restaurants/".concat(e),{headers:{Authorization:"Bearer ".concat(n())}})},getDetail:function(t){var e=t.restaurantId;return a.l.get("/admin/restaurants/".concat(e),{headers:{Authorization:"Bearer ".concat(n())}})},update:function(t){var e=t.restaurantId,r=t.formData;return a.l.put("/admin/restaurants/".concat(e),r,{headers:{Authorization:"Bearer ".concat(n())}})}},users:{get:function(){return a.l.get("/admin/users",{headers:{Authorization:"Bearer ".concat(n())}})},update:function(t){var e=t.userId,r=t.isAdmin;return a.l.put("/admin/users/".concat(e),{isAdmin:r},{headers:{Authorization:"Bearer ".concat(n())}})}}}}}]);
//# sourceMappingURL=195-legacy.40698bfb.js.map