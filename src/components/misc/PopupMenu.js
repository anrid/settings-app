/** @jsx Inferno */
import Inferno, { linkEvent } from 'inferno'
import { connect } from 'inferno-redux'
import { showPopupMenu } from '../../actions'
import './PopupMenu.css'

function handleOpen ({ showPopupMenu, forId }) {
  showPopupMenu(forId)
}

function handleClose ({ showPopupMenu, forId }) {
  showPopupMenu(null)
}

function handleSelect ({ props: { showPopupMenu, onSelect }, item }) {
  showPopupMenu(null)
  onSelect(item)
}

const PopupMenu = (props) => {
  const { show, items, header, button } = props

  const toClick = (
    <div className='PopupMenu__Icon'>
      { button || <i className='typcn typcn-arrow-sorted-down' /> }
    </div>
  )

  if (!show) {
    return (
      <div className='PopupMenu' onClick={linkEvent(props, handleOpen)}>
        { toClick }
      </div>
    )
  }

  return (
    <div className='PopupMenu'>
      { toClick }
      <div className='PopupMenu__Overlay' onClick={linkEvent(props, handleClose)} />
      <div className='PopupMenu__Content'>
        { header || null }
        { items.map(x => (
          <div key={x._id} className='PopupMenu__Item' onClick={linkEvent({ props, item: x }, handleSelect)}>
            { x.name }
          </div>
        )) }
      </div>
    </div>
  )
}

export default connect(
  ({ popupMenu }, { forId, items, onSelect, header, button }) => {
    return {
      show: popupMenu && popupMenu === forId,
      forId,
      items,
      onSelect,
      header,
      button
    }
  },
  { showPopupMenu }
)(PopupMenu)
