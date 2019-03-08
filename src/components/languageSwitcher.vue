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
        <a v-for="(l, index) in languages" :key="index" class="dropdown-item" @click="active=l">
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
      languages: [
        { flag: "gb", language: "en", title: "English" },
        { flag: "ru", language: "ru", title: "Русский" }
      ],
      active: null
    };
  },
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale;
    }
  },
  created() {
    const en = this.languages[0];
    this.active = en;
  },
  watch: {
    active: function() {
      this.changeLocale(this.active.language);
    }
  }
};
</script>