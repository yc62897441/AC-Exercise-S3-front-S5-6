<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <AdminNav />

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">
            #
          </th>
          <th scope="col">
            Email
          </th>
          <th scope="col">
            Role
          </th>
          <th scope="col" width="140">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">
            {{ user.id }}
          </th>
          <td>{{ user.email }}</td>
          <td>{{ user.isAdmin | isAdmin }}</td>
          <td v-if="user.id !== currentUser.id">
            <button v-if="user.isAdmin" v-on:click.prevent.stop="toggleUserRole(user.id)" :disabled="isProcessing"
              type="button" class="btn btn-link">
              set as user
            </button>
            <button v-else v-on:click.prevent.stop="toggleUserRole(user.id)" :disabled="isProcessing" type="button"
              class="btn btn-link">
              set as admin
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from '../components/AdminNav'
import { mapState } from 'vuex'
import adminAPI from '../apis/admin'
import { Toast } from '../utils/helpers'


const dummyData = {
  "users": [
    {
      "id": 1,
      "name": "root",
      "email": "root@example.com",
      "password": "$2a$10$3j.x5gbO2sBNpkte4TTHc.rNN7EIfIRqrzitpAJzTtp7SWb1nRKxS",
      "isAdmin": true,
      "image": null,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z"
    },
    {
      "id": 2,
      "name": "user1",
      "email": "user1@example.com",
      "password": "$2a$10$IhTmi90.XsRMetCY/Geuz.bmf5t0/18Z.1JLovAje6SoYZd6xeN0q",
      "isAdmin": false,
      "image": null,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z"
    },
    {
      "id": 3,
      "name": "user2",
      "email": "user2@example.com",
      "password": "$2a$10$52uyxH6lNVMc277pN0Dr8.kxiGGxFm.TZd3vb3f/ebbu0qBisXaTC",
      "isAdmin": false,
      "image": null,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z"
    }
  ]
}
const dummyUser = {
  "profile": {
    "id": 1,
    "name": "root",
    "email": "root@example.com",
    "password": "$2a$10$3j.x5gbO2sBNpkte4TTHc.rNN7EIfIRqrzitpAJzTtp7SWb1nRKxS",
    "isAdmin": true,
    "image": null,
    "createdAt": "2022-06-20T05:31:15.000Z",
    "updatedAt": "2022-06-20T05:31:15.000Z",
    "Comments": [
      {
        "id": 5,
        "text": "Saepe quasi sit magnam impedit veritatis.",
        "UserId": 1,
        "RestaurantId": 5,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 2
        }
      },
      {
        "id": 10,
        "text": "Molestiae rem accusamus iusto dolorem voluptatem.",
        "UserId": 1,
        "RestaurantId": 10,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 2
        }
      },
      {
        "id": 11,
        "text": "Rem iusto modi ad aspernatur optio.",
        "UserId": 1,
        "RestaurantId": 11,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 2
        }
      },
      {
        "id": 13,
        "text": "Eum accusamus esse tempore voluptatem.",
        "UserId": 1,
        "RestaurantId": 13,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 2
        }
      },
      {
        "id": 14,
        "text": "Veniam aut voluptatum dolor nostrum est reprehenderit mollitia quo quae.",
        "UserId": 1,
        "RestaurantId": 14,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 1
        }
      },
      {
        "id": 17,
        "text": "Magnam quia ab atque dolorem odio qui et molestiae maxime.",
        "UserId": 1,
        "RestaurantId": 17,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 1
        }
      },
      {
        "id": 18,
        "text": "Dolor molestias numquam atque dolore.",
        "UserId": 1,
        "RestaurantId": 18,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 4
        }
      },
      {
        "id": 23,
        "text": "Temporibus et eveniet neque aperiam itaque tempore adipisci qui sunt.",
        "UserId": 1,
        "RestaurantId": 23,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 1
        }
      },
      {
        "id": 32,
        "text": "Qui sed numquam aliquam optio dicta aut nisi.",
        "UserId": 1,
        "RestaurantId": 32,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 4
        }
      },
      {
        "id": 36,
        "text": "Quia sit ab aut non incidunt culpa.",
        "UserId": 1,
        "RestaurantId": 36,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 1
        }
      },
      {
        "id": 40,
        "text": "Et voluptates et sed est id fugit voluptatum qui.",
        "UserId": 1,
        "RestaurantId": 40,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 3
        }
      },
      {
        "id": 53,
        "text": "Qui aperiam qui quis omnis sit cumque earum.",
        "UserId": 1,
        "RestaurantId": 3,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 2
        }
      },
      {
        "id": 54,
        "text": "Explicabo sequi pariatur.",
        "UserId": 1,
        "RestaurantId": 4,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 1
        }
      },
      {
        "id": 56,
        "text": "Voluptatem quasi occaecati qui minus.",
        "UserId": 1,
        "RestaurantId": 6,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 3
        }
      },
      {
        "id": 57,
        "text": "Quo culpa nemo est minima aperiam voluptatem non.",
        "UserId": 1,
        "RestaurantId": 7,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 5
        }
      },
      {
        "id": 59,
        "text": "Nisi nihil dignissimos quibusdam odit.",
        "UserId": 1,
        "RestaurantId": 9,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 3
        }
      },
      {
        "id": 63,
        "text": "Ipsa aliquam quod voluptas minima dolor recusandae.",
        "UserId": 1,
        "RestaurantId": 13,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 2
        }
      },
      {
        "id": 65,
        "text": "Qui reiciendis quisquam suscipit blanditiis iste vel expedita dolorem.",
        "UserId": 1,
        "RestaurantId": 15,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 2
        }
      },
      {
        "id": 67,
        "text": "Repudiandae quasi voluptatibus sit tenetur illo aut.",
        "UserId": 1,
        "RestaurantId": 17,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 1
        }
      },
      {
        "id": 68,
        "text": "Enim nulla et dolores voluptatem.",
        "UserId": 1,
        "RestaurantId": 18,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 4
        }
      },
      {
        "id": 69,
        "text": "Autem omnis et labore qui minima cumque eligendi et.",
        "UserId": 1,
        "RestaurantId": 19,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 2
        }
      },
      {
        "id": 71,
        "text": "Sapiente labore inventore velit est nesciunt eum.",
        "UserId": 1,
        "RestaurantId": 21,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 1
        }
      },
      {
        "id": 74,
        "text": "Nostrum sed voluptas.",
        "UserId": 1,
        "RestaurantId": 24,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 5
        }
      },
      {
        "id": 80,
        "text": "Earum molestias cumque quisquam quibusdam accusantium iure consequatur.",
        "UserId": 1,
        "RestaurantId": 30,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 1
        }
      },
      {
        "id": 82,
        "text": "Voluptatem qui aut quia sed reiciendis iusto tempora.",
        "UserId": 1,
        "RestaurantId": 32,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 4
        }
      },
      {
        "id": 85,
        "text": "Dolores fuga quo quis voluptatem.",
        "UserId": 1,
        "RestaurantId": 35,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 5
        }
      },
      {
        "id": 86,
        "text": "Libero perferendis eos.",
        "UserId": 1,
        "RestaurantId": 36,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 1
        }
      },
      {
        "id": 87,
        "text": "Repellat dolorum ut inventore inventore consectetur repudiandae in.",
        "UserId": 1,
        "RestaurantId": 37,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 1
        }
      },
      {
        "id": 93,
        "text": "Mollitia aut aut expedita autem laboriosam provident totam.",
        "UserId": 1,
        "RestaurantId": 43,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 5
        }
      },
      {
        "id": 94,
        "text": "Et ut dolor aut modi minima.",
        "UserId": 1,
        "RestaurantId": 44,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 1
        }
      },
      {
        "id": 96,
        "text": "Officia quia omnis et vero.",
        "UserId": 1,
        "RestaurantId": 46,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 4
        }
      },
      {
        "id": 102,
        "text": "Cumque eligendi ipsam natus omnis qui incidunt.",
        "UserId": 1,
        "RestaurantId": 2,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 3
        }
      },
      {
        "id": 103,
        "text": "Hic et quo libero illum autem consequatur necessitatibus.",
        "UserId": 1,
        "RestaurantId": 3,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 2
        }
      },
      {
        "id": 105,
        "text": "Illo expedita sapiente dolor rerum ut.",
        "UserId": 1,
        "RestaurantId": 5,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 2
        }
      },
      {
        "id": 106,
        "text": "Sint sed sit eos tempore sint hic non ut.",
        "UserId": 1,
        "RestaurantId": 6,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 3
        }
      },
      {
        "id": 108,
        "text": "Qui eos qui sunt pariatur aliquam.",
        "UserId": 1,
        "RestaurantId": 8,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 5
        }
      },
      {
        "id": 111,
        "text": "Doloribus ipsa nisi quis et.",
        "UserId": 1,
        "RestaurantId": 11,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 2
        }
      },
      {
        "id": 115,
        "text": "Et eos qui odio nesciunt.",
        "UserId": 1,
        "RestaurantId": 15,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 2
        }
      },
      {
        "id": 118,
        "text": "Placeat dolor inventore incidunt.",
        "UserId": 1,
        "RestaurantId": 18,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 4
        }
      },
      {
        "id": 125,
        "text": "Numquam voluptatem rerum dolorem.",
        "UserId": 1,
        "RestaurantId": 25,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 4
        }
      },
      {
        "id": 126,
        "text": "Aut quam dolores assumenda.",
        "UserId": 1,
        "RestaurantId": 26,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 1
        }
      },
      {
        "id": 128,
        "text": "Voluptas similique pariatur a sint sequi fugit facilis.",
        "UserId": 1,
        "RestaurantId": 28,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 2
        }
      },
      {
        "id": 131,
        "text": "Id ab ea dolor et odio quibusdam.",
        "UserId": 1,
        "RestaurantId": 31,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 5
        }
      },
      {
        "id": 132,
        "text": "Quia illum quo est inventore.",
        "UserId": 1,
        "RestaurantId": 32,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 4
        }
      },
      {
        "id": 135,
        "text": "Facere fugit nostrum enim id voluptatem iste.",
        "UserId": 1,
        "RestaurantId": 35,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 5
        }
      },
      {
        "id": 137,
        "text": "At aut sunt non sint.",
        "UserId": 1,
        "RestaurantId": 37,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 1
        }
      },
      {
        "id": 139,
        "text": "Culpa velit cum est dicta cum sint.",
        "UserId": 1,
        "RestaurantId": 39,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 1
        }
      },
      {
        "id": 141,
        "text": "Quia minus odit doloremque perferendis officiis reprehenderit.",
        "UserId": 1,
        "RestaurantId": 41,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 5
        }
      },
      {
        "id": 143,
        "text": "Eum pariatur minima cum.",
        "UserId": 1,
        "RestaurantId": 43,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 5
        }
      },
      {
        "id": 145,
        "text": "Praesentium fugit aliquid molestiae quibusdam eos quia.",
        "UserId": 1,
        "RestaurantId": 45,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 4
        }
      },
      {
        "id": 146,
        "text": "Minus harum qui aut illum quod illum ducimus.",
        "UserId": 1,
        "RestaurantId": 46,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 4
        }
      },
      {
        "id": 147,
        "text": "Soluta rem fuga ex.",
        "UserId": 1,
        "RestaurantId": 47,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 4
        }
      },
      {
        "id": 149,
        "text": "Et accusantium ad.",
        "UserId": 1,
        "RestaurantId": 49,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 1
        }
      },
      {
        "id": 150,
        "text": "Cum beatae quam et sunt rerum aut et.",
        "UserId": 1,
        "RestaurantId": 50,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "Restaurant": {
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
          "CategoryId": 5
        }
      }
    ],
    "FavoritedRestaurants": [],
    "Followers": [],
    "Followings": []
  },
  "isFollowed": false
}

