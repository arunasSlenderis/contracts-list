<template>

  <v-container fluid>
    <v-tabs v-show="!loading" class="elevation-1 table-wrapper">
      <v-tab @click="getPaginatedItems(filterParams, pagination.page)">
        Contract supplements
      </v-tab>
      <v-tab-item>
        <v-card>
          <v-card-title>
            <div style="display: flex; flex-direction: column;">
              <div v-if="docFormClient">{{ $t('general.client') }}: <strong>{{ docFormClient.name }}</strong></div>
              <div v-if="docFormContract">{{ $t('documents.general.contract_no') }}</div>
            </div>
          </v-card-title>

          <app-contract-supplements-table
            v-show="$store.state.documents.length > 0"
            :pagination="pagination"
            @pageChanged="getPaginatedItems(filterParams, $event)"
          />

          <no-data v-if="$store.state.documents.length === 0" no-elevation/>
        </v-card>
      </v-tab-item>
    </v-tabs>

    <v-scale-transition origin="center">
      <v-speed-dial
        v-if="showPrimaryActionButton"
        v-model="fab"
        :open-on-hover="!$store.state.isTouchDevice"
        bottom
        right
        fixed
      >
        <v-tooltip slot="activator" lazy left>
          <v-btn
            slot="activator"
            v-model="fab"
            color="primary"
            dark
            fab
            @click.stop="createItemSpeedDial(newItem)"
          >
            <v-icon color="secondary">add</v-icon>
            <v-icon color="secondary">comment</v-icon>
          </v-btn>
          <span>{{ $t('documents.controls.create_from_template') }}</span>
        </v-tooltip>
      </v-speed-dial>
    </v-scale-transition>

    <v-dialog
      v-if="dialog"
      v-model="dialog"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      max-width="800px"
      lazy
      scrollable
      persistent>

      <app-document-form
        :dialog="dialog"
        :client="docFormClient"
        :contract="docFormContract"
        :supplement="docFormSupplement"
        :formOptions="templateFormOptions"
        :item="docFormItem"
        @dialogClosed="close"
        @docCreated="documentCreated"
      ></app-document-form>
    </v-dialog>

  </v-container>
</template>

<script>
import loadingMixin from '../../mixins/loading-mixin';
import listMixin from '../../mixins/list-mixin';
import documentListMixin from '../../mixins/document-list-mixin';
import DocumentForm from '../document-forms/DocumentForm';
import ContractSupplementsTable from './ContractSupplementsTable';

export default {
  name: 'Contracts',

  mixins: [listMixin, documentListMixin, loadingMixin],

  components: {
    appDocumentForm: DocumentForm,
    appContractSupplementsTable: ContractSupplementsTable,
  },

  data() {
    return {
      fab: false,
      indexRoute: `api/documents?document_type=contract_supplement&contract_id=${this.$router.currentRoute.params.id}`,
      apiRoute: 'api/documents/',
      newItem: { document_type: 'contract_supplement', type: 'contract_supplement' },
      docFormItem: { document_type: 'contract_supplement', type: 'contract_supplement' },
      type: ['contract_supplement'],
      dataToFilter: {
        document_date_from: null,
        document_date_to: null,
        chipData: {}
      },
      templateDialog: false,
      templateFormOptions: [],
      docFormClient: null,
      docFormContract: null,
      docFormSupplement: null
    };
  },

  created() {
    this.getPaginatedItems(this.filterParams, this.pagination.page, 'supplement');
    this.docFormClient = this.$store.state.documents[0].model.client || null;
  },

  methods: {
    close(openNewDocDialog) {
      this.templateDialog = false;
      this.dialog = false;
      if (openNewDocDialog === 'cancel') return;
      if (openNewDocDialog) this.dialog = true;;
    },

    documentCreated(data) {
      this.dialog = false;
      this.$store.commit('storeDocument', data);
    },

    openNewTemplateForm() {
      this.templateDialog = true;
    }
  }

};
</script>
