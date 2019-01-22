<template>
  <v-container fluid>
    <v-tabs v-show="!loading" class="elevation-1 table-wrapper">
      <v-tab @click="getPaginatedItems(filterParams, pagination.page)">{{ $t('general.contracts') }}</v-tab>
      <v-tab-item>
        <v-card>
          <app-contracts-table
            v-show="$store.state.documents.length > 0"
            :pagination="pagination"
            @newSupplement="newSupplement($event.item)"
            @pageChanged="getPaginatedItems(filterParams, $event)"
          />
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
            fab
            @click.stop="create()"
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
      persistent
    >
      <app-document-form
        :dialog="dialog"
        :client="docFormClient"
        :formOptions="templateFormOptions"
        :item="docFormItem"
        @dialogClosed="dialog = false"
        @docCreated="documentCreated"
      ></app-document-form>
    </v-dialog>
  </v-container>
</template>

<script>
import loadingMixin from '../../mixins/loading-mixin';
import listMixin from '../../mixins/list-mixin.js';
import documentListMixin from '../../mixins/document-list-mixin';
import DocumentForm from '../document-forms/DocumentForm';
import ContractsTable from './ContractsTable';

export default {
  name: 'Contracts',

  mixins: [listMixin, documentListMixin, loadingMixin],

  components: {
    appDocumentForm: DocumentForm,
    appContractsTable: ContractsTable
  },

  data() {
    return {
      fab: false,
      indexRoute: 'api/documents?document_type=contract',
      apiRoute: 'api/documents/',
      newItem: { document_type: 'contract', type: 'contract' },
      docFormItem: { document_type: 'contract', type: 'contract' },
      type: ['contract'],
      templateFormOptions: [],
      docFormClient: null,
    };
  },

  created() {
    this.getPaginatedItems();
  },

  methods: {
    documentCreated(data) {
      this.dialog = false;
      this.$store.commit('storeDocument', data);
    },

    create() {
      this.newItem = { document_type: 'contract', type: 'contract' },
      this.docFormItem = { document_type: 'contract', type: 'contract' },
      this.type = ['contract'],
      this.dialog = true;
    },

    newSupplement(data) {
      this.newItem = { document_type: 'contract_supplement', type: 'contract_supplement' },
      this.docFormItem = { document_type: 'contract_supplement', type: 'contract_supplement', date: data.model.date },
      this.type = ['contract_supplement'],
      this.docFormClient = data.model.client
      this.dialog = true;
    }
  }
};
</script>
