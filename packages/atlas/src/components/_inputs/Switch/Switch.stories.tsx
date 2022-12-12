import { Meta, StoryFn } from '@storybook/react'

import { Switch, SwitchProps } from './Switch'

export default {
  title: 'inputs/Switch',
  component: Switch,
  argTypes: {
    onChange: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  args: {
    disabled: false,
    label: 'Switch button label',
  },
} as Meta

const Template: StoryFn<SwitchProps> = (args) => <Switch {...args} />

export const Default = Template.bind({})
