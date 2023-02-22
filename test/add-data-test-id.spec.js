import React from 'react'
import renderer from 'react-test-renderer'

import ClassComponent from './fixtures/ClassComponent'
import FunctionComponent from './fixtures/FunctionComponent'
import ArrowFunctionComponent from './fixtures/ArrowFunctionComponent'
import CustomDataIdComponent from './fixtures/CustomDataIdComponent'
import ChildrenComponent from './fixtures/ChildrenComponent'
import ReactMemoComponent from './fixtures/ReactMemoComponent'
import RenderFunctionComponent from './fixtures/RenderFunctionComponent'
import ReactFragmentComponent from './fixtures/ReactFragmentComponent'
import FragmentComponent from './fixtures/FragmentComponent'
import FragmentWithAliasComponent from './fixtures/FragmentWithAliasComponent'
import ReactFragmentWithNamespaceComponent from './fixtures/ReactFragmentWithNamespaceComponent'

it('should add data-test to class component', () => {
  const component = renderer.create(<ClassComponent />)
  const tree = component.toJSON()

  expect(tree.props).toHaveProperty('data-test', 'ClassComponent')
})

it('should add data-test to function component', () => {
  const component = renderer.create(<FunctionComponent />)
  const tree = component.toJSON()

  expect(tree.props).toHaveProperty('data-test', 'FunctionComponent')
})

it('should add data-test to arrow function component', () => {
  const component = renderer.create(<ArrowFunctionComponent />)
  const tree = component.toJSON()

  expect(tree.props).toHaveProperty('data-test', 'ArrowFunctionComponent')
})

it('should add data-test to React.memo components', () => {
  const component = renderer.create(<ReactMemoComponent />)
  const tree = component.toJSON()

  expect(tree.props).toHaveProperty('data-test', 'ReactMemoComponent')
})

it('should keep already settled attributes', () => {
  const customId = 'MyCustomDataGtmId'
  const component = renderer.create(<CustomDataIdComponent customId={customId} />)
  const tree = component.toJSON()

  expect(tree.props).toHaveProperty('data-test', customId)
})

it('should add attribute only on host element', () => {
  const component = renderer.create(<ChildrenComponent />)
  const tree = component.toJSON()

  expect(tree.props).toHaveProperty('data-test')
  expect(tree.children.find(c => c.props['data-test'])).toBeUndefined()
})

it('should add attribute only on host element when component has render function', () => {
  const component = renderer.create(<RenderFunctionComponent />)
  const tree = component.toJSON()

  expect(tree.props).toHaveProperty('data-test')
  expect(tree.children.find(c => c.props['data-test'])).toBeUndefined()
})

it('should not add attribute in React.Fragment container', () => {
  const component = renderer.create(<ReactFragmentComponent />)
  const tree = component.toJSON()

  expect(tree.type).toBe('div')
  expect(tree.props).not.toHaveProperty('data-test')
})

it('should not add attribute in Fragment container', () => {
  const component = renderer.create(<FragmentComponent />)
  const tree = component.toJSON()

  expect(tree.type).toBe('div')
  expect(tree.props).not.toHaveProperty('data-test')
})

it('should not add attribute in Fragment container with import alias', () => {
  const component = renderer.create(<FragmentWithAliasComponent />)
  const tree = component.toJSON()

  expect(tree.type).toBe('div')
  expect(tree.props).not.toHaveProperty('data-test')
})


it('should not add attribute in React.Fragment container with namespace import', () => {
  const component = renderer.create(<ReactFragmentWithNamespaceComponent />)
  const tree = component.toJSON()

  expect(tree.type).toBe('div')
  expect(tree.props).not.toHaveProperty('data-test')
})
