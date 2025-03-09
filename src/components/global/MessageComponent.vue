<template>
  <div
    :class="`message-${this.$store.state.message.type}-${this.$store.state.message_status}`"
  >
    <p :class="this.$store.state.theme">
      {{ this.$store.state.message.type == "error" ? "🚨" : "✅" }} :
      {{ this.$store.state.message.message }}
    </p>
    <icon
      icon="xmark"
      :id="this.$store.state.theme"
      @click="this.$store.commit('CloseMessage')"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import "../../sass/varibels";
// success
.message-success-open {
  width: 60%;
  min-height: 60px;
  max-height: 100px;
  opacity: 1;
  border-radius: 5px;
  background-color: $success-message-body;
  border: 1px solid $success-message-body;
  backdrop-filter: blur(20px);
  padding: 5px;
  position: fixed;
  left: 10px;
  bottom: 10px;
  z-index: 20;
  transition-duration: 0.5s;

  .dark {
    font-size: $medium;
    color: $font-light;
    width: 80%;
  }

  .light {
    @extend .dark;
    color: $font-dark;
  }

  #dark {
    position: absolute;
    right: 10px;
    top: 10px;
    color: $font-light;
    cursor: pointer;
  }

  #light {
    position: absolute;
    right: 10px;
    top: 10px;
    color: $font-dark;
    cursor: pointer;
  }

  @media (max-width: $phone) {
    width: 90%;

    .dark {
      font-size: $small;
      color: $font-light;
      width: 80%;
    }

    .light {
      font-size: $small;
      color: $font-dark;
      width: 80%;
    }
  }
}

.message-success-close {
  @extend .message-success-open;
  left: -100%;
  opacity: 0;
}
// success

// error
.message-error-open {
  width: 60%;
  min-height: 60px;
  max-height: 100px;
  opacity: 1;
  border-radius: 5px;
  background-color: $error-message-body;
  border: 1px solid $error-message-body;
  backdrop-filter: blur(20px);
  padding: 5px;
  position: fixed;
  left: 10px;
  bottom: 10px;
  z-index: 20;
  transition-duration: 0.5s;

  .dark {
    font-size: $medium;
    color: $font-light;
    width: 80%;
  }

  .light {
    @extend .dark;
    color: $font-dark;
  }

  #dark {
    position: absolute;
    right: 10px;
    top: 10px;
    color: $font-light;
    cursor: pointer;
  }

  #light {
    position: absolute;
    right: 10px;
    top: 10px;
    color: $font-dark;
    cursor: pointer;
  }

  @media (max-width: $phone) {
    width: 90%;

    .dark {
      font-size: $small;
      color: $font-light;
      width: 80%;
    }

    .light {
      font-size: $small;
      color: $font-dark;
      width: 80%;
    }
  }
}

.message-error-close {
  @extend .message-error-open;
  left: -100%;
  opacity: 0;
}
// error
</style>
