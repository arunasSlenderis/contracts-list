<template>
  <v-card>
    <v-card-text>
      <v-form>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex class="form-group-header" style="margin-top: 0" xs12>
              <h3 class="title">Document</h3>
            </v-flex>

            <v-flex xs12>
              <v-select
                v-model="item.type"
                :items="docTypes"
                :name="item.type"
                label="Doc. type"
                :disabled="disabled"
                @input="getFormConfig"
              ></v-select>
            </v-flex>

            <template v-if="item.type">
              <v-flex xs12 sm6 v-for="config in settings" :key="config.field">
                <app-form-field
                  v-if="updatedDocument[config.depends_on] || !config.depends_on || (client && config.depends_on === 'client_id')"
                  :item="item"
                  :client="client"
                  :contract="contract"
                  :supplement="supplement"
                  :findDependency="updatedDocument[config.depends_on]"
                  :backendErrors="backendErrors[config.field]"
                  :settings="config"
                  @dataUpdated="updateItem"
                ></app-form-field>
              </v-flex>
            </template>
          </v-layout>
        </v-container>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat @click.native="close('cancel')">{{ $t('general.controls.cancel') }}</v-btn>
      <v-btn
        color="primary"
        flat
        @click.native="save"
        :disabled="requestPending"
      >{{ $t('general.controls.save') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import formMixin from '../../mixins/form-mixin';
import FormField from './FormField';

export default {
  name: 'DocumentForm',

  mixins: [formMixin],

  provide() {
    return { parentValidator: this.$validator };
  },

  props: ['client', 'item', 'formOptions', 'contract', 'supplement'],

  components: {
    appFormField: FormField
  },

  data() {
    return {
      updatedDocument: {},
      settings: [],
      selectedDocType: '',
      apiRoute: 'demo',
      docTypes: [],
      disabled: false
    };
  },

  created() {
    if (this.client && this.client.id) {
      this.updatedDocument.client_id = this.client.id;
      this.updatedDocument.client = this.client;
    }

    //mocking
    this.docTypes = [
      {
        text: this.$t('documents.employee_document_types.contract'),
        value: 'contract'
      },
      {
        text: this.$t('documents.employee_document_types.contract_supplement'),
        value: 'contract_supplement'
      }
    ];
    this.settings = this.formOptions || [];
    if (this.item.type) {
      this.disabled = true;
      this.getFormConfig(this.item.type);
    }
  },

  computed: {
    backendErrors() {
      const errors = {};
      this.settings.forEach(s => {
        errors[s.field] = [];
      });
      return errors;
    },

    document() {
      return { ...this.item, ...this.updatedDocument };
    }
  },

  methods: {
    save() {
      this.$validator.validate().then(passed => {
        if (passed) {
          // mocking
          const response = {
            content_type: null,
            document_date: '2019-01-22',
            document_type: 'contract',
            file_name: 'contract_2019_01.pdf',
            id: 579,
            is_encrypted: false,
            is_signatures_needed: 0,
            is_signed_by_all_signees: 0,
            model: {
              client: {
                address: 'adresa',
                bank: 'banka',
                bank_acc_no: 'LT12354569875',
                code: 123546,
                created_at: '2018-04-24 13:41:18',
                created_by: 2,
                due_period_in_days: null,
                email: 'info@mail.comm',
                id: 1,
                invoice_series: null,
                is_erp_company: false,
                is_lead: false,
                is_requisites: false,
                is_supplier: false,
                name: 'Demo 1',
                phone: '86000000',
                quality: 0,
                representative_name: 'Vardenis Pavardeni',
                representative_title: 'vadova',
                signing_person: null,
                support: 0,
                timeliness: 0,
                total_active_projects: '0',
                total_debt_w_vat: 3366.95,
                total_debt_wo_vat: 2906,
                total_expenses: 75251,
                total_projects: 1,
                total_sales_w_vat: 7019.94,
                total_sales_wo_vat: 5925,
                updated_at: '2018-10-24 14:51:34',
                updated_by: 2,
                vat_code: '123',
                vat_payer_since: '2018-10-18'
              },
              client_id: 1,
              date: '2019-01-10 00:00:00',
              id: 16,
              no: 'gdg',
              supplements: []
            },
            model_id: 16,
            model_type: 'AppDocumentModelsContractDocument',
            path:
              'documents/contract/2019/01/4439089c8e188905842227a372ed44c2.pdf'
          };

          this.$emit('docCreated', response);
        }
      });
    },

    getFormConfig(type) {
      // mocking
      if (type === 'contract') {
        this.settings = [
          {
            field: 'no',
            label: 'Number',
            match: '[[label=Number&&field=no&&type=text]]',
            type: 'text'
          },
          {
            field: 'date',
            label: 'Date',
            match: '[[label=Date&&field=date&&type=date]]',
            type: 'date'
          },
          {
            display_field: ['name', 'id'],
            field: 'client_id',
            find_route: '/api/clients/find/',
            label: 'Client',
            match:
              '[[label=Client&&field=client_id&&type=autocomplete&&model=client&&display_field=name|id&&find_route=/api/clients/find/]]',
            model: 'client',
            type: 'autocomplete'
          }
        ];
      }

      if (type === 'contract_supplement') {
        this.settings = [
          {
            field: 'date',
            label: 'Date',
            match: '[[label=Date&&field=date&&type=date]]',
            type: 'date'
          },
          {
            display_field: ['name', 'id'],
            field: 'client_id',
            find_route: '/api/clients/find/',
            label: 'Client',
            match:
              '[[label=Client&&field=client_id&&type=autocomplete&&model=client&&display_field=name|id&&find_route=/api/clients/find/]]',
            model: 'client',
            type: 'autocomplete'
          },
          {
            depends_on: "client_id",
            display_field: ["no", "id"],
            field: "contract_id",
            find_route: "/api/find/ContractDocument/no/",
            label: "Contract",
            match: "[[label=Contract&&field=contract_id&&type=autocomplete&&model=contract&&display_field=no|id&&find_route=/api/find/ContractDocument/no/&&depends_on=client_id]]",
            model: "contract",
            type: "autocomplete"
          },
          {
            depends_on: "client_id",
            display_field: ["title", "id"],
            field: "project_id",
            find_route: "/api/find/Project/title/",
            label: "Project",
            match: "[[label=Project&&field=project_id&&type=autocomplete&&model=project&&display_field=title|id&&find_route=/api/find/Project/title/&&depends_on=client_id]]",
            model: "project",
            type: "autocomplete"
          },
          {
            depends_on: "project_id",
            display_field: ["sprint_name", "id"],
            field: "sprint_id",
            find_route: "/api/find/ProjectSprint/sprint_name/",
            label: "Sprint",
            match: "[[label=Sprint&&field=sprint_id&&type=autocomplete&&model=sprint&&display_field=sprint_name|id&&find_route=/api/find/ProjectSprint/sprint_name/&&depends_on=project_id]]",
            model: "sprint",
            type: "autocomplete"
          }
        ];
      }
    },

    updateItem(data) {
      this.updatedDocument = { ...this.updatedDocument, ...data };
    }
  }
};
</script>
