<template>
  <div :class="`users-${this.$store.state.theme}`">
    <h2>
      Users <span>{{ this.$store.state.users.length }}</span>
    </h2>

    <div class="section">
      <p class="default_message" v-if="this.$store.state.users.length == 0">
        🤷‍♂️ There are no users 🤷‍♂️
      </p>

      <UserComponnet
        v-for="(user, index) in this.$store.state.users"
        :key="index"
        :element_type="this.icon_type"
        :user_data="user"
      />
    </div>
  </div>
</template>

<script>
import UserComponnet from "./UserComponnet.vue";
export default {
  data() {
    return {};
  },
  components: {
    UserComponnet,
  },
};
</script>

<style lang="scss">
@import "../../sass/varibels";

// dark
.users-dark {
  width: 100%;
  height: 100%;

  h2 {
    width: 100%;
    height: auto;
    border-left: 10px solid $boold-blue;
    padding: 0px 5px;
    margin: 5px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $font-light;

    span {
      font-size: $small;
    }
  }

  .section {
    width: 100%;
    min-height: 100px;
    margin: 10px 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .default_message {
      width: 100%;
      height: auto;
      text-align: center;
      color: $font-light;
    }
  }
}
// dark

// light
.users-light {
  width: 100%;
  height: 100%;

  h2 {
    width: 100%;
    height: auto;
    border-left: 10px solid $boold-blue;
    padding: 0px 5px;
    margin: 5px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $font-dark;

    span {
      font-size: $small;
    }
  }

  .section {
    width: 100%;
    min-height: 100px;
    margin: 10px 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;

    .default_message {
      width: 100%;
      height: auto;
      text-align: center;
      color: $font-dark;
    }
  }
}
// light
</style>
