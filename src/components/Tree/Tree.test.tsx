import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import { virtualTree } from '../../mockdata/virtualTree'
import {
  ItemId,
  TreeData,
  TreeDestinationPosition,
  TreeSourcePosition,
} from '../../types'
import { moveItemOnTree, mutateTree } from '../../utils/tree'
import { RenderItemParams } from '../TreeItem/TreeItem-types'
import Tree from './Tree'

const DummyRenderItem = ({
  item,
  provided,
  onCollapse,
  onExpand,
}: RenderItemParams) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div style={{ display: 'flex' }}>
        {item.hasChildren &&
          (item.isExpanded ? (
            <div
              style={{ paddingRight: 4 }}
              onClick={() => onCollapse(item.id)}
            >
              -
            </div>
          ) : (
            <div style={{ paddingRight: 4 }} onClick={() => onExpand(item.id)}>
              +
            </div>
          ))}
        {item.data ? item.data.title : ''}
      </div>
    </div>
  )
}

const DummyTree = (treeData: TreeData) => {
  const [tree, setTree] = React.useState<TreeData>(treeData)
  const onExpand = (itemId: ItemId) => {
    setTree(mutateTree(tree, itemId, { isExpanded: true }))
  }

  const onCollapse = (itemId: ItemId) => {
    setTree(mutateTree(tree, itemId, { isExpanded: false }))
  }

  const onDragEnd = (
    source: TreeSourcePosition,
    destination?: TreeDestinationPosition
  ) => {
    if (!destination) return

    const newTree = moveItemOnTree(tree, source, destination)
    setTree(newTree)
  }

  return (
    <Tree
      tree={tree}
      renderItem={DummyRenderItem}
      onExpand={onExpand}
      isDragEnabled
      onDragEnd={onDragEnd}
      offsetPerLevel={16}
      onCollapse={onCollapse}
    />
  )
}

test('It renders', () => {
  const { container } = render(<DummyTree {...virtualTree} />)
  const element = container.firstElementChild
  expect(element).toBeInTheDocument()
})
