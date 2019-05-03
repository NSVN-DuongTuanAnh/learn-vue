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
      },
      element() {
        return this.type === 'textarea' ? this.type : 'input';
      }
      
  }
};
</script>
<template>
    <div class="row">
        <component :is="element" 
        :type="type" 
        :class="inputClass" 
        :name="name" 
        :value.prop="value" 
        :placeholder="placeholder" 
        v-bind="$attrs"
        @input="update"
         />
    </div>
</template>

