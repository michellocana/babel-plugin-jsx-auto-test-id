import React from 'react'
import renderer from 'react-test-renderer'

import ClassComponent from './fixtures/ClassComponent'
import FunctionComponent from './fixtures/FunctionComponent'
import ArrowFunctionComponent from './fixtures/ArrowFunctionComponent'
import DataGtmIdComponent from './fixtures/DataGtmIdComponent'
import ChildrenComponent from './fixtures/ChildrenComponent'

it('should add data-gtm-id to class component', () => {
  const component = renderer.create(<ClassComponent />)
  const tree = component.toJSON()

  expect(tree.props).toHaveProperty('data-gtm-id', 'ClassComponent')
})

it('should add data-gtm-id to function component', () => {
  const component = renderer.create(<FunctionComponent />)
  const tree = component.toJSON()

  expect(tree.props).toHaveProperty('data-gtm-id', 'FunctionComponent')
})

it('should add data-gtm-id to arrow function component', () => {
  const component = renderer.create(<ArrowFunctionComponent />)
  const tree = component.toJSON()

  expect(tree.props).toHaveProperty('data-gtm-id', 'ArrowFunctionComponent')
})

it('should keep already settled attributes', () => {
  const customId = 'MyCustomDataGtmId'
  const component = renderer.create(<DataGtmIdComponent customId={customId} />)
  const tree = component.toJSON()

  expect(tree.props).toHaveProperty('data-gtm-id', customId)
})

it('should add attribute only on host element', () => {
  const component = renderer.create(<ChildrenComponent />)
  const tree = component.toJSON()

  expect(tree.children.find(c => c.props['data-gtm-id'])).toBeUndefined()
})
