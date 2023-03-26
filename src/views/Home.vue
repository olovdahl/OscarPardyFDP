<template>
 
</template>
<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const boards = ref([]);

    onMounted(async () => {
      await store.dispatch("fetchBoards");
      boards.value = store.getters.boards;
    });

    return { boards };
  },
};
</script>