<template>
 <button :class="type"><slot /></button>
</template>
<script>
 export default {
   name: 'Button',
   props: [ 'type' ],
 }
</script>