import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';
import { FiSettings } from 'react-icons/fi';

import './DataTableDemo.scss';

import { Button } from 'interfaces/views/.components/Button';
import { Calendar } from 'interfaces/views/.components/Calendar';
import { Column } from 'interfaces/views/.components/Column';
import { DataTable } from 'interfaces/views/.components/DataTable';
import { Dropdown } from 'interfaces/views/.components/Dropdown';
import { InputText } from 'interfaces/views/.components/InputText';
import { MultiSelect } from 'interfaces/views/.components/MultiSelect';
import { ProgressBar } from 'interfaces/views/.components/ProgressBar';
import { ContextMenu } from 'interfaces/views/.components/ContextMenu';

import { CustomerService } from './services/CustomerService';

export class DataTableDemo extends Component {
  constructor() {
    super();
    this.state = {
      customers: null,
      selectedCustomers: null,
      globalFilter: null,
      selectedRepresentatives: null,
      representatives: [
        { name: 'Amy Elsner', image: 'amyelsner.png' },
        { name: 'Anna Fali', image: 'annafali.png' },
        { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
        { name: 'Onyama Limba', image: 'onyamalimba.png' },
        { name: 'Stephen Shaw', image: 'stephenshaw.png' },
        { name: 'XuXue Feng', image: 'xuxuefeng.png' }
      ],
      dateFilter: null,
      selectedStatus: null,
      statuses: ['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'],
      items: [
        {
          label: 'File',
          icon: 'pi pi-fw pi-file',
          items: [
            {
              label: 'New',
              icon: 'pi pi-fw pi-plus',
              items: [
                {
                  label: 'Bookmark',
                  icon: 'pi pi-fw pi-bookmark'
                },
                {
                  label: 'Video',
                  icon: 'pi pi-fw pi-video'
                }
              ]
            },
            {
              label: 'Delete',
              icon: 'pi pi-fw pi-trash'
            },
            {
              separator: true
            },
            {
              label: 'Export',
              icon: 'pi pi-fw pi-external-link'
            }
          ]
        },
        {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
            {
              label: 'Left',
              icon: 'pi pi-fw pi-align-left'
            },
            {
              label: 'Right',
              icon: 'pi pi-fw pi-align-right'
            },
            {
              label: 'Center',
              icon: 'pi pi-fw pi-align-center'
            },
            {
              label: 'Justify',
              icon: 'pi pi-fw pi-align-justify'
            }
          ]
        },
        {
          label: 'Users',
          icon: 'pi pi-fw pi-user',
          items: [
            {
              label: 'New',
              icon: 'pi pi-fw pi-user-plus'
            },
            {
              label: 'Delete',
              icon: 'pi pi-fw pi-user-minus'
            },
            {
              label: 'Search',
              icon: 'pi pi-fw pi-users',
              items: [
                {
                  label: 'Filter',
                  icon: 'pi pi-fw pi-filter',
                  items: [
                    {
                      label: 'Print',
                      icon: 'pi pi-fw pi-print'
                    }
                  ]
                },
                {
                  icon: 'pi pi-fw pi-bars',
                  label: 'List'
                }
              ]
            }
          ]
        },
        {
          label: 'Events',
          icon: 'pi pi-fw pi-calendar',
          items: [
            {
              label: 'Edit',
              icon: 'pi pi-fw pi-pencil',
              items: [
                {
                  label: 'Save',
                  icon: 'pi pi-fw pi-calendar-plus'
                },
                {
                  label: 'Delete',
                  icon: 'pi pi-fw pi-calendar-minus'
                }
              ]
            },
            {
              label: 'Archieve',
              icon: 'pi pi-fw pi-calendar-times',
              items: [
                {
                  label: 'Remove',
                  icon: 'pi pi-fw pi-calendar-minus'
                }
              ]
            }
          ]
        },
        {
          separator: true
        },
        {
          label: 'Quit',
          icon: 'pi pi-fw pi-power-off'
        }
      ]
    };

    this.customerService = new CustomerService();

    //body cells
    this.countryBodyTemplate = this.countryBodyTemplate.bind(this);
    this.representativeBodyTemplate = this.representativeBodyTemplate.bind(this);
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
    this.activityBodyTemplate = this.activityBodyTemplate.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);

