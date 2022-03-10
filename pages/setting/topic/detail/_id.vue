<template>
  <div>
    <v-dialog max-width="450px" v-model="dialog_add">
      <v-card class="rounded-lg">
        <v-toolbar color="secondary" dark flat dense>
          <v-toolbar-title dark><b>Add Question </b></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog_add = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <br />

        <v-card-text>
          <v-row>
            <v-col class="leadform" cols="12" md="12" sm="12">
              <v-textarea
                counter
                rows="3"
                :rules="[rules.counter]"
                label="Question Text"
                v-model="question.question_text"
                dense
                hint="e.g Nama Ibukota Indonesia ?"
                persistent-hint
                outlined
                flat
              ></v-textarea>
            </v-col>

            <v-col class="leadform" cols="12" md="12" sm="12">
              <v-text-field
                label="Duration"
                @keypress="isNumber()"
                v-model="question.duration"
                dense
                hint="Estimate Duration (Second)"
                persistent-hint
                outlined
                flat
              ></v-text-field>
            </v-col>
            <v-col class="leadform" cols="12" md="6" sm="6">
              <v-text-field
                label="Level"
                @keypress="isNumber()"
                v-model="question.level"
                dense
                hint="e.g Level 1"
                persistent-hint
                outlined
                flat
              ></v-text-field>
            </v-col>
            <v-col class="leadform" cols="12" md="6" sm="6">
              <v-text-field
                label="Score"
                @keypress="isNumber()"
                v-model="question.score"
                dense
                hint="e.g Score 10"
                persistent-hint
                outlined
                flat
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            dense
            small
            outlined
            @click="dialog_add = false"
            color="primary"
          >
            Cancel
          </v-btn>
          <v-btn
            :disabled="
              question.name == '' ||
              question.code == '' ||
              question.description == ''
            "
            dense
            small
            @click="FuncAddQuestion()"
            color="primary"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog max-width="450px" v-model="dialog_detail">
      <v-card class="rounded-lg">
        <v-toolbar color="secondary" dark flat dense>
          <v-toolbar-title dark><b>Info Question </b></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog_detail = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <br />

        <v-card-text>
          <v-row>
            <v-col class="leadform" cols="12" md="12" sm="12">
              <v-textarea
                counter
                rows="3"
                :rules="[rules.counter]"
                label="Question Text"
                v-model="question.question_text"
                dense
                hint="e.g Nama Ibukota Indonesia ?"
                persistent-hint
                outlined
                flat
              ></v-textarea>
            </v-col>

            <v-col class="leadform" cols="12" md="12" sm="12">
              <v-text-field
                label="Duration"
                @keypress="isNumber()"
                v-model="question.duration"
                dense
                hint="Estimate Duration (Second)"
                persistent-hint
                outlined
                flat
              ></v-text-field>
            </v-col>
            <v-col class="leadform" cols="12" md="6" sm="6">
              <v-text-field
                label="Level"
                @keypress="isNumber()"
                v-model="question.level"
                dense
                hint="e.g Level 1"
                persistent-hint
                outlined
                flat
              ></v-text-field>
            </v-col>
            <v-col class="leadform" cols="12" md="6" sm="6">
              <v-text-field
                label="Score"
                @keypress="isNumber()"
                v-model="question.score"
                dense
                hint="e.g Score 10"
                persistent-hint
                outlined
                flat
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            @click="dialog_delete_question = true"
            dense
            small
            color="error"
          >
            Delete
          </v-btn>
          <v-btn
            dense
            small
            outlined
            @click="dialog_detail = false"
            color="primary"
          >
            Cancel
          </v-btn>
          <v-btn @click="FuncUpdateQuestion()" dense small color="secondary">
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog max-width="450px" v-model="dialog_add_option">
      <v-card class="rounded-lg">
        <v-toolbar color="secondary" dark flat dense>
          <v-toolbar-title dark><b>Add Option </b></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog_add_option = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <br />

        <v-card-text>
          <v-row>
            <v-col class="leadform" cols="12" md="12" sm="12">
              <v-text-field
                counter
                :rules="[rules.counter_option_text]"
                label="Option Text"
                v-model="option.option_text"
                dense
                hint="e.g Jakarta"
                persistent-hint
                outlined
                flat
              ></v-text-field>
            </v-col>
            <v-col class="leadform" cols="12" md="6" sm="6">
              <v-select
                label="Option Label"
                v-model="option.option_label"
                dense
                :items="['A','B','C','D']"
                hint="e.g C"
                persistent-hint
                outlined
                flat
              ></v-select>
            </v-col>

            <v-col class="leadform" cols="12" md="6" sm="6">
              <v-select
                label="Is Correct Answer"
                :items="IsCorrectAnswer"
                item-value="name"
                item-text="name"
                v-model="option.is_correct_answer"
                dense
                hint="e.g YES"
                persistent-hint
                outlined
                flat
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            dense
            small
            outlined
            @click="dialog_add_option = false"
            color="primary"
          >
            Cancel
          </v-btn>
          <v-btn
            :disabled="
              option.option_label == '' ||
              option.option_text == null ||
              option.is_correct_answer == null
            "
            dense
            small
            @click="FuncAddOption()"
            color="primary"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog max-width="450px" v-model="dialog_detail_option">
      <v-card class="rounded-lg">
        <v-toolbar color="secondary" dark flat dense>
          <v-toolbar-title dark><b>Info Option </b></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog_detail_option = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <br />

        <v-card-text>
          <v-row>
            <v-col class="leadform" cols="12" md="12" sm="12">
              <v-text-field
                counter
                :rules="[rules.counter_option_text]"
                label="Option Text"
                v-model="option.option_text"
                dense
                hint="e.g Jakarta"
                persistent-hint
                outlined
                flat
              ></v-text-field>
            </v-col>
            <v-col class="leadform" cols="12" md="6" sm="6">
              <v-select
                label="Option Label"
                v-model="option.option_label"
                dense
                 :items="['A','B','C','D']"
                hint="e.g C"
                persistent-hint
                outlined
                flat
              ></v-select>
            </v-col>

            <v-col class="leadform" cols="12" md="6" sm="6">
              <v-select
                label="Is Correct Answer"
                :items="IsCorrectAnswer"
                item-value="name"
                item-text="name"
                v-model="option.is_correct_answer"
                dense
                hint="e.g YES"
                persistent-hint
                outlined
                flat
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />

          <v-btn dense small @click="dialog_delete_option = true" color="error">
            Delete
          </v-btn>
          <v-btn
            dense
            small
            outlined
            @click="dialog_detail_option = false"
            color="primary"
          >
            Cancel
          </v-btn>
          <v-btn dense small @click="FuncUpdateOption()" color="secondary">
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog max-width="450px" v-model="dialog_delete_question">
      <v-card class="rounded-lg">
        <v-toolbar color="error" dark flat dense>
          <v-toolbar-title dark><b>Delete Question </b></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog_delete_question = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <br />

        <v-card-text>
          <p class="title">
            Are Sure Want Delete {{ question.question_text }} ?
          </p>
          <p class="title">if deleted data cannot recovery!!</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            dense
            small
            outlined
            @click="dialog_delete_question = false"
            color="primary"
          >
            Cancel
          </v-btn>
          <v-btn dense small @click="FuncDeleteQuestion()" color="primary">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog max-width="450px" v-model="dialog_delete_option">
      <v-card class="rounded-lg">
        <v-toolbar color="error" dark flat dense>
          <v-toolbar-title dark><b>Delete Option </b></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog_delete_option = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <br />

        <v-card-text>
          <p class="title">
            Are Sure Want Delete <b>{{ option.option_text }}</b> ?
          </p>
          <p class="title">if deleted data cannot recovery!!</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            dense
            small
            outlined
            @click="dialog_delete_option = false"
            color="primary"
          >
            Cancel
          </v-btn>
          <v-btn dense small @click="FuncDeleteOption()" color="primary">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-toolbar flat class="mx-4">
      <v-spacer />

      <v-btn
        color="primary"
        @click="
          (dialog_add = true),
            (question.id = null),
            (question.question_text = ''),
            (question.duration = 0),
            (question.score = 0),
            (question.level = 1),
            (question.file_upload = null)
        "
        class="white--text"
      >
        <v-icon dark> mdi-plus </v-icon>
        Question
      </v-btn>
    </v-toolbar>

    <v-row v-if="renderComponent" justify="center" align="center">
      <v-col cols="12" sm="12" md="8">
        <v-expansion-panels focusable>
          <v-expansion-panel v-for="(item, i) in ListQuestion" :key="i">
            <v-expansion-panel-header class="pl-0">
              <v-toolbar flat color="#00000000" dense>
                <v-btn
                  icon
                  @click="
                    (dialog_detail = true),
                      (question.id = item.id),
                      (question.question_text = item.question_text),
                      (question.duration = item.duration),
                      (question.score = item.score),
                      (question.level = item.level),
                      (question.file_upload = item.file_upload)
                  "
                  color="secondary"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>

                <v-toolbar-title class="pl-0 ml-0 text-wrap subtitle-2">
                  <span>
                    <b>{{ i + 1 }}. </b> {{ item.question_text }}</span
                  >
                </v-toolbar-title>
                <v-spacer />
              </v-toolbar>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card flat class="mb-2">
                <v-toolbar flat class="mx-0 px-0" dense>
                  <v-toolbar-title
                    style="font-family: Comfortaa, sans-serif"
                    class="text-capitalize subtitle-2"
                    ><span
                      >duration : <b>{{ item.duration }}</b></span
                    >
                    <span
                      >level : <b>{{ item.level }}</b></span
                    >
                    <span
                      >score : <b>{{ item.score }}</b></span
                    >
                  </v-toolbar-title>
                  <v-spacer />

                  <v-btn
                    @click="
                      (dialog_add_option = true),
                        (option.option_text = ''),
                        (option.question_id = item.id),
                        (option.id = null),
                        (option.option_label = null),
                        (option.is_correct_answer = null),
                        (option.file_upload = null)
                    "
                    small
                    color="primary"
                    class="white--text"
                  >
                    <v-icon dark> mdi-plus </v-icon>
                    Option
                  </v-btn>
                </v-toolbar>
                <v-row>
                  <v-col
                    v-for="(question_option, i) in item.question_option"
                    :key="i"
                    cols="12"
                    sm="6"
                    md="6"
                    class="leadform px-0"
                  >
                    <v-list-item class="px-0">
                      <v-list-item-icon
                        @click="
                          (dialog_detail_option = true),
                            (option.option_text = question_option.option_text),
                            (option.question_id = question_option.question_id),
                            (option.id = question_option.id),
                            (option.option_label =
                              question_option.option_label),
                            (option.is_correct_answer =
                              question_option.is_correct_answer),
                            (option.file_upload = question_option.file_upload)
                        "
                        class="px-0 mx-2"
                      >
                        <v-icon small> mdi-grease-pencil </v-icon>
                      </v-list-item-icon>
                      <v-list-item-content class="px-0">
                        <v-list-item-title class="text-wrap"
                          ><b
                            :style="
                              question_option.is_correct_answer == 'YES'
                                ? 'color:red;'
                                : ''
                            "
                            class="text-capitalize"
                            >{{ question_option.option_label }}</b
                          >.
                          {{ question_option.option_text }}</v-list-item-title
                        >
                      </v-list-item-content>
                    </v-list-item></v-col
                  ></v-row
                >
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
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
      rules: {
        counter: (value) => value.length <= 100 || "Max 100 character",
        counter_option_text: (value) =>
          value.length <= 100 || "Max 100 character",
        counter_option_label: (value) => value.length <= 1 || "Max 1 character",
      },
      renderComponent: true,
      DetailCourse: null,
      loading: false,
      dragging: false,
      ListQuestion: [],
      show: false,
      dialog_add: false,
      dialog_detail: false,
      dialog_add_option: false,
      dialog_detail_option: false,
      dialog_delete_question: false,
      dialog_delete_option: false,
      question: {
        id: null,
        file_upload: null,
        question_text: "",
        duration: 0,
        score: 0,
        level: 0,
        topic_id: null,
      },
      option: {
        id: null,
        file_upload: null,
        option_text: "",
        is_correct_answer: null,
        question_id: null,
        option_label: null,
      },
      IsCorrectAnswer: [{ name: "YES" }, { name: "NO" }],
      ListType: [],
      ListLevel: [],
      ListCategory: [],
      DefaultIsActive: "Active",
    };
  },

  async mounted() {
    this.GetListQuestion();
  },
  methods: {
    onChange(e) {
      var files = e.target.files || e.dataTransfer.files;

      if (!files.length) {
        this.dragging = false;
        return;
      }

      this.createFile(files[0]);
    },
    createFile(file) {
      if (file.size > 5000000) {
        alert("please check file size no over 5 MB.");
        this.dragging = false;
        return;
      }

      this.question.photo = file;
      console.log(this.question.photo);
      this.dragging = false;
    },
    removeFile() {
      this.question.photo = "";
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    forceRerender() {
      this.renderComponent = false;
      this.$nextTick(() => {
        this.renderComponent = true;
      });
    },
    async ReloadComponent() {
      this.forceRerender();
      this.GetListQuestion();
    },
    async GetListQuestion() {
      await this.$req
        .post("api/v1/question/list", {
          order_field: "id|asc",
          search_text: "",
          topic_id: Number(this.$route.query.id),
        })
        .then((response) => {
          this.ListQuestion = response.data.items;
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
    async GetDetailCourse() {
      await this.$req
        .post("api/v1/course/" + this.$route.query.id)
        .then((response) => {
          this.DetailCourse = response.data.item;
          this.ListQuestion = response.data.item.question;
          this.$store.commit("SET_HEADER", response.data.item.name);
          this.$store.commit("SET_SUB_HEADER", response.data.item.code);
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
    async FuncAddQuestion() {
      this.loading = true;
      let formData = new FormData();

      formData.append("question_text", this.question.question_text);
      formData.append("duration", this.question.duration);
      formData.append("score", this.question.score);
      formData.append("level", this.question.level);
      formData.append("topic_id", this.$route.query.id);
      formData.append("file_upload", this.question.file_upload);

      await this.$req
        .post("api/v1/question", formData)
        .then((response) => {
          var question = {
            id: null,
            file_upload: null,
            question_text: "",
            duration: 0,
            score: 0,
            level: 1,
            topic_id: null,
          };
          this.question = question;
          this.ReloadComponent();
          let snackbar = {
            color: "success",
            message: response.data.message,
            enabled: true,
          };

          this.$store.commit("SET_SNACKBAR", snackbar);
          this.dialog_add = false;
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
    async FuncUpdateQuestion() {
      this.loading = true;
      let formData = new FormData();

      formData.append("question_text", this.question.question_text);
      formData.append("duration", this.question.duration);
      formData.append("score", this.question.score);
      formData.append("level", this.question.level);
      formData.append("topic_id", this.$route.query.id);
      if (this.question.file_upload) {
        formData.append("file_upload", this.question.file_upload);
      }

      await this.$req
        .put("api/v1/question/" + this.question.id, formData)
        .then((response) => {
          var question = {
            id: null,
            file_upload: null,
            question_text: "",
            duration: 0,
            score: 0,
            level: 1,
            topic_id: null,
          };
          this.question = question;
          this.ReloadComponent();
          let snackbar = {
            color: "success",
            message: response.data.message,
            enabled: true,
          };

          this.$store.commit("SET_SNACKBAR", snackbar);
          this.dialog_detail = false;
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
    async FuncAddOption() {
      this.loading = true;
      let formData = new FormData();

      formData.append("option_text", this.option.option_text);
      formData.append("option_label", this.option.option_label.toUpperCase());
      formData.append("is_correct_answer", this.option.is_correct_answer);
      formData.append("question_id", this.option.question_id);
      if (this.option.file_upload) {
        formData.append("file_upload", this.option.file_upload);
      }

      await this.$req
        .post("api/v1/question_option", formData)
        .then((response) => {
          var option = {
            id: null,
            file_upload: null,
            option_text: "",
            option_label: null,
            is_correct_answer: null,
            question_id: null,
          };
          this.option = option;
          this.ReloadComponent();
          let snackbar = {
            color: "success",
            message: response.data.message,
            enabled: true,
          };

          this.$store.commit("SET_SNACKBAR", snackbar);
          this.dialog_add_option = false;
          this.loading = false;
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
    async FuncUpdateOption() {
      this.loading = true;
      let formData = new FormData();

      formData.append("option_text", this.option.option_text);
      formData.append("option_label", this.option.option_label.toUpperCase());
      formData.append("is_correct_answer", this.option.is_correct_answer);
      formData.append("question_id", this.option.question_id);
      if (this.option.file_upload) {
        formData.append("file_upload", this.option.file_upload);
      }

      await this.$req
        .put("api/v1/question_option/" + this.option.id, formData)
        .then((response) => {
          var option = {
            id: null,
            file_upload: null,
            option_text: "",
            option_label: null,
            is_correct_answer: null,
            question_id: null,
          };
          this.option = option;
          this.ReloadComponent();
          let snackbar = {
            color: "success",
            message: response.data.message,
            enabled: true,
          };

          this.$store.commit("SET_SNACKBAR", snackbar);
          this.dialog_detail_option = false;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.dialog_detail_option = false;
          let snackbar = {
            color: "error",
            message: error.response.data.message,
            enabled: true,
          };

          this.$store.commit("SET_SNACKBAR", snackbar);
        });
    },
    async FuncDeleteQuestion() {
      this.loading = true;

      await this.$req
        .delete("api/v1/question/" + this.question.id)
        .then((response) => {
          this.ReloadComponent();
          let snackbar = {
            color: "success",
            message: response.data.message,
            enabled: true,
          };

          this.$store.commit("SET_SNACKBAR", snackbar);
          this.dialog_delete_question = false;
          this.dialog_detail = false;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.dialog_delete_question = false;
          let snackbar = {
            color: "error",
            message: error.response.data.message,
            enabled: true,
          };

          this.$store.commit("SET_SNACKBAR", snackbar);
        });
    },
    async FuncDeleteOption() {
      this.loading = true;

      await this.$req
        .delete("api/v1/question_option/" + this.option.id)
        .then((response) => {
          this.ReloadComponent();
          let snackbar = {
            color: "success",
            message: response.data.message,
            enabled: true,
          };

          this.$store.commit("SET_SNACKBAR", snackbar);
          this.dialog_delete_option = false;
          this.dialog_detail_option = false;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          this.dialog_delete_option = false;
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
