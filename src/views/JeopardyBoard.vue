<template>
    <v-container>
        <h1 class="text-center mb-6">{{ board.name }}</h1>
        <v-row class="mb-2">
            <v-col v-for="(category, index) in board.categories" :key="index" cols="2" class="text-center">
                <h3>{{ category.name }}</h3>
            </v-col>
        </v-row>
        <v-row>
            <v-col v-for="(category, index) in board.categories" :key="index" cols="2">
                <div v-for="(question, qIndex) in category.questions" :key="qIndex">
                    <v-btn
                        :color="question.clicked ? 'transparent' : (question.level <= 200 ? 'blue' : (question.level <= 400 ? 'green' : 'red'))"
                        dark class="question-box" :class="{ 'question-box-hidden': question.clicked }"
                        @click="openQuestionDialog(question)">
                        {{ question.level }}
                    </v-btn>
                </div>


            </v-col>
        </v-row>
    </v-container>
    <v-container>
        <!-- Players section -->
        <div class="mb-6">
            <h2>Players</h2>
            <v-form @submit.prevent="addPlayer">
                <v-text-field v-model="newPlayerName" label="Enter player name" class="mb-2" outlined dense
                    required></v-text-field>
                <v-btn type="submit" color="primary" :disabled="!newPlayerName">Add Player</v-btn>
            </v-form>
            <v-list class="mt-4">
                <v-list-item v-for="(player, index) in sortedPlayers" :key="index">
                    <v-list-item-title>{{ player.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ player.points }} points</v-list-item-subtitle>
                </v-list-item>
            </v-list>
        </div>
        <!-- Jeopardy board -->
        <v-dialog v-model="questionDialog" max-width="500px">
            <v-card>
                <v-card-title class="headline">{{ selectedQuestion?.question }}</v-card-title>
                <v-card-text v-if="!revealAnswer">{{ selectedQuestion?.answer }}</v-card-text>
                <v-card-text v-else>{{ selectedQuestion?.answer }}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-select v-if="!revealAnswer" :items="playerOptions" v-model="selectedPlayer" label="Select Player"
                        outlined></v-select>
                    <v-btn color="blue darken-1" text @click="revealAnswer = !revealAnswer">
                        {{ revealAnswer ? 'Hide Answer' : 'Reveal Answer' }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
  
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    props: ['id'],
    data() {
        return {
            newPlayerName: '',
            players: [],
            questionDialog: false,
            revealAnswer: false,
            selectedQuestion: null,
            selectedPlayer: null,
        };
    },
    computed: {
        ...mapGetters(['jwtToken', 'board']),
        sortedPlayers() {
            return this.players.slice().sort((a, b) => b.points - a.points);

        },
        playerOptions() {
            return this.sortedPlayers.map((player) => player.name).concat(['No Player']);
        },
    },
    methods: {
        ...mapActions(['fetchBoardById']),
        addPlayer() {
            this.players.push({ name: this.newPlayerName, points: 0 });
            this.newPlayerName = '';
        },
        openQuestionDialog(question) {
            this.revealAnswer = false;
            this.selectedQuestion = question;
            this.questionDialog = true;
            question.clicked = true;
        },
    },
    created() {
        this.fetchBoardById({ token: this.jwtToken, id: this.id }).then(() => {
            this.board.categories.forEach((category) => {
                category.questions.forEach((question) => {
                    this.$set(question, 'clicked', false);
                });
            });
        });
    },
};
</script>
  
<style scoped>
.question-box {
    width: 100%;
    height: 100px;
    background-color: #3f51b5;
    color: white;
    margin-bottom: 1rem;
}
.question-box-hidden {
  visibility: hidden;
}
</style>
  