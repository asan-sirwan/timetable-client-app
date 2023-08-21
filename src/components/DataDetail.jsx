function DataDetail({ title, value }) {
  return (
    <div className='data-detail'>
      <h3><span>{title}:</span> {value}</h3>
    </div>
  )
}

export default DataDetail
