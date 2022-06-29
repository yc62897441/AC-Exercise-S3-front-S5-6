// ./src/components/AdminRestaurantsTable.vue
<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">
          #
        </th>
        <th scope="col">
          Category
        </th>
        <th scope="col">
          Name
        </th>
        <th scope="col" width="300">
          操作
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="restaurant in restaurants" :key="restaurant.id">
        <th scope="row">
          {{ restaurant.id }}
        </th>
        <td>{{ restaurant.Category ? restaurant.Category.name : '未分類' }}</td>
        <td>{{ restaurant.name }}</td>
        <td class="d-flex justify-content-between">
          <router-link :to="{ name: 'admin-restaurant', params: { id: restaurant.id } }" class="btn btn-link">Show
          </router-link>

          <router-link :to="{ name: 'admin-restaurant-edit', params: { id: restaurant.id } }" class="btn btn-link">Edit
          </router-link>

          <button type="button" class="btn btn-link" v-on:click.prevent.stop="deleteRestaurant(restaurant.id)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import adminAPI from '../apis/admin'
import { Toast } from '../utils/helpers'

const dummyData = {
  "restaurants": [
    {
      "id": 1,
      "name": "Mrs. Vada Bashirian",
      "tel": "(162) 701-7245 x3719",
      "address": "7666 Jermaine Valley",
      "opening_hours": "08:00",
      "description": "non quidem fuga",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=44.81530367793509",
      "viewCounts": 1,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-22T04:41:54.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 2,
      "name": "Christiana Durgan III",
      "tel": "899-746-0707 x6948",
      "address": "67338 Vicenta Lock",
      "opening_hours": "08:00",
      "description": "Non itaque autem et eum officia sint adipisci et recusandae. Quidem eius aspernatur veritatis ipsum rerum assumenda fugiat id. Hic architecto eius omnis magnam consequatur. Error rem nihil maiores nihil sunt rerum aperiam.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=13.263135072849197",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 3,
      "Category": {
        "id": 3,
        "name": "義大利料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 3,
      "name": "Rogelio Breitenberg",
      "tel": "(095) 373-4184",
      "address": "84682 Sanford Plaza",
      "opening_hours": "08:00",
      "description": "Qui provident esse laborum.\nUllam commodi aliquid maxime dolorem.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=61.881670455990175",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 4,
      "name": "Marcel Heidenreich",
      "tel": "709.374.3409 x68403",
      "address": "598 Paxton Estates",
      "opening_hours": "08:00",
      "description": "Nisi dolore aperiam voluptatem error velit aperiam quod. Et ipsa architecto consequuntur. Dolorum nostrum sunt aut reprehenderit beatae aut commodi aut velit. Ea corrupti atque consequatur sit quos et necessitatibus neque fugiat. Rerum rerum eum saepe ea magni nostrum autem.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=43.26753214363208",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 5,
      "name": "Martine Barton",
      "tel": "901.775.1234 x3946",
      "address": "7472 Dave Lodge",
      "opening_hours": "08:00",
      "description": "Accusamus quia nam voluptatem saepe cum quas sit unde.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=82.10807723834208",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 6,
      "name": "Sydni Mosciski",
      "tel": "979.275.0174 x67853",
      "address": "071 Nitzsche Overpass",
      "opening_hours": "08:00",
      "description": "Cupiditate qui vero qui. Cupiditate sunt est at. Numquam aut blanditiis. Nihil error ut deleniti omnis voluptates labore perferendis cupiditate ullam.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=62.58758396282473",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 3,
      "Category": {
        "id": 3,
        "name": "義大利料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 7,
      "name": "Finn Feest",
      "tel": "(062) 740-0562",
      "address": "1494 Rosamond Curve",
      "opening_hours": "08:00",
      "description": "Placeat voluptas sed voluptatibus est voluptas.\nQui blanditiis nisi qui.\nTotam omnis nemo modi unde laboriosam.\nNobis vel nihil.\nEt excepturi quae qui et.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=56.105367425145204",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 8,
      "name": "Mr. Billie Dickens",
      "tel": "567.871.4297",
      "address": "9765 Ernser Ranch",
      "opening_hours": "08:00",
      "description": "Ipsum deleniti rem quod assumenda sint qui animi.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=69.4698679315173",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 9,
      "name": "Efren McKenzie",
      "tel": "063-822-2528",
      "address": "645 Streich Crest",
      "opening_hours": "08:00",
      "description": "Doloremque quis quo maxime sit. Ut dignissimos non nulla. Quisquam sint et omnis accusamus tempore. Non necessitatibus ad dolorum ab laboriosam dolore maiores incidunt. Et ipsum consectetur quia illo dolor eos. Quos iusto sunt commodi quasi id omnis.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=9.272782134327207",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 3,
      "Category": {
        "id": 3,
        "name": "義大利料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 10,
      "name": "Anahi Witting",
      "tel": "1-860-032-1115 x636",
      "address": "641 Dagmar Mountains",
      "opening_hours": "08:00",
      "description": "Natus ea est sit voluptas qui.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=18.034580646284716",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 11,
      "name": "Polly Hartmann",
      "tel": "(124) 920-1715",
      "address": "4901 Garland Inlet",
      "opening_hours": "08:00",
      "description": "Ea commodi error vero deserunt. Id perspiciatis omnis. Quas qui ea dolor debitis debitis necessitatibus quia adipisci. Possimus amet explicabo commodi ipsam sunt aspernatur voluptas. Eum voluptatem et beatae cupiditate officiis aut magni id nobis.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=75.7922951539858",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 12,
      "name": "Hailie Gottlieb",
      "tel": "(682) 431-7929 x306",
      "address": "7901 Barton Lakes",
      "opening_hours": "08:00",
      "description": "Ut ex optio. Sint distinctio eaque ea et fugiat dicta asperiores sunt facere. Ut deserunt deleniti laborum nam voluptatem facilis deserunt quas iusto. Natus dolores recusandae harum. Quo quis perferendis et quia dolores necessitatibus ducimus et dolore. Facilis distinctio nisi delectus.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=5.0113043362110865",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 3,
      "Category": {
        "id": 3,
        "name": "義大利料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 13,
      "name": "Cole Flatley",
      "tel": "1-901-354-6465 x01416",
      "address": "084 Austen Ford",
      "opening_hours": "08:00",
      "description": "est",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=32.68289772461006",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 14,
      "name": "Leslie Ziemann",
      "tel": "946.026.9014 x6299",
      "address": "5088 Laurianne Branch",
      "opening_hours": "08:00",
      "description": "Dolores sed id commodi porro ipsam a sint est. Rerum quibusdam excepturi sit incidunt. Praesentium est sed.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=10.621573592725753",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 15,
      "name": "Jaron Harber DVM",
      "tel": "1-742-878-2827",
      "address": "202 Turner Squares",
      "opening_hours": "08:00",
      "description": "assumenda animi recusandae",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=86.20351313459138",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 16,
      "name": "Dr. Nadia Stamm",
      "tel": "309.181.9634",
      "address": "5241 Lou Passage",
      "opening_hours": "08:00",
      "description": "Iure voluptates et nobis enim cupiditate iste. Voluptatem voluptas sed odio aliquam velit deleniti perferendis voluptas. Quae rem ducimus molestias aliquam laboriosam dolore. Soluta ipsam laudantium aut voluptatum repellat aliquam dignissimos fugiat. Voluptatibus saepe magni omnis illum enim cumque earum. Et voluptatem dolorem facilis enim iure sint veritatis quia aut.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=42.78157855526275",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 17,
      "name": "Orland King",
      "tel": "1-536-031-4257 x31824",
      "address": "808 Schiller Port",
      "opening_hours": "08:00",
      "description": "Architecto odio voluptatum sunt nihil dolores mollitia optio.\nConsequatur eum minima.\nConsequatur quisquam distinctio tempora officiis totam.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=15.615987868970805",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 18,
      "name": "Mr. Kylie Rath",
      "tel": "1-298-439-5475",
      "address": "0668 Mohr Ford",
      "opening_hours": "08:00",
      "description": "Perferendis possimus dolor dolor et atque earum at. Quia omnis distinctio sit. Doloremque aut in ut aspernatur aut.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=38.53852056158513",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 4,
      "Category": {
        "id": 4,
        "name": "墨西哥料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 19,
      "name": "Marianne Kuhlman",
      "tel": "868-387-4843",
      "address": "73711 Grant Passage",
      "opening_hours": "08:00",
      "description": "Tenetur quis dolores non minima. Facere animi quo. Aspernatur odit quis laboriosam corporis et. Dicta dolor ut recusandae voluptatibus est. Rerum labore neque. Quis commodi sint possimus.\n \rEos molestiae facilis explicabo expedita ut ut possimus ea veniam. Dignissimos optio laudantium adipisci tempore quae voluptatem. Ut sint voluptatem quis dicta odio et neque. Expedita doloremque minima vero error dolores exercitationem. Et ratione ullam est velit voluptatem est numquam. Voluptate aperiam atque dolores non voluptatum beatae labore.\n \rQuidem dolorum perspiciatis non in aut velit vitae minus. Omnis repellat nihil illo. Quis illum tempora et sint quas quam. Et dicta totam officia velit.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=36.71688438952059",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 20,
      "name": "Eladio Nader",
      "tel": "052-579-6859 x58379",
      "address": "15202 Kip Plains",
      "opening_hours": "08:00",
      "description": "Consequatur dolores velit aut a. Saepe est repudiandae laborum iusto. Earum eveniet alias. Provident corrupti sapiente odio consequatur aliquam.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=39.40182269812698",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 21,
      "name": "Alanna Zemlak",
      "tel": "(112) 177-5080 x39943",
      "address": "66348 Adams Lane",
      "opening_hours": "08:00",
      "description": "Quaerat quo dignissimos est omnis veritatis fuga.\nTenetur aut blanditiis ratione omnis.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=77.17259318139655",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 22,
      "name": "Murray Schroeder",
      "tel": "195.126.6640 x9100",
      "address": "3219 Kiley Glen",
      "opening_hours": "08:00",
      "description": "Recusandae ipsam aperiam harum placeat quia dolores.\nDolore qui doloribus nulla ut.\nOccaecati cupiditate dolor.\nOccaecati repellendus minus recusandae et sit.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=85.2256565696924",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 23,
      "name": "Ralph Wintheiser",
      "tel": "240-075-7452",
      "address": "7508 Hassan Forges",
      "opening_hours": "08:00",
      "description": "sed quaerat ab",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=75.8080484576855",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 24,
      "name": "Riley Senger",
      "tel": "1-268-034-7792",
      "address": "1923 Jewell Street",
      "opening_hours": "08:00",
      "description": "Nam sint fuga occaecati voluptatem cum eveniet quaerat totam sapiente. Aliquam distinctio voluptatem eum voluptas recusandae rerum. Maiores maiores molestiae quia itaque magnam. Libero esse voluptatibus quasi. Quia laborum quis id deleniti debitis sit exercitationem.\n \rQuos aut atque eligendi molestias exercitationem a voluptatem ut molestiae. Dicta illo molestiae. Saepe excepturi voluptatem et culpa et corporis dolorem repellat id.\n \rMaiores ut quam ipsum. Esse debitis rem odio et aut voluptas omnis voluptatibus ipsam. Dolor qui ipsa vel voluptas exercitationem qui voluptas. Natus non esse ut blanditiis qui. Labore nisi vitae maxime architecto et fugit libero est. Deleniti aut officia.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=37.97404438114755",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 25,
      "name": "Bradley Ortiz",
      "tel": "441-880-1949",
      "address": "4476 Kovacek Falls",
      "opening_hours": "08:00",
      "description": "sapiente",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=39.67590282473723",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 4,
      "Category": {
        "id": 4,
        "name": "墨西哥料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 26,
      "name": "Jerry Beahan",
      "tel": "807.094.5633 x982",
      "address": "65309 Gladys Walks",
      "opening_hours": "08:00",
      "description": "voluptatem",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=52.676798731928784",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 27,
      "name": "Angeline Price",
      "tel": "537.143.3602",
      "address": "08869 Weissnat Stravenue",
      "opening_hours": "08:00",
      "description": "Eos in vel sed fugit culpa.\nVero est ut dolorem ipsum aliquam hic praesentium a.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=93.15795246079746",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 28,
      "name": "Derrick McClure",
      "tel": "228-210-5844",
      "address": "222 Kirstin Haven",
      "opening_hours": "08:00",
      "description": "Aut corporis asperiores ipsum exercitationem.\nHic est aut eum quisquam excepturi.\nVero quia voluptates dolor illum qui qui et voluptatem ipsa.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=13.022869973764074",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 29,
      "name": "Deon McGlynn II",
      "tel": "(709) 708-2131",
      "address": "8917 Carroll Mills",
      "opening_hours": "08:00",
      "description": "Adipisci omnis aut similique officia ea quam magni. Qui qui laborum dolor ullam. Fugiat omnis et aperiam. Doloremque quibusdam consectetur accusamus iusto esse non. Nisi et voluptatum maxime eligendi sit quia.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=9.48180383796775",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 30,
      "name": "Kamryn Swift PhD",
      "tel": "122-613-8464",
      "address": "8595 Predovic Square",
      "opening_hours": "08:00",
      "description": "Facilis a ad sit consequatur ut eum voluptas. Architecto enim a dolor magnam et pariatur quam quaerat. Porro est molestias veritatis rerum provident eveniet omnis et in. Nesciunt quasi quia commodi ut. Quia accusamus dolor vel enim labore atque occaecati ipsum maxime. Ad porro enim voluptas debitis est dolorem atque delectus.\n \rNon quisquam sed perferendis nisi ut. Et qui et. Veritatis officiis omnis magni reprehenderit explicabo sunt distinctio consequatur.\n \rOfficia dignissimos dignissimos voluptatem libero. Non et et quia odit asperiores sunt non a. Soluta non enim dolores id voluptatem quaerat beatae pariatur. Optio neque ut ut qui omnis nesciunt dolorum. Numquam autem atque delectus sapiente. Et omnis nisi rerum et est laborum quisquam.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=42.0934883910302",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 31,
      "name": "Miss Annette Jerde",
      "tel": "1-578-045-4127 x47188",
      "address": "080 Zemlak Junctions",
      "opening_hours": "08:00",
      "description": "Quae laboriosam est ducimus culpa aut soluta atque.\nCumque ipsam minus at et ducimus.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=45.5300955441573",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 32,
      "name": "Ivory Sawayn",
      "tel": "1-813-920-0792",
      "address": "823 Schulist Lights",
      "opening_hours": "08:00",
      "description": "Unde sint alias quia saepe et.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=49.02931317063639",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 4,
      "Category": {
        "id": 4,
        "name": "墨西哥料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 33,
      "name": "Adelle Klocko",
      "tel": "446-044-9314 x116",
      "address": "167 Hammes Orchard",
      "opening_hours": "08:00",
      "description": "Cumque aut voluptatem ducimus odio qui tempora.\nMolestiae totam eaque blanditiis quis et soluta.\nIste distinctio ullam officiis tenetur neque eaque.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=93.75786906776786",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 34,
      "name": "Annamarie Satterfield",
      "tel": "(924) 515-1918 x227",
      "address": "642 Flo Burg",
      "opening_hours": "08:00",
      "description": "Et labore aliquid tempore totam dolor velit voluptatibus. Dolore vel excepturi non voluptas rerum soluta. Vero sed nihil dolor ratione. Quia dolorem illo debitis odit fugit voluptas. Facilis consequatur sit dolore maxime cupiditate voluptas aperiam reiciendis voluptatem.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=74.96975192752619",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 35,
      "name": "Ardella Emard",
      "tel": "(782) 053-5706",
      "address": "2803 Grady Land",
      "opening_hours": "08:00",
      "description": "Optio sequi amet.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=81.99505330961972",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 36,
      "name": "Rick Abernathy",
      "tel": "(651) 112-2773",
      "address": "694 Howard Islands",
      "opening_hours": "08:00",
      "description": "Ullam qui possimus. Culpa modi maiores ut maiores sequi dolorum exercitationem ut. Molestias sed cum exercitationem sed exercitationem.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=67.49127734416169",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 37,
      "name": "Susie Auer",
      "tel": "722.384.3771 x05899",
      "address": "68690 Carissa Street",
      "opening_hours": "08:00",
      "description": "Dolores occaecati ut cumque non voluptatum deleniti quia.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=72.86976638793024",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 38,
      "name": "Jaylan Hamill",
      "tel": "446-295-3035 x9660",
      "address": "686 Rusty Island",
      "opening_hours": "08:00",
      "description": "rem",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=86.69497177619272",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 3,
      "Category": {
        "id": 3,
        "name": "義大利料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 39,
      "name": "Jamaal Ratke DVM",
      "tel": "1-803-575-2361 x38878",
      "address": "36168 Frida Estates",
      "opening_hours": "08:00",
      "description": "aliquid",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=37.87715192799763",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 40,
      "name": "Berenice Funk",
      "tel": "(926) 116-3237",
      "address": "31384 Romaguera Extension",
      "opening_hours": "08:00",
      "description": "voluptatem",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=53.65066401052485",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 3,
      "Category": {
        "id": 3,
        "name": "義大利料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 41,
      "name": "Grady Murphy",
      "tel": "687-943-9633 x942",
      "address": "541 Osinski Springs",
      "opening_hours": "08:00",
      "description": "magnam at soluta",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=14.988669917230911",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 42,
      "name": "Kyla Prohaska MD",
      "tel": "770-731-9172 x267",
      "address": "44827 Senger Manors",
      "opening_hours": "08:00",
      "description": "Qui eos distinctio temporibus qui dignissimos. Deleniti repellat ab quisquam qui a non. Dolores dolores excepturi ad laboriosam doloremque eos reprehenderit illo. Necessitatibus nihil quia dolore. Beatae adipisci dolorum suscipit odit est atque voluptatem quasi enim. Libero voluptatem quas repellendus cupiditate et minus magni et nemo.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=21.786546694169708",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 43,
      "name": "Izaiah Ratke",
      "tel": "297.121.9154",
      "address": "47308 Barry Place",
      "opening_hours": "08:00",
      "description": "Quae quo ea ut. Molestiae consectetur voluptas veniam possimus impedit voluptatem enim veritatis tenetur. Distinctio voluptatem dolorem aperiam enim. Soluta unde laboriosam libero nihil ad corporis ullam. Qui porro dolore ex dignissimos consequatur. Et earum aut maxime modi aperiam.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=24.119200159466338",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 44,
      "name": "Lorena Cartwright",
      "tel": "657-899-7335",
      "address": "00644 Suzanne Union",
      "opening_hours": "08:00",
      "description": "Illo voluptatem doloribus tempora eos velit est sint itaque. Est voluptas et rerum qui nisi architecto provident eum. Non rerum similique voluptas voluptas.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=69.20476401452242",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 45,
      "name": "Eino Senger",
      "tel": "(443) 287-9815",
      "address": "3292 Zulauf Park",
      "opening_hours": "08:00",
      "description": "dolorem quia et",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=90.18421729298186",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 4,
      "Category": {
        "id": 4,
        "name": "墨西哥料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 46,
      "name": "Kayli Hermiston",
      "tel": "1-542-411-7545",
      "address": "198 Cordelia Mountains",
      "opening_hours": "08:00",
      "description": "Aliquam quia eaque maiores qui eos laboriosam totam. Laborum sed voluptatem velit veniam molestias et vitae. Ad accusamus dolores voluptatem ut nesciunt. Veritatis maiores consequatur ipsam pariatur illum qui. Est eveniet nihil rerum.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=2.7588268148152295",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 4,
      "Category": {
        "id": 4,
        "name": "墨西哥料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 47,
      "name": "Ms. Clay Conroy",
      "tel": "130-647-8796",
      "address": "8532 Katelin Pike",
      "opening_hours": "08:00",
      "description": "sapiente aut sapiente",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=86.91999234236087",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 4,
      "Category": {
        "id": 4,
        "name": "墨西哥料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 48,
      "name": "Dr. Rebecca Homenick",
      "tel": "662-737-7226 x5159",
      "address": "5274 Kertzmann Square",
      "opening_hours": "08:00",
      "description": "nostrum",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=1.7503294003570868",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 49,
      "name": "Maia Jacobson",
      "tel": "034.503.7173 x918",
      "address": "16626 Witting Fork",
      "opening_hours": "08:00",
      "description": "Laudantium odit quia nihil est aut ab hic. Consequatur nam ut vero. Itaque sapiente alias qui praesentium sed nostrum et. Dolorem perspiciatis dignissimos quos unde ut enim. Excepturi expedita sit doloremque laudantium eum dolor ad optio.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=28.706470637722916",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    },
    {
      "id": 50,
      "name": "Ewell Johnson PhD",
      "tel": "(551) 515-6373 x60014",
      "address": "8432 Klein Crossroad",
      "opening_hours": "08:00",
      "description": "Asperiores ipsum placeat sapiente. Rerum voluptas sed. Necessitatibus unde autem placeat doloribus enim sed. Qui et et distinctio ratione ea minima quia pariatur.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=34.434320208565204",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      }
    }
  ]
}
export default {
  data() {
    return {
      restaurants: []
    }
  },
  created() {
    this.fetchRestaurants()
  },
  methods: {
    // fetchRestaurants() {
    //   this.restaurants = dummyData.restaurants
    // },
    // deleteRestaurant(restaurantId) {
    //   this.restaurants = this.restaurants.filter(restaurant => restaurant.id !== restaurantId)
    // },
    async fetchRestaurants() {
      try {
        const { data } = await adminAPI.restaurants.get()
        this.restaurants = data.restaurants
      } catch (error) {
        console.log('error', error)
      }
    },
    async deleteRestaurant(restaurantId) {
      try {
        const { data } = await adminAPI.restaurants.delete({ restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurants = this.restaurants.filter(restaurant => restaurant.id !== restaurantId)
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '刪除失敗，請稍後再試'
        })
      }
    }
  }
}
</script>