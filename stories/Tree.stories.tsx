import { Meta, Story } from '@storybook/react'
import { Tree } from '../src'
import { TreeProps } from '../src/components/Tree/Tree-types'
import { virtualTree } from '../src/mockdata/virtualTree'

export default { title: 'Tree', component: Tree } as Meta

const TreeGalleryTemplate: Story<TreeProps> = (args: TreeProps) => (
  <TreeGallery {...args} />
)

const TreeGallery = (props: TreeProps) => {
  return <Tree {...props} />
}
export const VirtualTree = TreeGalleryTemplate.bind({})
VirtualTree.args = { ...virtualTree }
