<template>
  <div class="dropdown" :class="{ 'is-active': showLangs }">
    <div class="dropdown-trigger">
      <a
        class="select-locale"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        @click="showLangs = !showLangs"
        @blur="showLangs = false"
      >
        <span class="icon">
          <flag :iso="active.flag"/>
        </span>
        <span>{{ active.title }}</span>
        <span class="icon icon-down is-small">
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <a v-for="(l, index) in locales" :key="index" class="dropdown-item" @click="active=l">
          <span class="icon">
            <flag :iso="l.flag"/>
          </span>
          {{ l.title }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "languageSwitcher",
  data() {
    return {
      showLangs: false,
      locales: [
        { flag: "gb", language: "en", title: "English" },
        { flag: "ru", language: "ru", title: "Русский" }
      ],
      active: undefined
    };
  },
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale;
      this.showLangs = false;
      this.$store.commit("UPDATE_LOCALE", this.active);
    }
  },
  created() {
    this.active = this.$store.state.locale ? this.$store.state.locale : this.locales[0];
  },
  watch: {
    active: function() {
          this.changeLocale(this.active.language);
    }
  }
};
</script>