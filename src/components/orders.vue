<template>
  <section class="section">
    <div class="container" id="results">
      <div class="tabs is-toggle is-small">
        <ul>
          <li :class="{ 'is-active': !myBets }">
            <a @click="myBets = false">All Bets</a>
          </li>
          <li :class="{ 'is-active': myBets }">
            <a @click="myBets = true">My Bets</a>
          </li>
        </ul>
      </div>
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th class="has-text-centered">Time</th>
            <th class="has-text-centered">Bettor</th>
            <th class="has-text-centered is-hidden-mobile">Roll Under</th>
            <th class="has-text-centered">Bet Amount</th>
            <th class="has-text-centered is-hidden-mobile">Roll</th>
            <th class="has-text-centered">Payout</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="o in orders" v-bind:class="{ 'is-selected': o.PlayerPayout != 0 }">
            <td class="has-text-centered">{{ dateFormat(o.CreatedAt) }}</td>
            <td class="has-text-centered">{{ o.PlayerName }}</td>
            <td class="has-text-centered is-hidden-mobile" >{{ o.RollUnder }}</td>
            <td class="has-text-centered">{{ o.BetAmount }}</td>
            <td class="has-text-centered is-hidden-mobile">{{ o.RandomRoll }}</td>
            <td class="has-text-centered">{{ o.PlayerPayout }}</td>
          </tr>
        </tbody>
      </table>
      <section v-if="errored">
        <p
          align="center"
        >We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
      </section>
    </div>
  </section>
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
    setInterval(this.fetchOrders, 1000);
  },
  watch: {
    myBets: function() {
      this.fetchOrders();
    }
  }
};
</script>