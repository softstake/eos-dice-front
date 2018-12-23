<template>
  <section class="section">
    <div class="container" id="results">
      <div class="tabs is-toggle is-small">
        <ul>
          <li class="is-active">
            <a>All Bets</a>
          </li>
          <li>
            <a>My Bets</a>
          </li>
        </ul>
      </div>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th class="has-text-centered">Time</th>
            <th class="has-text-centered">Better</th>
            <th class="has-text-centered">Roll Under</th>
            <th class="has-text-centered">Bet</th>
            <th class="has-text-centered">Roll</th>
            <th class="has-text-centered">Payout</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="o in orders">
            <td class="has-text-centered">21:43:34</td>
            <td class="has-text-centered">{{ o.PlayerName }}</td>
            <td class="has-text-centered">{{ o.RollUnder }}</td>
            <td class="has-text-centered">{{ o.BetAmount }}</td>
            <td class="has-text-centered">{{ o.RandomRoll }}</td>
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
      errored: false
    };
  },
  mounted() {
    axios
      .get(apiUrl, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        this.orders = response.data;
        console.log(this.orders);
      })
      .catch(e => {
        console.log(e);
        this.errored = true;
      });
  }
};
</script>