
// eslint-disable-next-line react/prop-types
const Prayer = ({name, time}) => {
  return (
    <div className="prayer">
        <p className='name_prayer'>{name}</p>
        <p className='time_prayer'>{time}</p>
    </div>
  )
}

export default Prayer