    //filters
    this.representativeItemTemplate = this.representativeItemTemplate.bind(this);
    this.onRepresentativeFilterChange = this.onRepresentativeFilterChange.bind(this);
    this.onDateFilterChange = this.onDateFilterChange.bind(this);
    this.filterDate = this.filterDate.bind(this); //custom filter function
    this.statusItemTemplate = this.statusItemTemplate.bind(this);
    this.onStatusFilterChange = this.onStatusFilterChange.bind(this);
  }

  componentDidMount() {
    this.customerService.getCustomersLarge().then(data => this.setState({ customers: data }));
  }

  renderHeader() {
    return (
      <div>
        List of Customers
        <div className="p-datatable-globalfilter-container">
          <InputText type="search" onInput={e => this.setState({ globalFilter: e.target.value })} placeholder="Global Search" />
        </div>
      </div>
    );
  }

  activityBodyTemplate(rowData) {
    return <ProgressBar value={rowData.activity} showValue={false} />;
  }

  actionBodyTemplate() {
    return (
      <Button type="button" className="p-button-secondary">
        <FiSettings />
      </Button>
    );
  }

  statusBodyTemplate(rowData) {
    return <span className={classNames('customer-badge', 'status-' + rowData.status)}>{rowData.status}</span>;
  }

  countryBodyTemplate(rowData) {
    return (
      <>
        <img src="img/flag_placeholder.png" className={classNames('flag', 'flag-' + rowData.country.code)} />
        <span style={{ verticalAlign: 'middle', marginLeft: '.5em' }}>{rowData.country.name}</span>
      </>
    );
  }

  representativeBodyTemplate(rowData) {
    const src = 'img/avatar/' + rowData.representative.image;

    return (
      <>
        <img alt={rowData.representative.name} src={src} width="32" style={{ verticalAlign: 'middle' }} />
        <span style={{ verticalAlign: 'middle', marginLeft: '.5em' }}>{rowData.representative.name}</span>
      </>
    );
  }

  renderRepresentativeFilter() {
    return (
      <MultiSelect
        className="p-column-filter"
        value={this.state.selectedRepresentatives}
        options={this.state.representatives}
        onChange={this.onRepresentativeFilterChange}
        itemTemplate={this.representativeItemTemplate}
        placeholder="All"
        optionLabel="name"
        optionValue="name"
      />
    );
  }

  representativeItemTemplate(option) {
    const src = 'img/avatar/' + option.image;

    return (
      <div className="p-multiselect-representative-option">
        <img alt={option.name} src={src} width="32" style={{ verticalAlign: 'middle' }} />
        <span style={{ verticalAlign: 'middle', marginLeft: '.5em' }}>{option.name}</span>
      </div>
    );
  }

  onRepresentativeFilterChange(event) {
    this.dt.filter(event.value, 'representative.name', 'in');
    this.setState({ selectedRepresentatives: event.value });
  }

  renderDateFilter() {
    return (
      <Calendar
        value={this.state.dateFilter}
        onChange={this.onDateFilterChange}
        placeholder="Registration Date"
        dateFormat="yy-mm-dd"
        className="p-column-filter"
      />
    );
  }

  onDateFilterChange(event) {
    if (event.value !== null) this.dt.filter(this.formatDate(event.value), 'date', 'equals');
    else this.dt.filter(null, 'date', 'equals');

    this.setState({ dateFilter: event.value });
  }

  filterDate(value, filter) {
    if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    return value === this.formatDate(filter);
  }

  formatDate(date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  }

  renderStatusFilter() {
    return (
      <Dropdown
        filter={true}
        value={this.state.selectedStatus}
        options={this.state.statuses}
        onChange={this.onStatusFilterChange}
        itemTemplate={this.statusItemTemplate}
        showClear={true}
        placeholder="Select a Status"
        className="p-column-filter"
      />
    );
  }

  statusItemTemplate(option) {
    return <span className={classNames('customer-badge', 'status-' + option)}>{option}</span>;
  }

  onStatusFilterChange(event) {
    this.dt.filter(event.value, 'status', 'equals');
    this.setState({ selectedStatus: event.value });
  }

  render() {
    const header = this.renderHeader();
    const representativeFilter = this.renderRepresentativeFilter();
    const dateFilter = this.renderDateFilter();
    const statusFilter = this.renderStatusFilter();

    return (
      <div className="datatable-doc-demo">
        <div className="content-section introduction">
          <div className="feature-intro" onContextMenu={e => this.cm.show(e)}>
            <h1>DataTable</h1>
            <p>DataTable displays data in tabular format.</p>
          </div>
        </div>

        <div className="content-section implementation">
          <ContextMenu model={this.state.items} ref={el => (this.cm = el)}></ContextMenu>
        </div>

        <div className="content-section implementation">
          <DataTable
            ref={el => (this.dt = el)}
            value={this.state.customers}
            header={header}
            responsive
            className="p-datatable-customers"
            dataKey="id"
            rowHover
            globalFilter={this.state.globalFilter}
            selection={this.state.selectedCustomers}
            onSelectionChange={e => this.setState({ selectedCustomers: e.value })}
            paginator
            rows={10}
            emptyMessage="No customers found"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            rowsPerPageOptions={[10, 25, 50]}>
            <Column selectionMode="multiple" style={{ width: '3em' }} />
            <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name" />
            <Column
              sortField="country.name"
              filterField="country.name"
              header="Country"
              body={this.countryBodyTemplate}
              sortable
              filter
              filterMatchMode="contains"
              filterPlaceholder="Search by country"
            />
            <Column
              sortField="representative.name"
              filterField="representative.name"
              header="Representative"
              body={this.representativeBodyTemplate}
              sortable
              filter
              filterElement={representativeFilter}
            />
            <Column
              field="date"
              header="Date"
              sortable
              filter
              filterMatchMode="custom"
              filterFunction={this.filterDate}
              filterElement={dateFilter}
            />
            <Column field="status" header="Status" body={this.statusBodyTemplate} sortable filter filterElement={statusFilter} />
            <Column
              field="activity"
              header="Activity"
              body={this.activityBodyTemplate}
              sortable
              filter
              filterMatchMode="gte"
              filterPlaceholder="Minimum"
            />
            <Column
              body={this.actionBodyTemplate}
              headerStyle={{ width: '8em', textAlign: 'center' }}
              bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
            />
          </DataTable>
        </div>
      </div>
    );
  }
}
