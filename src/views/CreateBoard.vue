<template>
  <v-container>
    <v-card class="mx-auto" max-width="1800">
      <v-card-title>Create Jeopardy Board</v-card-title>
      <v-card-text>
        <v-simple-table class="jeopardy-table">
          <template v-slot:default>
            <thead>
              <tr>
                <th></th>
                <th v-for="(category, index) in categories" :key="index">Category {{ index + 1 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Category Name</td>
                <td v-for="(category, index) in categories" :key="index">
                  <v-text-field v-model="categories[index].name" label="Name" dense outlined />
                </td>
              </tr>
              <template v-for="level in levels">
                <tr>
                  <td>Level {{ level }}</td>
                  <td v-for="(category, index) in categories" :key="index">
                    <v-text-field
                      v-model="categories[index].questions[level / 100 - 1].question"
                      label="Question"
                      dense
                      outlined
                    />
                    <v-text-field
                      v-model="categories[index].questions[level / 100 - 1].answer"
                      label="Answer"
                      dense
                      outlined
                    />
                  </td>
                </tr>
              </template>
            </tbody>
          </template>
        </v-simple-table>
        <v-btn @click="submitBoard" color="primary">Submit</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      valid: true,
      boardName: '',
      nameRules: [(v) => !!v || 'Name is required'],
      categories: Array.from({ length: 5 }, () => ({
        name: '',
        questions: Array.from({ length: 5 }, (_, i) => ({
          level: (i + 1) * 100,
          question: '',
          answer: '',
        })),
      })),
      levels: [100, 200, 300, 400, 500],
    };
  },
  computed: {
    ...mapGetters(['jwtToken']),
  },
  methods: {
    ...mapActions(['createBoard']),
    async submitBoard() {
      if (!this.$refs.form.validate()) return;

      const board = {
        name: this.boardName,
        categories: this.categories,
      };

      try {
        await this.createBoard({ token: this.jwtToken, board });
        this.$router.push('/boards');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style>
.jeopardy-table {
  width: 100%;
  table-layout: fixed;
}

.jeopardy-table td,
.jeopardy-table th {
  padding: 8px;
  text-align: center;
  width: 200px;
}

.jeopardy-table td:first-child,
.jeopardy-table th:first-child {
  width: 150px;
}
</style>