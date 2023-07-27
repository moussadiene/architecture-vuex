<template>
    <div class="container">
      <v-row>
        <v-col cols="10" sm="10" offset-sm="1">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="ma-2" color="primary" dark v-bind="attrs" v-on="on">
                Ajouter un todo
                <v-icon dark right> mdi-plus-box </v-icon>
              </v-btn>
            </template>
  
            <v-card>
              <v-toolbar>
                <v-toolbar-title>
                  <h2 color="primary">Nouveau todo</h2></v-toolbar-title
                >
                <v-spacer></v-spacer>
                <v-btn icon small @click="clear">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <v-container>
                  <form @submit.prevent="AjoutModule">
                    <v-row>
                      <v-col>
                        <validation-observer ref="observer" v-slot="{ invalid }">
                          <validation-provider
                            v-slot="{ errors }"
                            name="Libelle"
                            rules="required|max:100"
                          >
                            <v-text-field
                              v-model="libelle"
                              :counter="100"
                              length="100"
                              :error-messages="errors"
                              label="Libelle *"
                              required
                            ></v-text-field>
                          </validation-provider>
                          <validation-provider
                            v-slot="{ errors }"
                            name="Ordre"
                            :rules="{
                              required: true,
                              numeric: true,
                              //regex: '^(70|77|78|76|33)\\d{7}$',
                            }"
                          >
                            <v-text-field
                              v-model="ordre"
                              :counter="9"
                              :error-messages="errors"
                              label="Numero d'ordre *"
                              required
                            ></v-text-field>
                          </validation-provider>
  
                          <small>*indique les champs obligatoire</small>
  
                          <v-col class="text-right">
                            <v-btn @click="clear" color="#777"> Annuler </v-btn>
                            <v-btn
                              type="submit"
                              :disabled="invalid"
                              color="success"
                            >
                              Envoyer
                            </v-btn>
                          </v-col>
                        </validation-observer>
                      </v-col>
                    </v-row>
                  </form>
                </v-container>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col cols="10" sm="10" offset-sm="1">
          <v-card>
            <v-toolbar class="mb-5" light>
              <v-toolbar-title> Liste des todos </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon small>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
  
            <v-list
              subheader
              two-line
              v-for="todo in todos"
              :key="todo.ordre"
            >
              <v-row>
                <v-col cols="9">
                  <v-subheader
                    ><v-list-item-avatar>
                      <v-icon color="warning" dark> mdi-folder </v-icon>
                    </v-list-item-avatar>
                    {{ todo.ordre }} - {{ todo.libelle }}</v-subheader
                  >
                </v-col>
                <v-col cols="3">
                  <router-link
                    class="router-link"
                    :to="{ name: 'Questions', params: { todo: todo } }"
                  >
                    <v-btn text icon>
                      <v-icon color="primary" dark> mdi-help-circle </v-icon>
                    </v-btn>
                  </router-link>
                  <router-link
                    :to="{ name: 'editModule', params: { todo: todo } }"
                  >
                    <v-btn text icon color="info">
                      <v-icon>mdi-square-edit-outline</v-icon>
                    </v-btn>
                  </router-link>
  
                  <v-btn
                    class="ma-2"
                    text
                    icon
                    color="danger"
                    @click="supprimerModule(todo)"
                  >
                    <v-icon>mdi-trash-can-outline</v-icon>
                  </v-btn>
                </v-col>
                <v-divider inset></v-divider>
              </v-row>
            </v-list>
            <!-- <v-pagination v-model="page" :length="4" circle></v-pagination> -->
          </v-card>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script>
  import "../../plugins/vee-validate";
  
  import { mapGetters, mapState, mapActions } from "vuex";
  
  export default {
    name: "Modules",
    data: () => ({
      content: "",
      dialog: false,
      libelle: "",
      ordre: null,
      status: false,
      todo: {},
    }),
  
    methods: {
      clear() {
        this.libelle = "";
        this.ordre = "";
        this.$refs.observer.reset();
        this.dialog = false;
      },
      AjoutModule() {
        this.dialog = false;
        this.$refs.observer.validate();
        this.$store.dispatch("todos/addModuleAction", {
          libelle: this.libelle,
          ordre: this.ordre,
        });
        this.libelle = "";
        this.order = "";
      },
      async supprimerModule(todo) {
        this.$store.dispatch("todos/removeModuleAction", {
          todo: todo,
        });
      },
    },
  
    computed: {
      ...mapState("todos", ["todos"]),
    },
    created() {
      this.$store.dispatch("todos/getAllModules");
    },
    mounted() {},
  };
  </script>
  
  <style>
  a {
    text-decoration: none;
  }
  </style>