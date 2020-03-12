import React, { Fragment as MyCustomFragmentName } from 'react'

export default function FragmentWithAliasComponent() {
  return (
    <MyCustomFragmentName>
      <div />
    </MyCustomFragmentName>
  )
}
