import moment from 'moment/moment'
import { useNavigate } from 'react-router-dom'

function List({ headerTitles, content, itemRoute }) {
  const navigate = useNavigate()

  return (
    <div className='list'>
      <div className='list-header'>
        {headerTitles &&
          headerTitles.map((title, index) => <p key={index}>{title}</p>)}
      </div>
      {content ? (
        <div className='list-content'>
          {content.map((item, index) => (
            <div
              className='list-item'
              key={index}
              onClick={() => navigate(`${itemRoute}/${item.id}`)}
            >
              {Object.keys(item).map((key, keyIndex) => {
                if (key.toLowerCase().includes('id')) {
                  return null
                }
                if (key === 'courseDateTime') {
                  return (
                    <p key={keyIndex}>
                      {moment(item[key]).format('yyyy-MM-DD, hh:mm A')}
                    </p>
                  )
                }
                return <p key={keyIndex}>{item[key]}</p>
              })}
            </div>
          ))}
        </div>
      ) : (
        <div className='list-content'>
          <div className='list-item'>
            <p className='loading-text'>Loading..</p>
          </div>
        </div>
      )}
      <div className='list-footer'>
        <p>Result: {content ? content.length : 0}</p>
      </div>
    </div>
  )
}

export default List