export default {
  components: {
    AdminNav
  },
  data() {
    return {
      users: [],
      // currentUser: {},
      isProcessing: false
    }
  },
  methods: {
    // fetchUsers() {
    //   this.users = dummyData.users
    // },
    // fetchCurrentUser() {
    //   this.currentUser = {
    //     ...dummyUser.profile
    //   }
    // },
    // toggleUserRole(userId) {
    //   this.users = this.users.map(user => {
    //     if (user.id === userId) {
    //       return {
    //         ...user,
    //         isAdmin: !user.isAdmin
    //       }
    //     } else {
    //       return user
    //     }
    //   })
    // },
    async fetchUsers() {
      try {
        const { data } = await adminAPI.users.get()
        this.users = data.users
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試'
        })
      }
    },
    async toggleUserRole(userId) {
      try {
        this.isProcessing = true
        let isAdmin = false
        this.users.forEach(user => {
          if (user.id === userId) {
            isAdmin = !user.isAdmin
          }
        })
        console.log('isAdmin', isAdmin)
        isAdmin = isAdmin.toString()
        console.log('isAdmin', isAdmin)
        const { data } = await adminAPI.users.update({ userId, isAdmin })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.users = this.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              isAdmin: !user.isAdmin
            }
          } else {
            return user
          }
        })
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法更新使用者角色，請稍後再試'
        })
      }
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    this.fetchUsers()
    // this.fetchCurrentUser()
  },
  filters: {
    isAdmin(isAdmin) {
      if (isAdmin) {
        return 'Admin'
      } else {
        return 'User'
      }
    }
  }
}
</script>