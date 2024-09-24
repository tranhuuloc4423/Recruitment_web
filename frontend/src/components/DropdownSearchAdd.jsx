import React, { useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';

const DropdownSearchAdd = (props) => {
  const {value, onChange} = props
  const [search, setSearch] = useState('')
  const [focus, setFocus] = useState(false)
  return <div>
    <div>
      <Button label={'Thêm kỹ năng'} />
      <Button label={'Thêm vào database'} />
    </div>
    {focus && <div>
      <span>item 1</span>
      <span>item 2</span>
      <span>item 3</span>
      </div>}
    <div>

    </div>
  </div>
}

export default DropdownSearchAdd;