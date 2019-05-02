<script >
export default {
  props: {
    name: {
      type: String
    },
    type: {
      type: String,
      default: "text"
    },
    value: {
      required: true
    },
    placeholder: {
      type: String
    },
    invalid:{
        type:Boolean,
        default: false
    }
  },
  methods:{
      update(event) {
         this.$emit('input', event.currentTarget.value);
      }
  },
  computed:{
      inputClass() {
          return {
              'invalid': this.invalid
          }
      }
  }
};
</script>
<template>
    <div class="row">
        <input :type="type" :class="inputClass" :name="name" :value.prop="value" :placeholder="placeholder" @input="update" />
    </div>
</template>

