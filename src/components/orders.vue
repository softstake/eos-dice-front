<template>
  <!-- Start Bets list -->
  <section class="bets_list">
    <div class="container">
      <div class="tabs is-centered">
        <ul>
          <li :class="{ 'is-active': !myBets }">
            <a @click="myBets = false">{{ $t('allBets') }}</a>
          </li>
          <li :class="{ 'is-active': myBets }">
            <a @click="myBets = true">{{ $t('myBets') }}</a>
          </li>
        </ul>
      </div>
      <table class="table is-fullwidth">
        <thead>
          <tr class="is-uppercase">
            <th>{{ $t('time') }}</th>
            <th>{{ $t('bettor') }}</th>
            <th class="is-hidden-mobile">{{ $t('rollunder') }}</th>
            <th>{{ $t('bet') }}</th>
            <th class="is-hidden-mobile">{{ $t('roll') }}</th>
            <th>{{ $t('payout') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(o, index) in orders" :key="index" :class="[ o.RandomRoll < o.RollUnder ? 'green-row' : 'blue-row' ]">
            <td>{{ dateFormat(o.CreatedAt) }}</td>
            <td>{{ o.PlayerName }}</td>
            <td class="is-hidden-mobile">{{ o.RollUnder }}</td>
            <td>{{ o.BetAmount }}</td>
            <td class="is-hidden-mobile">{{ o.RandomRoll }}</td>
            <td :class="{ 'has-text-primary' : o.PlayerPayout != 0 }">{{ o.PlayerPayout }}</td>
          </tr>
        </tbody>
      </table>
      <section v-if="errored">
        <p align="center">We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
      </section>
    </div>
  </section>
  <!-- End of Bets list -->
</template>

<script>
import { apiUrl } from "../network.js";
import axios from "axios";

export default {
  data() {
    return {
      orders: [],
      myBets: false,
      errored: false
    };
  },
  methods: {
    fetchOrders() {
      if (this.myBets && !this.account.name) {
        this.orders = [];
        return;
      }

      axios
        .get(
          (this.myBets && apiUrl + `?player=${this.account.name}`) || apiUrl,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          this.orders = response.data;
          this.errored = false;
        })
        .catch(e => {
          console.log(e);
          this.errored = true;
        });
    },
    dateFormat(raw) {
      return new Date(raw).toLocaleTimeString();
    }
  },
  computed: {
    account() {
      return this.$store.state.account;
    }
  },
  mounted() {
    setInterval(this.fetchOrders, 500);
  },
  watch: {
    myBets: function() {
      this.fetchOrders();
    }
  }
};
</script>