
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'
import moment from 'moment'
import CheckBoxGroup from './CheckBoxGroup'
import { Button } from 'react-bootstrap'
import * as Utils from 'Assets/Utils'

moment.locale()

import React from 'react'
import numeral from 'numeral'

const TableData = ({ onClickEdit, onClickRemove, onClickComponent, onClickStartPause, onClickRestart, onClickView, create, process, edit, remove, state, document, equalSize, toggleTableAll, page, cellEditCheck, onBeforeSaveCell, onAfterSaveCell, selectRowCheck, stateTask, onRowSelect, onSelectAll, selected, sizePerPage, pageStartIndex, paginationSize, data, columns, disabled, search, footer, footerData, expandableRow, expandComponent, expandColumnOptions, isNoPagination, onClickEtapas, rowSpan, custom, onClickCustom, customStyle, certificate, upload, viewDocument }) => {

	const createCustomSearchField = () => {
		return (
			<SearchField className='custom-searchfield' placeholder='Buscar' />
		)
	}

	const createCustomClearButton = (onClick) => {
		return (
			<Button bsStyle="link" bsSize="xsmall" onClick={onClick}>
				<i className="fa fa-close" />
			</Button>
		)
	}

	const renderShowsTotal = (start, to, total) => {
		return (
			<p>{start} a {to} de {total}</p>
		)
	}

	const cellEditProp = {
		mode: 'click',
		blurToSave: true,
		beforeSaveCell: onBeforeSaveCell,
		afterSaveCell: onAfterSaveCell
	}

	const selectRowPropCheck = {
		mode: 'checkbox',
		clickToSelect: false,
		selected: selected ? selected : [],
		onSelect: onRowSelect,
		onSelectAll: onSelectAll
	}

	const tableOptions = {
		page: page || 1,
		sizePerPage: sizePerPage || 10,
		pageStartIndex: pageStartIndex || 1,
		paginationSize: paginationSize || 5,
		prePage: '<',
		nextPage: '>',
		paginationShowsTotal: renderShowsTotal,
		paginationPosition: 'bottom',
		withoutNoDataText: false,
		noDataText: create ? " " : 'No hay registros por mostrar',
		hideSizePerPage: true,
		searchField: createCustomSearchField,
		clearSearch: true,
		clearSearchBtn: createCustomClearButton,
		expandRowBgColor: 'rgba(201, 201, 201, 0.2)',
		expanding: toggleTableAll,
		expandBy: 'column'
	}

	let tableColumns = []

	columns.map((option, key) => {
		const itemConfig = {
			dataField: option.id,
			dataSort: option.sort,
			headerAlign: option.headerAlign ? option.headerAlign : 'left',
			dataAlign: option.dataAlign ? option.dataAlign : 'left',
			editable: option.editable ? option.editable : false,
			className: option.className ? option.className : option.index ? "table-column-id" : option.columnaTipo ? "table-column-type" : "table-column-data",
			columnClassName: option.columnClassName ? option.columnClassName : option.index ? "table-column-id" : option.columnaTipo ? "table-column-type" : "table-column-data",
			key: key,
			hidden: option.hidden,
			row: option.row,
			rowSpan: option.rowSpan,
			colSpan: option.colSpan,
			expandable: option.expandable
		}


		tableColumns.push(
			<TableHeaderColumn {...itemConfig}
				dataFormat={(cell, row) => {

					let field = ''

					if (option.type === 'simple') {
						field = row[option.id]
					} else if (option.type === 'checkbox') {
						field = (<CheckBoxGroup
							id={option.nameOption}
							disabled={option.disabled ? option.disabled : false}
							options={[{ name: option.nameOption, checked: row[option.nameOption] }]}
							onChange={(e) => { onClickComponent(e, 'checkbox', row) }} />)
					} else if (option.type === 'object') {
						field = row[[option.object]] ? row[[option.object]][option.id] : ""
					} else if (option.type === 'currency') {
						field = numeral(row[option.id]).format('$ 0,0.00')
					} else if (option.type === 'date') {
						let date = row[option.id]
						field = "No existe la fecha"
						if (date) {
							if (typeof date == 'string') {
								field = moment(date.substr(0, 10), "YYYY-MM-DD").format("DD/MM/YYYY")
							}
						}
					} else if (option.type === 'href') {
						field = <span><a href="#" className={(row.estadoCambioDestinoId == 2 || row.estadoCambioDestinoId == null) ? 'float-left' : "clean-link"} onClick={() => { onClickView(row) }}>  {row[option.id]} </a></span>
					}

					return (field)
				}
				}
			>{option.name}</TableHeaderColumn>)
	})

	if (state) {

		tableColumns.push(

			<TableHeaderColumn headerAlign={'right'} dataAlign={'right'} key={2} dataField={'deleted'}
				className="table-column-state" columnClassName="table-column-state" editable={false} dataFormat={(cell, row) => {

					let fieldDeleted = <div>{row.deleted ? 'Inactivo' : 'Activo'}</div>

					let fieldEstado = <div>{row.subestado ? row.subestado : row.estado ? row.estado : ''}</div>

					let field = ''

					if (row.estado) {
						field = <div>{fieldEstado}</div>
					} else {
						field = <div>{fieldDeleted}</div>
					}

					return (field)
				}
				}
			>{'Estatus'}</TableHeaderColumn>)
	}

	if (!disabled && (edit || remove || process || document || onClickEtapas || custom || certificate || upload || viewDocument)) {
		tableColumns.push(
			<TableHeaderColumn
				rowSpan={rowSpan}
				headerAlign={'center'}
				dataAlign={'center'}
				key={-2}
				expandable={false}
				dataField={'actions'}
				className={equalSize ? equalSize : !document ? "assets-table-action" : ''}
				columnClassName={equalSize ? equalSize : !document ? "assets-table-action" : ""}
				dataFormat={(cell, row) => {

					// Estados  0 = creada, 1 proceso, 2 pausada, 3 terminada 
					let estadoSiguiente = row.estado == 0 ? 'Iniciar' : row.estado == 1 ? 'pausada' : row.estado == 2 ? 'Continuar' : ''

					let stateOption = stateTask && <span className={ row.estado === 3 ? customStyle : ''}><a href="#" onClick={(e) => { e.preventDefault(); onClickStartPause(row.id ? row.id : row) }}><i className={'fa fa-pencil'} />&nbsp;{estadoSiguiente}</a></span>
					let restartOption = stateTask && <span className={ row.estado === 0 || row.estado === 3 ? customStyle : ''}><a href="#" onClick={(e) => { e.preventDefault(); onClickRestart(row.id ? row.id : row) }}><i className={'fa fa-pencil'} />&nbsp;{row.estado == 1 || row.estado == 2 ? 'Reiniciar' : ''}</a></span>
					let editOption = edit && <span className={row.estado === 3 ? customStyle : ''}><a href="#" onClick={(e) => { e.preventDefault(); onClickEdit(row.id ? row.id : row) }}><i className={'fa fa-pencil'} />&nbsp;{'Editar'}</a></span>
					let removeOption = remove && <span><a href="#" onClick={(e) => { e.preventDefault(); onClickRemove(row.id ? row.id : row) }}><i className={'fa fa-trash'} />&nbsp;{'Eliminar'}</a></span>
					let customOption = custom && <span><a href="#" onClick={(e) => { e.preventDefault(); onClickCustom(row.id ? row.id : row) }}><i className={`fa ${custom.fa}`} />&nbsp;{custom.label}</a></span>
					let field = <div>{stateOption}&nbsp;{restartOption}&nbsp;{editOption}&nbsp;{removeOption}&nbsp;{customOption}</div>

					return (field)
				}}
			>{'Acción'}</TableHeaderColumn>)
	}



	return (
		<BootstrapTable
			striped
			tableContainerClass="table-responsive"
			bordered={false}
			pagination={!isNoPagination ? true : false}
			data={data}
			options={tableOptions}
			remote={false}
			selectRow={selectRowCheck ? selectRowPropCheck : {}}
			cellEdit={cellEditCheck ? cellEditProp : {}}
			keyField='id'
			search={search}
			footer={footer}
			footerData={footerData || []}
			expandableRow={expandableRow}
			expandComponent={expandComponent}
			expandColumnOptions={expandColumnOptions}>
			{tableColumns}
		</BootstrapTable>
	)
}

export default TableData
