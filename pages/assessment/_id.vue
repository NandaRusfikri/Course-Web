<template>
  <div>
    <v-dialog max-width="450px" v-model="dialog_submit">
      <v-card class="rounded-lg">
        <v-toolbar color="secondary" dark flat dense>
          <v-toolbar-title dark><b>Submit Assessment </b></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog_submit = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-alert
          border="left"
          outlined
          colored-border
          type="warning"
          elevation="2"
        >
          Periksa Kembali jawaban sebelum Submit <br />
        </v-alert>

        <v-card-actions>
          <v-spacer />
          <v-btn
            dense
            small
            outlined
            @click="dialog_submit = false"
            color="primary"
          >
            Cancel
          </v-btn>
          <v-btn
            @click="FuncSubmitUserAssessment()"
            dense
            small
            color="primary"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-toolbar flat class="mx-4">
      <v-spacer />
      <v-toolbar-title :style="distance >= 0 ? '' : 'color:red;'"
        ><b
          >{{ CountDown.hours }}j {{ CountDown.minutes }}m
          {{ CountDown.seconds }}d</b
        ></v-toolbar-title
      >
      <v-spacer />
      <v-btn color="teal" @click="dialog_submit = true" class="white--text">
        <v-icon dark> mdi-content-save </v-icon>
        Selesai
      </v-btn>
    </v-toolbar>

    <v-row v-if="renderComponent">
      <v-col cols="12" sm="12" md="8">
        <v-card flat style="border: 1px solid red" class="rounded-lg">
          <v-card-actions v-if="DataAssessment.generate_question">
            <v-spacer />
            <v-btn
              color="secondary"
              @click="Back()"
              :disabled="selectedItem + 1 <= 1"
              >Back</v-btn
            >
            <v-btn
              color="primary"
              @click="Next()"
              :disabled="
                selectedItem + 1 >= DataAssessment.generate_question.length
              "
              >Next</v-btn
            >
            <v-spacer />
          </v-card-actions>
          <v-card-title v-if="Question">
            <span>
              <b>{{ Question.no }}</b
              >. {{ Question.question.question_text }}</span
            ></v-card-title
          >
          <v-card-text v-if="Question.question">
            <v-radio-group
              @change="FuncAddUserAnswer()"
              v-model="Question.user_answer_option_id"
            >
              <v-row v-if="Question.question.question_option">
                <v-col
                  v-for="(item_option, i) in Question.question.question_option"
                  :key="i"
                  cols="12"
                  sm="6"
                  md="6"
                  class="leadform px-0"
                >
                  <v-list-item class="px-0">
                    <v-list-item-action class="px-0 mx-2">
                      <v-radio :value="item_option.id"></v-radio>
                    </v-list-item-action>
                    <v-list-item-content class="px-0">
                      <v-list-item-title class=""
                        ><b
                          :style="
                            item_option.id == Question.user_answer_option_id
                              ? 'color:red;'
                              : ''
                          "
                          class="text-capitalize text-wrap"
                          >{{ item_option.option_label }}</b
                        >. {{ item_option.option_text }}</v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item></v-col
                ></v-row
              >
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card
          flat
          style="border: 1px solid red"
          class="mx-auto rounded-lg"
          max-width="300"
        >
          <v-list dense>
            <v-list-item-group v-model="selectedItem" color="primary">
              <template v-for="(item, i) in DataAssessment.generate_question">
                <v-list-item
                  dense
                  :key="i"
                  @click="(Question = item), (Question['no'] = i + 1)"
                >
                  <v-list-item-action> {{ i + 1 }}. </v-list-item-action>

                  <v-list-item-content>
                    <v-btn
                      v-for="ops in item.question.question_option"
                      :key="ops.id"
                      small
                      elevation="1"
                      :color="
                        ops.id == item.user_answer_option_id ? 'primary' : ''
                      "
                      >{{ ops.option_label }}</v-btn
                    >
                  </v-list-item-content>
                </v-list-item>
                <v-divider
                  v-if="i < DataAssessment.generate_question.length - 1"
                  :key="item.created_at + item.id"
                ></v-divider>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  layout: "home",
  middleware({ store, redirect }) {
    console.log("course ", store.state.token);
    if (store.state.token == undefined) {
      return redirect("/login");
    }
  },
  data() {
    return {
      DataUser: {},
      Question: {
        id: 13,

        user_assessment_id: 7,
        question_id: 6,
        question: {
          id: 6,
          question_text: "ibukota indonesia",
          duration: 60,

          file_upload: "null",
          question_option: [
            {
              id: 17,

              is_correct_answer: "",
              option_text: "jakarta",
              file_upload: "",
              question_id: 6,
              option_label: "A",
            },
            {
              id: 18,

              is_correct_answer: "",
              option_text: "Bandung",
              file_upload: "",
              question_id: 6,
              option_label: "B",
            },
          ],
        },
      },
      selectedItem: 0,
      DataAssessment: {},

      renderComponent: true,

      loading: false,

      dialog_submit: false,
      duration: 0,

      CountDown: {
        minutes: 0,
        seconds: 0,
        hours: 0,
      },
      batas: null,
      distance: null,
    };
  },
  created() {
    this.DataUser = this.$cookies.get("user");
  },

  async mounted() {
    await this.FuncGetAssessmentDetail();

    this.CountDownTimer();

    this.batas = new Date(this.DataAssessment.created_at);
    this.batas.setMinutes(this.batas.getMinutes() + this.duration);
  },
  methods: {
    CountDownTimer() {
      setTimeout(() => {
        var now = new Date().getTime();
        var distance = this.batas.getTime() - now;
        this.distance = distance;
        var hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        this.CountDown.hours = hours;
        this.CountDown.minutes = minutes;
        this.CountDown.seconds = seconds;

        this.CountDownTimer();
      }, 1000);
    },
    Next() {
      this.selectedItem = this.selectedItem + 1;
      this.Question = this.DataAssessment.generate_question[this.selectedItem];
      this.Question["no"] = this.selectedItem + 1;
    },
    Back() {
      this.selectedItem = this.selectedItem - 1;
      this.Question = this.DataAssessment.generate_question[this.selectedItem];
      this.Question["no"] = this.selectedItem + 1;
    },

    forceRerender() {
      this.renderComponent = false;
      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    async ReloadComponent() {
      this.forceRerender();
    },

    async FuncSubmitUserAssessment() {
      this.loading = true;

      await this.$req
        .post("api/v1/assessment/submit", { id: Number(this.$route.query.id) })
        .then((response) => {
          let snackbar = {
            color: "success",
            message: "Assessment Telah DiSubmit",
            enabled: true,
          };

          this.$store.commit("SET_SNACKBAR", snackbar);
          this.dialog_submit = false;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          let snackbar = {
            color: "error",
            message: error.response.data.message,
            enabled: true,
          };

          this.$store.commit("SET_SNACKBAR", snackbar);
        });
    },
    async FuncAddUserAnswer() {
      this.loading = true;

      await this.$req
        .put("api/v1/assessment/user_answer/" + this.Question.id, {
          user_answer_option_id: this.Question.user_answer_option_id,
        })
        .then((response) => {
          this.ReloadComponent();
          // let snackbar = {
          //   color: "success",
          //   message: response.data.message,
          //   enabled: true,
          // };

          // this.$store.commit("SET_SNACKBAR", snackbar);
          // this.loading = false;
        })
        .catch((error) => {
          this.dialog_add_option = false;
          this.loading = false;
          let snackbar = {
            color: "error",
            message: error.response.data.message,
            enabled: true,
          };

          this.$store.commit("SET_SNACKBAR", snackbar);
        });
    },

    async FuncGetAssessmentDetail() {
      this.loading = true;

      await this.$req
        .post("api/v1/assessment/question/" + this.$route.query.id)
        .then((response) => {
          this.DataAssessment = response.data.item;
          this.Question = this.DataAssessment.generate_question[0];
          this.Question["no"] = 1;
          this.duration = this.DataAssessment.topic.duration;
        })
        .catch((error) => {
          this.loading = false;
          let snackbar = {
            color: "error",
            message: error.response.data.message,
            enabled: true,
          };

          this.$store.commit("SET_SNACKBAR", snackbar);
        });
    },
  },
};
</script>
<style scoped>
.leadform {
  padding-bottom: 0px;
  padding-top: 0px;
}
.dropZone {
  width: 100%;
  height: 120px;
  position: relative;
  border: 3px dashed rgb(126, 115, 115);
}

.dropZone:hover {
  border: 2px solid #2e94c4;
}

.dropZone:hover .dropZone-title {
  color: #1975a0;
}

.dropZone-info {
  color: #a8a8a8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.dropZone-title {
  color: #787878;
}

.dropZone input {
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}

.dropZone-upload-limit-info {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.dropZone-over {
  background: #5c5c5c;
  opacity: 0.8;
}

.dropZone-uploaded {
  width: 100%;
  height: 120px;
  position: relative;
  border: 3px dashed rgb(126, 115, 115);
}

.dropZone-uploaded-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #a8a8a8;
  position: absolute;
  top: 50%;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
}

.removeFile {
  width: 200px;
}
</style>
