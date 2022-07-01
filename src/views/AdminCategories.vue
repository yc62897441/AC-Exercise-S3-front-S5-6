<template>
  <div class="container py-5">
    <AdminNav />
    <Spinner v-if="isLoading" />
    <template v-else>
      <form class="my-4">
        <div class="form-row">
          <div class="col-auto">
            <input v-model="newCategoryName" type="text" class="form-control" placeholder="新增餐廳類別...">
          </div>
          <div class="col-auto">
            <button v-on:click.prevent.stop="createCategory" :disabled="isProcessing" type="button"
              class="btn btn-primary mt-3">
              新增
            </button>
          </div>
        </div>
      </form>
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col" width="60">
              #
            </th>
            <th scope="col">
              Category Name
            </th>
            <th scope="col" width="210">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <th scope="row">
              {{ category.id }}
            </th>

            <td class="position-relative">
              <div v-show="!category.isEditing" class="category-name">
                {{ category.name }}
              </div>
              <input v-show="category.isEditing" v-model="category.name" type="text" class="form-control">
              <span v-show="category.isEditing" v-on:click="handleCancel(category.id)" :disabled="isProcessing"
                class="cancel">
                ✕
              </span>
            </td>

            <td class="d-flex justify-content-between">
              <button v-show="!category.isEditing" v-on:click.prevent.stop="toggleIsEditing(category.id)"
                :disabled="isProcessing" type="button" class="btn btn-link mr-2">
                Edit
              </button>
              <button v-show="category.isEditing"
                v-on:click.prevent.stop="updateCategory({ categoryId: category.id, name: category.name })"
                :disabled="isProcessing" type="button" class="btn btn-link mr-2">
                Save
              </button>
              <button type="button" class="btn btn-link mr-2" @click.stop.prevent="deleteCategory(category.id)"
                :disabled="isProcessing">
                Delete
              </button>
            </td>

          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>
import AdminNav from '@/components/AdminNav'
import Spinner from '../components/Spinner'
import { v4 as uuidv4 } from 'uuid'
import adminAPI from '../apis/admin'
import { Toast } from '../utils/helpers'

const dummyData = {
  categories: [
    {
      id: 1,
      name: '中式料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 2,
      name: '日本料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 3,
      name: '義大利料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 4,
      name: '墨西哥料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    }
  ]
}

export default {
  components: {
    AdminNav,
    Spinner
  },
  // 3. 定義 Vue 中使用的 data 資料
  data() {
    return {
      categories: [],
      newCategoryName: '',
      isProcessing: false,
      isLoading: true
    }
  },
  // 5. 調用 `fetchCategories` 方法
  created() {
    this.fetchCategories()
  },
  methods: {
    // 4. 定義 `fetchCategories` 方法，把 `dummyData` 帶入 Vue 物件
    // fetchCategories() {
    //   this.categories = dummyData.categories.map(category => ({
    //     ...category,
    //     isEditing: false,
    //     nameCached: ''
    //   }))
    // },
    // createCategory() {
    //   this.categories.push({
    //     id: uuidv4(),
    //     name: this.newCategoryName
    //   })
    //   this.newCategoryName = ''
    // },
    // deleteCategory(categoryId) {
    //   this.categories = this.categories.filter(category => category.id !== categoryId)
    // },
    // updateCategory({ categoryId, name }) {
    //   this.toggleIsEditing(categoryId)
    // },
    async fetchCategories() {
      try {
        this.isLoading = true
        const { data } = await adminAPI.catagories.get()
        this.categories = data.categories.map(category => ({
          ...category,
          isEditing: false,
          nameCached: ''
        }))
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: error || '無法取得餐廳種類，請稍後再試'
        })
      }
    },
    async createCategory() {
      try {
        this.isProcessing = true
        const formData = {
          id: uuidv4(),
          name: this.newCategoryName
        }
        const { data } = await adminAPI.catagories.create({ formData })
        console.log(data)

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.categories.push({
          id: '',
          name: this.newCategoryName
        })
        this.newCategoryName = ''
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法新增餐廳種類，請稍後再試'
        })
      }
    },
    async deleteCategory(categoryId) {
      try {
        this.isProcessing = true
        const { data } = await adminAPI.catagories.delete({ categoryId })
        this.categories = this.categories.filter(category => category.id !== categoryId)
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法刪除餐廳種類，請稍後再試'
        })
      }
    },
    async updateCategory({ categoryId, name }) {
      try {
        this.isProcessing = true
        const formData = {
          id: categoryId,
          name: name
        }
        const { data } = await adminAPI.catagories.update({ categoryId, formData })
        if (data.status !== 'success') {
          this.handleCancel(categoryId)
          throw new Error(data.message)
        }
        this.toggleIsEditing(categoryId)
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法更新餐廳種類，請稍後再試'
        })
      }
    },
    toggleIsEditing(categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            isEditing: !category.isEditing,
            nameCached: category.name
          }
        } else {
          return category
        }
      })
    },
    handleCancel(categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            name: category.nameCached
          }
        } else {
          return category
        }
      })
      this.toggleIsEditing(categoryId)
    }
  }
}
</script>

<style scoped>
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>