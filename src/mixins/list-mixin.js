export default {
  data() {
    return {
      dialog: false,
      loading: true,
      editedItem: {},
      editedIndex: -1,
      pagination: {
        page: 1,
        rowsPerPage: 50,
        totalItems: 0
      },
      filterParams: ''
    };
  },

  watch: {
    dialog(val) {
      if (!val) {
        this.close();
      }
    },

    pagination: {
      handler(oldVal, newVal) {
        if (!this.loading && oldVal.page !== newVal.page) {
          this.getPaginatedItems(this.filterParams, this.pagination.page);
          this.$vuetify.goTo(0, {
            duration: 900,
            easing: 'easeOutQuint'
          });
        }
      },
      deep: true
    }
  },

  methods: {
    getItems(filterParams) {
      this.$http
        .get(`${this.indexRoute}?${filterParams}`)
        .then(response => {
          if (this.storeAction) {
            this.$store.dispatch(this.storeAction, response.data);
          } else {
            this.items = response.data;
          }
          this.loading = false;
          this.$emit('finishedLoading');
        })
        .catch(() => {
          this.loading = false;
          this.$emit('finishedLoading');
        });
    },

    getPaginatedItems(filterParams, page, type) {
      let response = {};

      if (type === 'supplement') {
        response = {
          current_page: 1,
          data: [
            {
              attributes: null,
              content_type: null,
              document_date: "2019-01-16",
              document_type: "contract_supplement",
              file_name: "contract_supplement_2019_01.docx",
              id: 556,
              is_encrypted: 0,
              is_pdf: 0,
              is_signatures_needed: 0,
              is_signed_by_all_signees: 0,
              model: {
                client_id: 1,
                contract_id: 5,
                date: "2019-01-15 00:00:00",
                hourly_rate: 5,
                id: 1,
                project_id: 55,
                sprint_end: "2019-01-17 00:00:00",
                sprint_id: 148,
                sprint_start: "2019-01-15 00:00:00",
              },
              model_id: "1",
              model_type: "App\DocumentModels\ContractSupplementDocument",
              notifications: [],
              path: "documents/contract_supplement/2019/01/ee1a735afe6f7247de6a304a993ab8f0.docx",
              seen: null
            }
          ],
          from: 1,
          last_page: 1,
          per_page: 50,
          to: 1,
          total: 1
        };
      } else {
        response = {
          current_page: 1,
          data: [
            {
              attributes: null,
              content_type: null,
              document_date: '2019-01-16',
              document_type: 'contract',
              file_name: 'contract_2019_01.docx',
              id: 551,
              is_encrypted: 0,
              is_pdf: 0,
              is_signatures_needed: 0,
              is_signed_by_all_signees: 0,
              model: {
                client: {
                  address: null,
                  bank: null,
                  bank_acc_no: null,
                  code: null,
                  created_at: '2018-10-29 09:56:32',
                  created_by: 2,
                  due_period_in_days: null,
                  email: null,
                  id: 63,
                  invoice_series: null,
                  is_erp_company: false,
                  is_lead: false,
                  is_requisites: false,
                  is_supplier: false,
                  name: 'demo demo',
                  phone: null,
                  quality: 0,
                  representative_name: null,
                  representative_title: null,
                  signing_person: null,
                  support: 0,
                  timeliness: 0,
                  total_active_projects: 0,
                  total_debt_w_vat: 0,
                  total_debt_wo_vat: 0,
                  total_expenses: 21735,
                  total_projects: 0,
                  total_sales_w_vat: 0,
                  total_sales_wo_vat: 0,
                  updated_at: '2018-10-29 09:56:32',
                  updated_by: 2,
                  vat_code: null,
                  vat_payer_since: null,
                  vats: null
                },
                client_id: 63,
                date: '2019-01-16 00:00:00',
                id: 2,
                no: '123456',
                supplements: []
              },
              model_id: '2',
              model_type: 'AppDocumentModelsContractDocument',
              notifications: [],
              path:
                'documents/contract/2019/01/bf98019bcd3c2223ef27e6edfc651e0d.docx',
              seen: null
            },
            {
              attributes: null,
              content_type: null,
              document_date: '2019-01-16',
              document_type: 'contract',
              file_name: 'contract_2019_01.docx',
              id: 554,
              is_encrypted: 0,
              is_pdf: 0,
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
                date: '2019-01-17 00:00:00',
                id: 5,
                no: '123',
                supplements: [
                  {
                    client_id: 1,
                    contract_id: 5,
                    date: '2019-01-15 00:00:00',
                    document: {
                      attributes: null,
                      content_type: null,
                      document_date: '2019-01-16',
                      document_type: 'contract_supplement',
                      file_name: 'contract_supplement_2019_01.docx',
                      id: 556,
                      is_encrypted: 0,
                      is_pdf: 0,
                      is_signatures_needed: 0,
                      is_signed_by_all_signees: 0,
                      model_id: '1',
                      model_type: 'AppDocumentModelsContractSupplementDocument',
                      path:
                        'documents/contract_supplement/2019/01/ee1a735afe6f7247de6a304a993ab8f0.docx'
                    },
                    hourly_rate: 5,
                    id: 1,
                    project_id: 55,
                    sprint_end: '2019-01-17 00:00:00',
                    sprint_id: 148,
                    sprint_start: '2019-01-15 00:00:00'
                  }
                ]
              },
              model_id: '5',
              model_type: 'AppDocumentModelsContractDocument',
              notifications: [],
              path:
                'documents/contract/2019/01/bdb22145ec56b07ff67ca6acb03346a1.docx',
              seen: null
            }
          ],
          from: 1,
          last_page: 1,
          per_page: 50,
          to: 12,
          total: 12
        };
      }

      this.pagination.rowsPerPage = response.per_page;
      this.pagination.totalItems = response.total;
      this.pagination.page = response.current_page;

      if (this.storeAction) {
        this.$store.dispatch(this.storeAction, response.data);
      } else {
        this.items = response.data;
      }
      this.loading = false;
      this.$emit('finishedLoading');
    },

    filterUpdated(filterParams) {
      this.filterParams = filterParams;
      if (this.pagination.page) {
        this.getPaginatedItems(this.filterParams, 1);
      } else {
        this.getItems(this.filterParams);
      }
    },

    createItem(newItem) {
      if (this.fab) {
        // when used from speed dial on mobile, close it on click
        this.fab = false;
      }
      this.editedIndex = -1;
      this.editedItem = JSON.parse(JSON.stringify(newItem));
      this.dialog = true;
    },

    createItemSpeedDial(newItem) {
      if (
        (this.$store.state.isTouchDevice && this.fab) ||
        !this.$store.state.isTouchDevice
      ) {
        this.editedIndex = -1;
        this.editedItem = JSON.parse(JSON.stringify(newItem));
        this.dialog = true;
      }
    },

    editItem(item, index, permissions) {
      if (!permissions || (permissions && this.$can(permissions))) {
        this.editedItem = JSON.parse(JSON.stringify(item));
        this.editedIndex = index;
        this.dialog = true;
      }
    },

    dispatchEditAction(item, index) {
      this.$store.dispatch(this.editAction, {
        item,
        index
      });
    },

    deleteItem(id, index, route, permissions) {
      if (!permissions || (permissions && this.$can(permissions))) {
        this.$store.commit('openConfirmationDialog', {
          title: this.$t('general.confirmations.remove_entry')
        });
        this.$eventBus.$on('confirmationDialogClosed', confirmed => {
          if (confirmed) {
            this.$http.delete(`${route}${id}`).then(() => {
              if (this.deleteAction) {
                this.$store.dispatch(this.deleteAction, index);
              } else {
                this.items.splice(index, 1);
              }
            });
          }
          this.$eventBus.$off('confirmationDialogClosed');
        });
      }
    },

    itemCreated(item, bringToFront) {
      if (bringToFront) {
        this.items.unshift(item);
      } else {
        this.items.push(item);
      }
      this.dialog = false;
    },

    itemUpdated(item) {
      this.$set(this.items, this.editedIndex, item);
      this.dialog = false;
    },

    close(e) {
      this.dialog = false;
    },

    downloadFile(url, item, nameField) {
      this.$http({
        url,
        method: 'GET',
        responseType: 'blob'
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', item[nameField]);
        document.body.appendChild(link);
        link.click();
      });
    },

    toggleListCheckbox(item, index, field, route, method = 'put') {
      this.$set(item, field, !item[field]);
      this.$http[method](`${route}${item.id}`, item)
        .then(response => {
          if (this.updateAction) {
            this.$store.dispatch(this.updateAction, {
              index,
              item: response.data
            });
          }
        })
        .catch(() => {
          this.$set(item, field, !item[field]);
        });
    }
  }
};
