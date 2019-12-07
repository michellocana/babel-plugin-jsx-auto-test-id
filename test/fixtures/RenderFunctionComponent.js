import React from 'react'

function RenderFunctionComponent() {
  function renderBar() {
    return <div>bar</div>
  }

  return (
    <div>
      <div>foo</div>
      {renderBar()}
      <div>baz</div>
    </div>
  )
}

export default RenderFunctionComponent
