import { ReactNode } from 'react'
import {
  DraggableLocation,
  DraggableId,
  DroppableId,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd'
import {
  TreeData,
  Path,
  ItemId,
  FlattenedTree,
  TreeSourcePosition,
  TreeDestinationPosition,
  TreeItem,
  FlattenedItem,
} from '../../types'
import { RenderItemParams } from '../TreeItem/TreeItem-types'

export type TreeProps = {
  /** The tree data structure. */
  tree: TreeData
  /** Function that will be called when a parent item needs to be expanded. */
  onExpand: (itemId: ItemId, path: Path) => void
  /** Function that will be called when a parent item needs to be collapsed. */
  onCollapse: (itemId: ItemId, path: Path) => void
  /** Function that will be called when the user starts dragging. */
  onDragStart: (itemId: ItemId) => void
  /** Function that will be called when the user finishes dragging. */
  onDragEnd: (
    sourcePosition: TreeSourcePosition,
    destinationPosition?: TreeDestinationPosition
  ) => void
  /** Function that will be called to render a single item. */
  renderItem: (item: RenderItemParams) => ReactNode
  /** Number of pixel is used to scaffold the tree by the consumer. */
  offsetPerLevel: number
  /** Boolean to turn on drag&drop re-ordering on the tree */
  isDragEnabled: boolean | ((item: TreeItem) => boolean)
  /** Boolean to turn on hovering while dragging */
  isNestingEnabled: boolean
  /** Boolean to turn on virtualization support */
  isVirtualizationEnabled: boolean

  /** Virtual item's height. If the isVirtualizationEnabled is true, please set it manually. */
  virtualItemHeight: number
}

export type State = {
  /** The flattened tree data structure transformed from props.tree */
  flattenedTree: FlattenedTree
  // Id of the currently dragged item
  draggedItemId?: ItemId
}

export type Combine = {
  draggableId: DraggableId
  droppableId: DroppableId
}

export type DragState = {
  // Source location
  source: DraggableLocation
  // Dragging mode
  mode: string
  // Pending destination location
  destination?: DraggableLocation
  // Last level, while the user moved an item horizontally
  horizontalLevel?: number
  // Combine for nesting operation
  combine?: Combine
}

export interface VirtualItemProps {
  provided: DraggableProvided
  snapshot: DraggableStateSnapshot
  style?: React.CSSProperties
  isDragging?: boolean
  flatItem: FlattenedItem
}

export interface VirtualRowProps {
  data: FlattenedTree
  index: number
  style: React.CSSProperties
  isDragging?: boolean
  provided: DraggableProvided
}

export interface VirtualItemStyle {
  provided: DraggableProvided
  style?: React.CSSProperties
  isDragging?: boolean
}
