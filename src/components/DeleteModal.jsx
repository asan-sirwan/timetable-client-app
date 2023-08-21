function DeleteModal({ data, handleCancel, handleConfirm }) {
  return (
    <div className='delete-modal' onClick={handleCancel}>
      <div className='dialog' onClick={(e) => e.stopPropagation()}>
        <h3>Are you sure?</h3>
        <hr />
        <p>Do you really want to delete {data.name}?</p>
        <div className='buttons'>
          <button className='secondary-button' onClick={handleCancel}>
            Cancel
          </button>
          <button className='delete-button' onClick={handleConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
